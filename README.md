# HandyScripts · 随手脚本

一个个人自用的脚本与配置集合，集中维护 MusicFree 插件、订阅清单、桌面主题和浏览器用户脚本。按用途分目录组织，便于配置、更新和维护日常使用的小工具。

| 内容 | 文件 | 用途 |
| --- | --- | --- |
| MusicFree 插件清单 | [Windows 清单](FreeMusic/plugins_win.json)、[安卓清单](FreeMusic/plugins_android.json) | 每份收录十个插件地址，供 MusicFree 导入或订阅 |
| MusicFree 本地插件 | [FreeMusic/main](FreeMusic/main) | 维护 Windows 清单中前五个插件的实现 |
| MusicFree 桌面主题 | [GitHub 暗黑绿](FreeMusic/themes/github-dark-green.mftheme) | 为桌面版 `v1.0.0-beta.4` 提供灰黑背景与绿色主操作按钮 |
| 浏览器用户脚本 | [WebScripts/学信网篡改.js](WebScripts/学信网篡改.js) | 自定义学信网移动端指定页面的本地显示 |

当前项目由静态 JSON 配置、MusicFree 插件、桌面主题和浏览器脚本组成，没有独立的 HTTP API、后端服务、依赖清单或统一构建流程。MusicFree 插件使用客户端提供的内置模块，桌面主题使用 ZIP 格式打包。

## 目录结构

```text
handy-scripts/
├── README.md
├── AGENTS.md
├── .agents/skills/            # 仅本项目使用的 AI 技能
│   ├── musicfree-plugin-dev/
│   ├── musicfree-themepack-dev/
│   └── musicfree-skills.LICENSE
├── FreeMusic/
│   ├── plugins_win.json       # Windows 清单
│   ├── plugins_android.json   # 安卓清单
│   ├── main/                  # Windows 清单前五个插件
│   │   ├── qq.js
│   │   ├── wyy.js
│   │   ├── kw.js
│   │   ├── kg.js
│   │   └── xmly.js
│   └── themes/
│       ├── github-dark-green/ # 主题源码：config.json、index.css
│       ├── github-dark-green.mftheme # 可安装主题包
│       ├── github-dark-green-preview.png # 配色与控件示意
│       └── github-dark-green-sidebar-preview.png # 侧栏尺寸对比
└── WebScripts/
    └── 学信网篡改.js          # 学信网移动端页面显示自定义脚本
```

## 项目内 MusicFree Skills

