# HandyScripts · 随手脚本

一个个人自用的脚本与配置集合，集中维护 MusicFree 插件、订阅清单、桌面主题和浏览器用户脚本。按用途分目录组织，便于配置、更新和维护日常使用的小工具。

当前项目包含配置清单、MusicFree 插件、桌面主题、浏览器用户脚本和视频接口检查脚本，没有独立的 HTTP API、后端服务、依赖清单或统一构建流程。MusicFree 插件使用客户端提供的内置模块，桌面主题使用 ZIP 格式打包。

## 文档

- [MusicFree 插件清单](doc/MusicFree插件清单.md)：Windows 和安卓插件列表、本地插件、订阅地址、导入与更新方式。
- [MusicFree 桌面主题](doc/MusicFree桌面主题.md)：GitHub 暗黑绿主题的配色、安装、自定义与打包说明。
- [MusicFree Codex 深色主题](doc/MusicFree-Codex主题.md)：参考 Codex 桌面配色的炭灰纯色主题，侧栏字体、字号与图标尺寸参考 GitHub 暗黑绿，含安装包与源码。
- [学信网用户脚本](doc/学信网用户脚本.md)：页面匹配范围、显示配置、安装方式与运行限制。
- [DeepSeek 快捷按钮](doc/DeepSeek快捷按钮.md)：快捷提示词按钮的安装、GitHub 更新、使用与扩展配置。
- [MusicFree 开发技能](doc/MusicFree开发技能.md)：项目内 AI 技能的用途、使用方法与来源。

## 视频点播接口检查

在仓库根目录运行以下命令，需要 Python 3.8 或更新版本。

```powershell
python -X utf8 .\Video\CheckAPIs.py
```

脚本读取 [LibreTV 清单](Video/LibreTV.txt) 和 [EchoTV 清单](Video/EchoTV.json) 的 `sources` 字段。同一 URL 只检查一次，按 LibreTV、EchoTV 的顺序保留第一个名称。

脚本请求苹果 CMS 视频列表的第一页，支持 JSON 和 XML。接口返回至少一条含视频 ID 和名称的有效记录才算通过。检查范围限于点播列表接口。 [苹果 CMS 接口说明](https://www.maccms.plus/api/collect.html)

每次检查完成后覆盖 `Video/CheckResults.txt`。结果使用 UTF-8 编码，每行一个 `名称,接口`，无表头。未通过的原因会显示在终端。
