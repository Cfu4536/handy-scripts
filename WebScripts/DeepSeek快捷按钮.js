// ==UserScript==
// @name         DeepSeek 快捷按钮
// @namespace    http://tampermonkey.net/
// @version      1.2.4
// @description  在 DeepSeek 深度思考、智能搜索右侧添加同款样式的快捷提示词按钮
// @updateURL    https://raw.githubusercontent.com/Cfu4536/handy-scripts/refs/heads/main/WebScripts/DeepSeek%E5%BF%AB%E6%8D%B7%E6%8C%89%E9%92%AE.js
// @downloadURL  https://raw.githubusercontent.com/Cfu4536/handy-scripts/refs/heads/main/WebScripts/DeepSeek%E5%BF%AB%E6%8D%B7%E6%8C%89%E9%92%AE.js
// @match        https://chat.deepseek.com/*
// @grant        none
// @run-at       document-start
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    // 添加按钮时，在 buttons 中增加一项，label 为按钮文字，text 为插入内容。
    const CONFIG = {
        buttons: [
            {
                label: '翻译',
                text: '\n\n帮我把这些内容翻译成中文'
            },
            {
                label: '求平均',
                text: '\n\n帮我计算上面这些数字的平均值'
            },
            {
                label: '代码问题',
                text: '\n\n我的代码有什么问题？'
            }
        ]
    };

    const HOST_ID = 'deepseek-quick-prompts';
    const STYLE_ID = `${HOST_ID}-style`;
    const TOOLTIP_ID = `${HOST_ID}-tooltip`;
    const INPUT_SELECTORS = [
        'textarea#chat-input',
        'textarea[placeholder*="DeepSeek"]',
        'main textarea',
        'textarea'
    ];

    function findInput() {
        for (const selector of INPUT_SELECTORS) {
            const inputs = document.querySelectorAll(selector);
            for (const input of inputs) {
                if (!input.disabled && !input.readOnly && input.getClientRects().length > 0
                    && getComputedStyle(input).visibility !== 'hidden'
                    && !input.closest('[inert], [aria-hidden="true"]')) {
                    return input;
                }
            }
        }
        return null;
    }

    function findAnchor(input) {
        // 从输入框附近向外查找，避免将对话内容或侧边栏中的按钮当作工具栏。
        for (let container = input?.parentElement; container && container !== document.body; container = container.parentElement) {
            const controls = Array.from(container.querySelectorAll('.ds-toggle-button, button, [role="button"]'))
                .filter(control => !control.closest(`#${HOST_ID}`) && control.getClientRects().length > 0);
            const label = control => control.textContent.replace(/\s+/g, '');
            const search = controls.find(control => /^(智能搜索|联网搜索|搜索|Search)$/i.test(label(control)));
            const thinking = controls.find(control => /^(深度思考|DeepThink)([（(]R1[）)])?$/i.test(label(control)));
            if (search || thinking) {
                return search || thinking;
            }
        }
        return null;
    }

    function insertPrompt(text, status) {
        const input = findInput();
        if (!input) {
            status.textContent = '未找到可用输入框，请先进入聊天页面。';
            return;
        }

        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? start;
        const value = input.value.slice(0, start) + text + input.value.slice(end);

        input.focus();
        // 调用原生 setter，再触发 input，让受控输入框同步更新草稿和发送按钮状态。
        const valueSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
        valueSetter.call(input, value);
        input.dispatchEvent(new InputEvent('input', {
            bubbles: true,
            composed: true,
            inputType: 'insertText',
            data: text
        }));
        input.setSelectionRange(start + text.length, start + text.length);
        status.textContent = '';
    }

    function mountToolbar() {
        if (!document.body || document.getElementById(STYLE_ID)) {
            return;
        }

        const host = document.createElement('div');
        host.id = HOST_ID;
        host.setAttribute('role', 'group');
        host.setAttribute('aria-label', 'DeepSeek 快捷提示词');
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            #${HOST_ID} {
                display: inline-flex;
                align-items: center;
                flex-shrink: 0;
                position: relative;
            }
            #${HOST_ID} > [data-quick-prompt] {
                flex-shrink: 0;
                white-space: nowrap;
            }
            #${HOST_ID} > [data-quick-prompt]:focus-visible {
                outline: 2px solid #4d6bfe;
                outline-offset: 2px;
            }
            #${TOOLTIP_ID} {
                position: fixed;
                z-index: 1000;
                width: max-content;
                box-sizing: border-box;
                white-space: pre-wrap;
                overflow-wrap: anywhere;
                pointer-events: none;
            }
            #${TOOLTIP_ID}[hidden] {
                display: none;
            }
            #${HOST_ID} > .status {
                position: absolute;
                bottom: calc(100% + 8px);
                inset-inline-start: 0;
                z-index: 1;
                width: max-content;
                max-width: 240px;
                padding: 8px 12px;
                border-radius: 8px;
                background: #252a34;
                color: #ffffff;
                font: 13px/1.5 system-ui, sans-serif;
            }
            #${HOST_ID} > .status:empty {
                display: none;
            }
        `;
        document.head.appendChild(style);

        const status = document.createElement('div');
        status.className = 'status';
        status.setAttribute('role', 'status');
        const tooltip = document.createElement('div');
        tooltip.id = TOOLTIP_ID;
        // 复用官网的小号 Tooltip（无箭头），由官网 CSS 提供配色、圆角、字号和内边距。
        tooltip.className = 'ds-tooltip ds-tooltip--s ds-tooltip--tooltip ds-elevated ds-theme';
        tooltip.setAttribute('role', 'tooltip');
        tooltip.hidden = true;
        let tooltipButton = null;
        let tooltipTimer = null;

        function hideTooltip() {
            clearTimeout(tooltipTimer);
            tooltipTimer = null;
            tooltipButton?.removeAttribute('aria-describedby');
            tooltipButton = null;
            tooltip.hidden = true;
        }

        function showTooltip(button, text) {
            hideTooltip();
            const tooltipText = text.trim();
            if (!tooltipText) {
                return;
            }
            tooltipButton = button;
            // 与官网 Tooltip 一样，悬停 100 毫秒后显示，离开立即隐藏。
            tooltipTimer = setTimeout(() => {
                tooltipTimer = null;
                if (!button.isConnected || (!button.matches(':hover') && !button.matches(':focus-visible'))) {
                    hideTooltip();
                    return;
                }
                tooltip.textContent = tooltipText;
                if (!tooltip.isConnected) {
                    // 挂载到 body，避免被输入区的 overflow 裁切。
                    document.body.appendChild(tooltip);
                }
                tooltip.hidden = false;
                const buttonRect = button.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                const margin = 14;
                const gap = 4;
                const left = Math.max(margin, Math.min(
                    buttonRect.left + (buttonRect.width - tooltipRect.width) / 2,
                    document.documentElement.clientWidth - tooltipRect.width - margin
                ));
                const top = buttonRect.top >= tooltipRect.height + gap + margin
                    ? buttonRect.top - tooltipRect.height - gap
                    : Math.max(margin, Math.min(
                        buttonRect.bottom + gap,
                        document.documentElement.clientHeight - tooltipRect.height - margin
                    ));
                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`;
                button.setAttribute('aria-describedby', TOOLTIP_ID);
            }, 100);
        }

        document.addEventListener('scroll', hideTooltip, { capture: true, passive: true });
        window.addEventListener('resize', hideTooltip);
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                hideTooltip();
            }
        });
        const buttons = [];

        for (const action of CONFIG.buttons ?? []) {
            if (!action || typeof action.label !== 'string' || typeof action.text !== 'string') {
                continue;
            }

            // 与原生 ds-toggle-button 一样使用可键盘操作的 div，避免浏览器按钮默认样式。
            const button = document.createElement('div');
            button.dataset.quickPrompt = '';
            button.setAttribute('role', 'button');
            button.tabIndex = 0;
            const label = document.createElement('span');
            label.textContent = action.label;
            button.appendChild(label);
            // 不设置 title，避免同时弹出浏览器默认提示框。
            button.addEventListener('mouseenter', () => showTooltip(button, action.text));
            button.addEventListener('mouseleave', hideTooltip);
            button.addEventListener('focus', () => showTooltip(button, action.text));
            button.addEventListener('blur', hideTooltip);
            button.addEventListener('mousedown', event => {
                if (event.button === 0) {
                    event.preventDefault();
                }
            });
            button.addEventListener('click', event => {
                event.stopPropagation();
                hideTooltip();
                insertPrompt(action.text, status);
            });
            button.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    event.stopPropagation();
                    button.click();
                }
            });
            buttons.push(button);
            host.appendChild(button);
        }

        host.appendChild(status);
        let input = null;
        let anchor = null;
        let pending = false;

        function syncToolbar() {
            pending = false;
            hideTooltip();
            if (!style.isConnected && document.head) {
                document.head.appendChild(style);
            }
            input = findInput();
            anchor = findAnchor(input);
            if (!anchor) {
                // 工具栏尚未出现或已经离开聊天页时等待，不再显示悬浮按钮。
                host.remove();
                return;
            }

            // 只复用样式类，不复制原按钮的事件或开关状态。
            const className = Array.from(anchor.classList)
                .filter(name => !/(^|[-_])(selected|active|disabled|checked|pressed)($|[-_])/i.test(name))
                .join(' ');
            for (const button of buttons) {
                if (button.className !== className) {
                    button.className = className;
                }
            }
            if (host.parentElement !== anchor.parentElement || anchor.nextElementSibling !== host) {
                anchor.after(host);
            }
        }

        function scheduleSync(records) {
            if (pending) {
                return;
            }
            // 流式回复的无关更新不扫描输入区；自身写入也不触发下一轮更新。
            const needsSync = !host.isConnected || !style.isConnected || !input?.isConnected || !anchor?.isConnected
                || records.some(record => !host.contains(record.target) && !tooltip.contains(record.target) && record.target !== style
                    && (record.target === anchor.parentElement || anchor.contains(record.target)
                        || (record.type === 'attributes' && record.target.contains(input))));
            if (needsSync) {
                pending = true;
                requestAnimationFrame(syncToolbar);
            }
        }

        const observer = new MutationObserver(scheduleSync);
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['class', 'disabled', 'readonly', 'hidden', 'aria-hidden']
        });
        syncToolbar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountToolbar, { once: true });
    } else {
        mountToolbar();
    }
})();
