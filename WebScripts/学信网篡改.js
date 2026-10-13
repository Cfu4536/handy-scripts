// ==UserScript==
// @name         学信网信息自定义修改器 (Wap端 - 二合一极稳全能版)
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  自定义修改学信网[总览页]+[学籍详情页]信息，支持任意行、任意模块自由注释，绝对不报错、不阻塞
// @author       Gemini
// @match        https://my.chsi.com.cn/archive/wap/gdjy/index.action*
// @match        https://my.chsi.com.cn/archive/wap/gdjy/xj/detail.action*
// @icon         https://t1.chei.com.cn/common/favicon.ico
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // =====================================================================
    // ⚠️ 全局配置区：请在此处集中修改你想要展示的信息（注释掉的项将保留网页原生信息）
    // =====================================================================
    const CONFIG = {

        // 【模块一：总览页面配置】(对应 index.action)
        xj_1: {
            school: "杭州电子科技大学",                  // 第1个学籍：学校
            // level: "普通全日制 本科",             // 第1个学籍：层次
            status: "计算机技术 | 全日制" // 第1个学籍：状态
        },
        // xj_2: {
        //     school: "北京大学",
        //     level: "普通全日制 硕士研究生",
        //     status: "2026-06-30 | 不在籍（毕业）"
        // },
        // xl_1: {
        //     school: "清华大学",                  // 第1个学历：学校
        //     level: "本科",                      // 第1个学历：层次
        //     status: "普通全日制 | 毕业"           // 第1个学历：状态
        // },
        kaoyan_1: {
            school: "杭州电子科技大学",                  // 考研信息：院校
            // year: "2026年"                      // 考研信息：年份
        },


        // 【模块二：学籍详情页配置】(对应 detail.action)
        detail_head: {
            // name: "张三",                          // 姓名
            // namePinyin: "ZHANG SAN",               // 姓名拼音
            school: "杭州电子科技大学",                     // 院校名称
            // level: "普通全日制",                     // 层次 (如: 普通全日制、非全日制)
            majorAndType: "计算机技术 | 全日制"   // 专业与学历层次
        },
        detail_list: {
            // "民族": "汉族",
            // "证件号码": "110101200001011234",
            // "学制": "4 年",
            // "学历类别": "普通高等教育",
            "分院": "计算机学院",
            "系所": "计算机技术",
            "班级": "",
            "学号": "252050244",
            // "入学日期": "2020年09月01日",
            // "学籍状态": "在籍（注册学籍）",
            // "预计毕业日期": "2024年06月30日"
        },
        detail_photo: {
            luQuPhoto: "",   // 录取照片 URL (不替换请留空 "")
            xueLiPhoto: ""   // 学历照片 URL (不替换请留空 "")
        }

    };
    // =====================================================================


    /**
     * 安全赋值阀门：严格判定配置项是否存在，且掐死 DOM 无限递归
     */
    function safeSetText(dom, targetText) {
        // 只有当传入的 targetText 明确有值（不是 undefined）时，才修改网页
        if (targetText !== undefined && dom && dom.innerText !== targetText) {
            dom.innerText = targetText;
        }
    }

    // 逻辑一：渲染【总览页】
    function renderIndexPage() {
        try {
            const xjCards = document.querySelectorAll('.xj.list-card');
            
            // 针对第 1 个学籍卡片（增加了 CONFIG.xj_1?.xxx 极其严格的防空保护）
            if (xjCards[0]) {
                safeSetText(xjCards[0].querySelector('.yxmc'), CONFIG.xj_1?.school);
                safeSetText(xjCards[0].querySelector('.cc'), CONFIG.xj_1?.level);
                safeSetText(xjCards[0].querySelector('.des'), CONFIG.xj_1?.status);
            }
            
            // 针对第 2 个学籍卡片
            if (xjCards[1]) {
                safeSetText(xjCards[1].querySelector('.yxmc'), CONFIG.xj_2?.school);
                safeSetText(xjCards[1].querySelector('.cc'), CONFIG.xj_2?.level);
                safeSetText(xjCards[1].querySelector('.des'), CONFIG.xj_2?.status);
            }

            const xlCards = document.querySelectorAll('.xl.list-card');
            if (xlCards[0]) {
                safeSetText(xlCards[0].querySelector('.yxmc'), CONFIG.xl_1?.school);
                safeSetText(xlCards[0].querySelector('.cc'), CONFIG.xl_1?.level);
                safeSetText(xlCards[0].querySelector('.des'), CONFIG.xl_1?.status);
            }

            const kyCard = document.querySelector('.ky.list-card');
            if (kyCard) {
                safeSetText(kyCard.querySelector('.yxmc'), CONFIG.kaoyan_1?.school);
                safeSetText(kyCard.querySelector('.des'), CONFIG.kaoyan_1?.year);
            }
        } catch (err) {
            console.error("总览页渲染出错: ", err);
        }
    }

    // 逻辑二：渲染【详情页】
    function renderDetailPage() {
        try {
            // 头部卡片防空
            safeSetText(document.querySelector('.nameFamily'), CONFIG.detail_head?.name);
            safeSetText(document.querySelector('.top-card .van-col--15 p'), CONFIG.detail_head?.namePinyin);
            safeSetText(document.querySelector('.yxmc'), CONFIG.detail_head?.school);
            safeSetText(document.querySelector('.xj-cc-lable'), CONFIG.detail_head?.level);
            safeSetText(document.querySelector('.xj-detail-img .des'), CONFIG.detail_head?.majorAndType);

            // 列表详情防空
            const listItems = document.querySelectorAll('.gdjy-view-ul li');
            listItems.forEach(li => {
                const labelEl = li.querySelector('.left');
                const valueEl = li.querySelector('.right');
                if (labelEl && valueEl) {
                    const labelText = labelEl.innerText.trim();
                    if (CONFIG.detail_list && CONFIG.detail_list[labelText] !== undefined) {
                        safeSetText(valueEl, CONFIG.detail_list[labelText]);
                    }
                }
            });

            // 照片防空
            const p = CONFIG.detail_photo;
            if (p) {
                if (p.luQuPhoto) {
                    let img1 = document.querySelector('.lq-photo img');
                    if(img1 && img1.src !== p.luQuPhoto) img1.src = p.luQuPhoto;
                }
                if (p.xueLiPhoto) {
                    let img2 = document.querySelector('.xl-photo img');
                    if(img2 && img2.src !== p.xueLiPhoto) img2.src = p.xueLiPhoto;
                }
            }
        } catch (e) {
            console.error("详情页渲染出错: ", e);
        }
    }


    // 核心中枢：智能路由分发器
    function masterController() {
        const currentUrl = window.location.href;

        if (currentUrl.includes('gdjy/index.action')) {
            renderIndexPage();
        } else if (currentUrl.includes('gdjy/xj/detail.action')) {
            renderDetailPage();
        }
    }

    // 20ms 高频检测（低频非阻塞心跳）
    setInterval(masterController, 20);

})();