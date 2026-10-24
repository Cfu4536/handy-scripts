# MusicFree 桌面主题

[返回项目首页](../README.md)

[GitHub 暗黑绿主题包](../FreeMusic/themes/github-dark-green.mftheme) 为 MusicFree Desktop `v1.0.0-beta.4` 制作，版本为 `1.0.2`。配色参考 [GitHub Primer 暗色调色板](https://github.com/primer/primitives/blob/main/src/tokens/base/color/dark/dark.json5)，主题变量已核对该客户端版本的 [global.scss](https://github.com/maotoumao/MusicFreeDesktop/blob/v1.0.0-beta.4/src/renderer/bootstrap/global.scss)。

| 区域 | 配色 |
| --- | --- |
| 主背景、全屏播放器底色 | `#0d1117`，近黑色 |
| 侧边栏、底部播放器、列表卡片 | `#151b23`，深灰色 |
| 输入框、弹窗、右键菜单 | `#212830`，较亮的深灰色 |
| 主操作按钮 | `#238636`，绿色；悬停为 `#196c2e`，深绿色 |
| 高亮文字、选中图标 | `#3fb950`，明亮绿色 |
| 主文字、辅助文字 | `#f0f6fc` / `#b7bdc8` |

主题通过 `:root` 覆盖颜色变量，不包含背景图片、动态背景或外部资源，并通过 `--bg-image: none` 关闭默认背景渐变。普通次要按钮沿用深灰底色，提示和危险操作保留相应的蓝、黄、红色。歌曲封面和客户端自行生成的全屏封面氛围背景仍由客户端控制。

当前 `--font-family` 依次使用微软雅黑 UI、微软雅黑、苹方、Hiragino Sans GB、系统默认字体和通用无衬线字体，末尾保留 Segoe UI Emoji、Apple Color Emoji 作为表情字体回退。字体从本机读取，不随主题打包，也无需联网下载。

`1.0.2` 按用户要求使用 beta4 的侧栏类名进行局部尺寸调整：

| 项目 | 原尺寸 | 主题尺寸 |
| --- | --- | --- |
| 左侧菜单文字（含歌单名称） | 14px | 14px |
| 左侧菜单图标 | 16px | 20px |
| 侧栏分组标题 | 11px | 16px |
| 左下工具栏图标（插件、主题、设置、小窗） | 16px | 20px |
| 左下工具栏按钮 | 32 × 32px | 36 × 36px |

局部规则均以 `.l-sidebar` 限定范围，不修改全局字号、图标或控件尺寸变量。侧栏宽度、菜单行高、其他页面和底部播放控制的尺寸沿用客户端原值，歌单长标题仍使用省略号显示。

[配色与控件示意](../FreeMusic/themes/github-dark-green-preview.png) 由主题 CSS 在浏览器中渲染，仅用于展示颜色和控件状态，不是 MusicFree 客户端截图，也不随主题安装。示意图未随本次文档整理重新生成，字体以当前 `index.css` 为准。

[侧栏尺寸对比](../FreeMusic/themes/github-dark-green-sidebar-preview.png) 使用本机 beta4 程序中编译后的侧栏样式和对应组件结构展示调整前后尺寸，包含左下工具栏和长歌单名称，同样不是客户端截图。示意图未随本次文档整理重新生成，字号与尺寸以当前 `index.css` 为准。

## 安装

1. 打开 MusicFree 桌面版，进入「主题」页面的「本地主题」。
2. 点击「安装主题包」，选择 `FreeMusic/themes/github-dark-green.mftheme`，无需解压。
3. 找到「GitHub 暗黑绿」主题卡片并应用。
4. 检查歌曲列表、主按钮与悬停状态、播放器、设置、弹窗、右键菜单和全屏歌词的显示效果。

## 自定义与重新打包

源码位于 [FreeMusic/themes/github-dark-green](../FreeMusic/themes/github-dark-green)。修改 `index.css` 中的颜色即可调整外观，也可通过 `--font-family` 调整字体的优先顺序；文件末尾的 `.l-sidebar` 局部规则控制侧栏字号和图标大小。`config.json` 可修改主题名称、作者、描述和预览色，更新时递增 `version`。

在项目根目录运行以下 PowerShell 命令，可用两个源码文件重新生成安装包：

```powershell
$themeSource = ".\FreeMusic\themes\github-dark-green"
$themeArchive = ".\FreeMusic\themes\github-dark-green.zip"

Compress-Archive -LiteralPath "$themeSource\config.json", "$themeSource\index.css" -DestinationPath $themeArchive -Force
Move-Item -LiteralPath $themeArchive -Destination ".\FreeMusic\themes\github-dark-green.mftheme" -Force
```

安装包根目录直接包含 `config.json` 和 `index.css`，本次文档整理已检查打包内容与源码一致。此前曾使用 Edge 控件示意和 beta4 的组件结构检查主题效果；本次仅核对文档与本地文件，未重新进行浏览器显示检查，尚未在 MusicFree 客户端实际安装验证。此主题尚未发布到主题市场。
