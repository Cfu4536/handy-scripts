# MusicFree Codex 深色主题

[返回项目首页](../README.md) · [GitHub 暗黑绿主题](MusicFree桌面主题.md)

[Codex 深色主题包](../FreeMusic/themes/codex-dark.mftheme) 适配 MusicFree Desktop `v1.0.0-beta.4`，版本为 `1.0.0`。主题名称为「Codex 深色」，作者为 `HandyScripts`。

## 配色与范围

配色参考本机 Codex `26.1021.3705.0` 安装包 `app/resources/app.asar` 内的 `webview/assets/app-shared-bd3e4e649b69.css`。以桌面主题变量 `--app-color-background-surface`、`--app-color-background-surface-under`、`--app-color-text-foreground` 及对应灰阶为依据，再映射为 MusicFree 的主题变量。这是社区适配主题。

| 区域 | 配色 |
| --- | --- |
| 主背景、全屏播放器底色 | `#181818`，炭灰色 |
| 侧边栏、底部播放器 | `#000000`，黑色 |
| 卡片、输入区域、弹窗、菜单 | `#1c1c1c` / `#212121`，深灰色 |
| 主按钮 | `#dfdfdf` 浅灰底、`#0d0d0d` 近黑字；悬停为白底 |
| 正文、辅助文字 | `#dfdfdf` / `#a0a0a0` |
| 分隔线、边框 | 4% / 8% / 16% 白色 |
| 信息与键盘焦点 | `#99ceff`，浅蓝色 |
| 警告、危险、成功 | 橙色、红色、绿色 |

主题通过 `:root` 覆盖背景、填充、文字、边框、提示色和阴影变量，使用纯色背景，并以 `--bg-image: none` 关闭默认渐变。尺寸、间距、字体和圆角沿用 MusicFree 默认值。歌曲封面和客户端生成的全屏封面氛围背景仍由客户端控制。

主题包只包含 `config.json` 和 `index.css`，没有图片、动态背景或外部网络资源。所引用的变量已与本机 beta.4 程序内的全局样式核对。

[浏览器配色预览](../FreeMusic/themes/codex-dark-preview.html) 可直接打开，用于查看颜色、按钮悬停、列表悬停、输入框焦点和弹窗。预览使用主题原始 CSS 与示例内容，不是 MusicFree 客户端截图，不随主题包安装。

## 安装

1. 打开 MusicFree 桌面版，进入「主题」→「本地主题」。
2. 点击「安装主题包」，选择 `FreeMusic/themes/codex-dark.mftheme`，无需解压。
3. 找到「Codex 深色」主题卡片并应用。
4. 检查歌曲列表、播放控制、设置、弹窗、右键菜单、队列和全屏歌词。

## 自定义与打包

源码位于 [FreeMusic/themes/codex-dark](../FreeMusic/themes/codex-dark)。修改 `index.css` 中的色值可调整配色，修改 `config.json` 可调整名称、作者、描述和预览色；更新时递增版本号。

在项目根目录执行以下 PowerShell 命令可重新打包：

```powershell
$themeSource = ".\FreeMusic\themes\codex-dark"
$themeArchive = ".\FreeMusic\themes\codex-dark.zip"

Compress-Archive -LiteralPath "$themeSource\config.json", "$themeSource\index.css" -DestinationPath $themeArchive -Force
Move-Item -LiteralPath $themeArchive -Destination ".\FreeMusic\themes\codex-dark.mftheme" -Force
```

安装包根目录应直接包含两个文件，不额外嵌套文件夹。此主题尚未提交到主题市场。

## 验证记录

- 已检查配置 JSON、版本号、变量重复、变量引用和覆盖范围；53 个变量均存在于本机 MusicFree beta.4 的全局样式中。
- 已检查 ZIP 根目录、压缩数据完整性以及包内文件与源码的逐字节一致性；安装包为 1,604 字节。
- 已计算关键文字与背景的对比度：正文与主背景为 `13.32:1`，辅助文字与弹窗背景为 `6.16:1`，主按钮文字与按钮背景为 `14.58:1`；检查的正文、辅助文字、占位文字和状态提示组合均不低于 `4.5:1`。这属于静态色值检查。
- MusicFree 窗口截图在重试后返回 `FrameArrived timed out`；尚未在客户端实际安装、应用或检查各页面。
- 已提供本地 HTML 配色预览；内置浏览器因 URL 协议限制拒绝打开 `file:` 页面，预览未完成浏览器渲染验证。
