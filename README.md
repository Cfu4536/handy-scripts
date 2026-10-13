# HandyScripts · 随手脚本

一个个人自用的脚本与配置集合，集中维护 MusicFree 插件订阅清单和浏览器用户脚本。按用途分目录组织，便于配置、更新和维护日常使用的小工具。

| 内容 | 文件 | 用途 |
| --- | --- | --- |
| MusicFree 插件清单 | [Windows 清单](FreeMusic/plugins_win.json)、[安卓清单](FreeMusic/plugins_android.json) | 每份收录十个插件地址，供 MusicFree 导入或订阅 |
| MusicFree 本地插件 | [FreeMusic/main](FreeMusic/main) | 维护 Windows 清单中前五个插件的实现 |
| 浏览器用户脚本 | [WebScripts/学信网篡改.js](WebScripts/学信网篡改.js) | 自定义学信网移动端指定页面的本地显示 |

当前项目由静态 JSON 配置、MusicFree 插件和浏览器脚本组成，没有独立的 HTTP API、后端服务、依赖清单或构建流程。MusicFree 插件使用客户端提供的内置模块。

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
│   └── main/                  # Windows 清单前五个插件
│       ├── qq.js
│       ├── wyy.js
│       ├── kw.js
│       ├── kg.js
│       └── xmly.js
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

### Windows 插件解析排查

`kw.js` 与 `kg.js` 原先在 `R(x, z)` 中通过 `let` 再次声明参数 `z`，会在加载时产生 `SyntaxError: Identifier 'z' has already been declared`。本地已拆成变量声明和参数赋值，并修正两项插件备用解析的音质映射，以及酷狗的 `high` 拼写。MusicFree 桌面版 `0.0.8` 的 [加载器源码](https://github.com/maotoumao/MusicFreeDesktop/blob/f3b526a6c1ea9313b277810a8e12003605a98982/src/shared/plugin-manager/main/plugin.ts#L113) 通过 JavaScript `Function` 编译插件，这种语法错误会导致安装失败。

五个本地脚本已通过语法检查、按照该桌面加载器调用方式执行的加载检查，以及使用模拟响应的播放返回值检查。模拟响应不代表真实音乐接口可用；桌面版 `0.0.8`、`1.0.0 beta4` 的实际安装、搜索和播放仍需在客户端中验证。QQ、网易云和酷我、酷狗的备用解析依赖第三方服务，喜马拉雅直接使用数据中已有的播放地址。

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

### 配置说明

所有显示配置都集中在 `CONFIG` 中。下表是代码目前实际读取的字段：

| 配置项 | 支持字段 | 对应区域 |
| --- | --- | --- |
| `xj_1`、`xj_2` | `school`、`level`、`status` | 第一个、第二个学籍卡片 |
| `xl_1` | `school`、`level`、`status` | 第一个学历卡片 |
| `kaoyan_1` | `school`、`year` | 第一个考研卡片 |
| `detail_head` | `name`、`namePinyin`、`school`、`level`、`majorAndType` | 学籍详情页头部 |
| `detail_list` | 与页面左侧标签文字一致的键 | 学籍详情列表右侧内容 |
| `detail_photo` | `luQuPhoto`、`xueLiPhoto` | 录取照片、学历照片地址 |

例如，下面的配置仅替换第一个学籍卡片的学校，以及详情页的学校和分院：

```javascript
const CONFIG = {
    xj_1: {
        school: "示例大学"
    },
    detail_head: {
        school: "示例大学"
    },
    detail_list: {
        "分院": "示例学院"
    }
};
```

配置时注意：

- 未配置、删除或注释掉的文本字段不会被脚本替换；整个模块也可以省略。
- 文本字段设置为 `""` 会清空对应显示内容。文本值请使用字符串。
- 照片地址设置为 `""` 或省略时不会替换图片；需要替换时填写完整、可访问的图片 URL。
- `detail_list` 按页面标签文字匹配，代码会去除标签首尾空白，但不会转换标点或同义词。例如 `"分院"` 与 `"分院："` 是不同的键。
- 保持对象语法完整，注意逗号、引号和花括号。
- 新增 `xj_3` 等配置不会自动增加卡片支持，需要同时修改渲染逻辑。

### 运行方式与限制

脚本以 `@grant none`、`@run-at document-start` 运行。入口通过 `setInterval(masterController, 20)` 每 20 毫秒尝试按当前 URL 更新页面，实际调度间隔受浏览器影响。

文本更新由 `safeSetText` 处理：目标元素存在、配置值不是 `undefined`，且当前文本与配置不同，才执行赋值。总览页与详情页分别捕获渲染异常并输出到浏览器控制台。

脚本依赖网站现有的 CSS 选择器和标签文字。页面结构改变后，部分字段可能不再生效；缺失目标元素时通常会跳过对应替换。持续轮询会产生一定开销，大量新增扫描逻辑时需要关注页面响应和 CPU 占用。

## 排查问题

| 现象 | 检查方式 |
| --- | --- |
| MusicFree 清单地址返回 404 | 检查仓库公开访问权限、`main` 分支和文件路径；也可以先使用本地 JSON 导入 |
| MusicFree 插件下载失败 | 分别检查清单地址与清单中的 `.js` 地址是否可访问；本地导入清单仍需下载远程脚本 |
| MusicFree 提示“无法解析插件” | 先检查脚本语法；本地已修复酷我、酷狗的重复声明，可直接安装本地 `.js` 验证 |
| MusicFree 安装成功但功能异常 | 在客户端确认插件兼容性，检查音乐接口及第三方解析服务是否可用 |
| 页面没有变化 | 确认脚本已启用、浏览器允许管理器在该站点运行、URL 符合上述匹配范围，并检查 `CONFIG` |
| 只有部分字段变化 | 检查字段是否被注释、目标卡片是否存在、列表标签是否一致、网站选择器是否发生变化 |
| 图片没有变化 | 检查照片地址是否为空、URL 是否可访问，以及页面是否存在对应图片元素 |
| 保存脚本时报错 | 检查 JavaScript 语法，尤其是编辑配置后的逗号、引号和括号 |
| 页面变慢或反复变化 | 检查控制台错误和轮询开销，并检查是否有其他脚本同时修改相同元素 |

## 维护与验证

开发约定见 [AGENTS.md](AGENTS.md)。当前没有自动化测试、格式化工具或 CI 配置。

修改插件清单后，可在 Windows PowerShell 中检查 JSON 是否能正常解析：

```powershell
foreach ($file in @(".\FreeMusic\plugins_win.json", ".\FreeMusic\plugins_android.json")) {
    Get-Content -LiteralPath $file -Raw -Encoding UTF8 | ConvertFrom-Json | Out-Null
}
```

JSON 能解析不代表远程插件可用，仍需在 MusicFree 中实际检查导入、更新及使用效果。

修改 MusicFree 本地插件后，若本机已有 Node.js，可检查五个文件的语法：

```powershell
Get-ChildItem -LiteralPath ".\FreeMusic\main" -Filter "*.js" | ForEach-Object {
    node --check $_.FullName
    if ($LASTEXITCODE -ne 0) { throw "插件语法检查失败：$($_.Name)" }
}
```

修改浏览器脚本后，应分别检查总览页和详情页，验证目标字段、缺失配置、空字符串和延迟加载内容的行为。若本机已有 Node.js，可选用以下命令检查语法；它不会验证 DOM 替换效果：

```powershell
node --check ".\WebScripts\学信网篡改.js"
```

本项目自有脚本尚未设置项目级许可证；添加许可证时需由维护者明确授权范围。上述 MusicFree Skills 的第三方许可证仅适用于其上游内容。