已将 [maotoumao/musicfree-skills](https://github.com/maotoumao/musicfree-skills) 的两项 AI 技能安装到项目根目录的 `.agents/skills/`：

| 技能 | 入口 | 用途 |
| --- | --- | --- |
| `musicfree-plugin-dev` | [SKILL.md](.agents/skills/musicfree-plugin-dev/SKILL.md) | 开发 MusicFree 音乐源插件、适配音乐网站或 API |
| `musicfree-themepack-dev` | [SKILL.md](.agents/skills/musicfree-themepack-dev/SKILL.md) | 开发 MusicFree 桌面版主题包 |

这两项技能是供 AI 编程助手读取的指令与参考文档，不会直接向 MusicFree 客户端安装音乐源或主题。每项技能的 `references/` 已一并保留。

按照 [Codex 官方技能说明](https://learn.chatgpt.com/docs/build-skills)，项目根目录的 `.agents/skills/` 可在当前仓库及其子目录中被发现。因此安装在根目录，便于从项目根目录维护 `FreeMusic` 时使用；本次没有向用户级技能目录安装，也没有修改全局配置。

下一轮对话即可使用，例如输入：

```text
$musicfree-plugin-dev 帮我将提供的音乐 API 适配成 MusicFree 插件
$musicfree-themepack-dev 帮我设计一个 MusicFree 桌面版主题包
```

Codex 也可按任务内容自动选择技能。如果技能未出现，重启 Codex 后再试。

本次安装日期为 `2026-10-13`，固定上游提交为 [`8767a70e9fbfc4f17c50d04618291a5e7e6c9a9d`](https://github.com/maotoumao/musicfree-skills/commit/8767a70e9fbfc4f17c50d04618291a5e7e6c9a9d)，技能文件保持上游原样，不会自动更新。上游采用 AGPL-3.0，许可证原文保存在 [musicfree-skills.LICENSE](.agents/skills/musicfree-skills.LICENSE)。

## MusicFree 插件清单

[Windows 清单](FreeMusic/plugins_win.json) 和 [安卓清单](FreeMusic/plugins_android.json) 分别维护个人使用的插件列表。目录沿用 `FreeMusic` 命名，对应客户端名称为 MusicFree。清单保存插件名称、远程地址和版本标记。

Windows 清单的前五项指向本仓库 `FreeMusic/main/`，安卓清单的对应项指向 `qwerwhr/musicfree-plugins`。两端使用不同来源的文件，安卓可用不能直接证明本地 Windows 插件可用。

### 收录插件

| 清单名称 | Windows 本地脚本 | Windows 版本 | 安卓远程脚本 |
| --- | --- | --- | --- |
| QQ音乐-hwb | [qq.js](FreeMusic/main/qq.js) | `1.0.1` | [迟言QQ.js](https://cdn.jsdelivr.net/gh/qwerwhr/musicfree-plugins@main/迟言QQ.js) |
| 网易云音乐-hwb | [wyy.js](FreeMusic/main/wyy.js) | `1.0.1` | [溯音网易.js](https://cdn.jsdelivr.net/gh/qwerwhr/musicfree-plugins@main/溯音网易.js) |
| 酷我音乐-hwb | [kw.js](FreeMusic/main/kw.js) | `2026.10.13` | [酷我音乐Thomas.js](https://cdn.jsdelivr.net/gh/qwerwhr/musicfree-plugins@main/酷我音乐Thomas.js) |
| 酷狗音乐-hwb | [kg.js](FreeMusic/main/kg.js) | `2026.10.13` | [酷狗Thomas.js](https://cdn.jsdelivr.net/gh/qwerwhr/musicfree-plugins@main/酷狗Thomas.js) |
| 喜马拉雅-hwb | [xmly.js](FreeMusic/main/xmly.js) | `0.6.3` | [喜马拉雅_竹侣.js](https://cdn.jsdelivr.net/gh/qwerwhr/musicfree-plugins@main/喜马拉雅_竹侣.js) |

Windows 前五项的清单版本与本地脚本一致，脚本的 `srcUrl` 也指向本仓库，避免应用内更新覆盖本地维护内容。安卓对应项的清单版本仍为 `1.0.0`，远程脚本由 [qwerwhr/musicfree-plugins](https://github.com/qwerwhr/musicfree-plugins) 维护。

两份清单还收录小秋音乐、小蜗音乐、小芸音乐、小枸音乐、小蜜音乐，标记版本均为 `0.3.0`，来源为 `Huibq/keep-alive`。这五项的实现不在本仓库内。远程脚本的实际功能与兼容性需要在客户端中确认。

### 订阅地址与发布前提

将对应文件发布到本仓库 `Cfu4536/handy-scripts` 的 `main` 分支后，可以使用以下地址：

| 客户端 | GitHub Raw | jsDelivr |
| --- | --- | --- |
| Windows | [plugins_win.json](https://raw.githubusercontent.com/Cfu4536/handy-scripts/main/FreeMusic/plugins_win.json) | [plugins_win.json](https://cdn.jsdelivr.net/gh/Cfu4536/handy-scripts@main/FreeMusic/plugins_win.json) |
| 安卓 | [plugins_android.json](https://raw.githubusercontent.com/Cfu4536/handy-scripts/main/FreeMusic/plugins_android.json) | [plugins_android.json](https://cdn.jsdelivr.net/gh/Cfu4536/handy-scripts@main/FreeMusic/plugins_android.json) |

复制用的 Windows GitHub Raw 地址：

```text
https://raw.githubusercontent.com/Cfu4536/handy-scripts/main/FreeMusic/plugins_win.json
```

上述地址需要仓库公开可访问，且 `main` 分支已包含对应 JSON 和插件脚本。当前本地修改不会自动发布到线上。使用前先在浏览器中打开地址，确认返回 JSON 正文；仓库、分支或文件路径变更后，需要同步修改订阅地址。

### 导入与更新

MusicFree 支持从网络或本地 JSON 文件安装插件。导入步骤参考 [安卓版官方说明](https://musicfree.catcat.work/usage/mobile/install-plugin.html) 和 [桌面版官方说明](https://musicfree.catcat.work/usage/pc/install-plugin.html)：

| 客户端 | 网络导入入口 | 本地导入入口 |
| --- | --- | --- |
| 安卓版 | 左上角菜单 → 插件设置 → 右下角加号 → 从网络安装插件 | 同一入口选择“从本地安装插件” |
| 桌面版 | 插件管理 → 从网络安装 | 插件管理 → 从本地安装 |

网络导入时填入对应客户端的 JSON 直链；本地导入时选择 `FreeMusic/plugins_win.json` 或 `FreeMusic/plugins_android.json`。本地 JSON 仍引用远程插件脚本，安装时需要能够访问清单中的地址。要立即验证尚未发布的本地修复，在桌面版“从本地安装”中直接选择 `FreeMusic/main/kw.js` 和 `FreeMusic/main/kg.js`；只导入本地 JSON 会下载线上版本。

在客户端订阅管理中添加相同的 JSON 地址后，可以通过“更新订阅”获取该订阅源的插件更新。入口细节见上述官方说明。

### 维护清单

- `desc`：整份清单的说明。
- `plugins`：插件数组，每项包含 `name`、`url`、`version`。
- 新增、删除或更换插件时，修改对应数组项，并同步更新 README 的插件表。
- `url` 应指向可访问的插件 `.js` 文件；维护版本标记时，应与实际发布内容一致。
- JSON 不支持注释，编辑时注意双引号、逗号和括号；最后一项后不要保留多余逗号。


## MusicFree 桌面主题

[GitHub 暗黑绿主题包](FreeMusic/themes/github-dark-green.mftheme) 为 MusicFree Desktop `v1.0.0-beta.4` 制作，版本为 `1.0.2`。配色参考 [GitHub Primer 暗色调色板](https://github.com/primer/primitives/blob/main/src/tokens/base/color/dark/dark.json5)，主题变量已核对该客户端版本的 [global.scss](https://github.com/maotoumao/MusicFreeDesktop/blob/v1.0.0-beta.4/src/renderer/bootstrap/global.scss)。

| 区域 | 配色 |
| --- | --- |
| 主背景、全屏播放器底色 | `#0d1117`，近黑色 |
| 侧边栏、底部播放器、列表卡片 | `#151b23`，深灰色 |
| 输入框、弹窗、右键菜单 | `#212830`，较亮的深灰色 |
| 主操作按钮 | `#238636`，绿色；悬停为 `#196c2e`，深绿色 |
| 高亮文字、选中图标 | `#3fb950`，明亮绿色 |
| 主文字、辅助文字 | `#f0f6fc` / `#b7bdc8` |

主题通过 `:root` 覆盖颜色变量，不包含背景图片、动态背景或外部资源，并通过 `--bg-image: none` 关闭默认背景渐变。普通次要按钮沿用深灰底色，提示和危险操作保留相应的蓝、黄、红色。歌曲封面和客户端自行生成的全屏封面氛围背景仍由客户端控制。

`1.0.1` 起按用户要求调整 `--font-family`：英文和数字优先使用 `Segoe UI`，中文优先使用 `Noto Sans SC`；缺少对应字体时依次回退到微软雅黑 UI、微软雅黑、苹方等系统字体。字体从本机读取，不随主题打包，也无需联网下载。本机已确认安装 Segoe UI 和 Noto Sans SC，并通过浏览器字体诊断确认示意中的中文实际使用 Noto Sans SC、英文和数字实际使用 Segoe UI。

`1.0.2` 按用户要求使用 beta4 的侧栏类名进行局部尺寸调整：

| 项目 | 原尺寸 | 主题尺寸 |
| --- | --- | --- |
| 左侧菜单文字（含歌单名称） | 14px | 15px |
| 左侧菜单图标 | 16px | 20px |
| 侧栏分组标题 | 11px | 12px |
| 左下工具栏图标（插件、主题、设置、小窗） | 16px | 20px |
| 左下工具栏按钮 | 32 × 32px | 36 × 36px |

局部规则均以 `.l-sidebar` 限定范围，不修改全局字号、图标或控件尺寸变量。侧栏宽度、菜单行高、其他页面和底部播放控制的尺寸沿用客户端原值，歌单长标题仍使用省略号显示。

[配色与控件示意](FreeMusic/themes/github-dark-green-preview.png) 直接读取主题 CSS 在浏览器中渲染，仅用于展示颜色和控件状态，不是 MusicFree 客户端截图，也不随主题安装。

[侧栏尺寸对比](FreeMusic/themes/github-dark-green-sidebar-preview.png) 使用本机 beta4 程序中编译后的侧栏样式和对应组件结构展示调整前后尺寸，包含左下工具栏和长歌单名称，同样不是客户端截图。

### 安装

1. 打开 MusicFree 桌面版，进入「主题」页面的「本地主题」。
2. 点击「安装主题包」，选择 `FreeMusic/themes/github-dark-green.mftheme`，无需解压。
3. 找到「GitHub 暗黑绿」主题卡片并应用。
4. 检查歌曲列表、主按钮与悬停状态、播放器、设置、弹窗、右键菜单和全屏歌词的显示效果。

### 自定义与重新打包

源码位于 [FreeMusic/themes/github-dark-green](FreeMusic/themes/github-dark-green)。修改 `index.css` 中的颜色即可调整外观，也可通过 `--font-family` 调整字体的优先顺序；文件末尾的 `.l-sidebar` 局部规则控制侧栏字号和图标大小。`config.json` 可修改主题名称、作者、描述和预览色，更新时递增 `version`。

在项目根目录运行以下 PowerShell 命令，可用两个源码文件重新生成安装包：

```powershell
$themeSource = ".\FreeMusic\themes\github-dark-green"
$themeArchive = ".\FreeMusic\themes\github-dark-green.zip"

Compress-Archive -LiteralPath "$themeSource\config.json", "$themeSource\index.css" -DestinationPath $themeArchive -Force
Move-Item -LiteralPath $themeArchive -Destination ".\FreeMusic\themes\github-dark-green.mftheme" -Force
```

安装包根目录直接包含 `config.json` 和 `index.css`，已检查打包内容与源码一致。47 个覆盖变量均存在于 beta4 的源码中；全局字体调整仅覆盖用户要求的 `--font-family`。颜色与字体已在 Edge 控件示意中检查，文字配色对比度均不低于 `4.5:1`；侧栏局部尺寸已使用 beta4 的组件结构和样式检查，覆盖菜单、长歌单名称和底部工具栏。浏览器检查与实际客户端验证是不同步骤，尚未在 MusicFree 客户端实际安装验证。此主题尚未发布到主题市场。

## 浏览器用户脚本

[WebScripts/学信网篡改.js](WebScripts/学信网篡改.js) 的用户脚本版本为 `2.2`，覆盖以下页面：

| 页面 | 用户脚本匹配地址 | 可配置内容 |
| --- | --- | --- |
| 学信档案总览 | `https://my.chsi.com.cn/archive/wap/gdjy/index.action*` | 前两个学籍卡片、第一个学历卡片和第一个考研卡片 |
| 学籍详情 | `https://my.chsi.com.cn/archive/wap/gdjy/xj/detail.action*` | 头部信息、详情列表、录取照片和学历照片 |

其他域名、桌面端页面及其他路径不在当前匹配范围内。脚本不包含登录逻辑，需要使用网站原有登录流程进入对应页面。

脚本的文字修改仅影响本地浏览器页面，不会修改学信网后台记录或官方验证结果；配置照片地址后，浏览器会加载对应图片。

### 安装与使用

1. 在支持用户脚本的浏览器中准备用户脚本管理器，例如 Tampermonkey。
2. 新建用户脚本，将上述 `.js` 文件的完整内容粘贴到编辑器中，覆盖默认模板；保留文件顶部的 `// ==UserScript==` 元数据块。
3. 根据需要编辑文件顶部的 `CONFIG`，保存并启用脚本。
4. 访问匹配的移动端页面，检查显示结果。修改配置后，保存脚本并刷新页面。

停用脚本后刷新页面，可以重新加载网站原有内容；仅停用脚本不会自动还原已经替换的 DOM。

### 运行方式与限制

脚本以 `@grant none`、`@run-at document-start` 运行。入口通过 `setInterval(masterController, 20)` 每 20 毫秒尝试按当前 URL 更新页面，实际调度间隔受浏览器影响。

文本更新由 `safeSetText` 处理：目标元素存在、配置值不是 `undefined`，且当前文本与配置不同，才执行赋值。总览页与详情页分别捕获渲染异常并输出到浏览器控制台。

脚本依赖网站现有的 CSS 选择器和标签文字。页面结构改变后，部分字段可能不再生效；缺失目标元素时通常会跳过对应替换。持续轮询会产生一定开销，大量新增扫描逻辑时需要关注页面响应和 CPU 占用。


