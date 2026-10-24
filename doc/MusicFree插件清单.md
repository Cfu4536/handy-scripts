# MusicFree 插件清单

[返回项目首页](../README.md)

[Windows 清单](../FreeMusic/plugins_win.json) 和 [安卓清单](../FreeMusic/plugins_android.json) 分别维护个人使用的插件列表。目录沿用 `FreeMusic` 命名，对应客户端名称为 MusicFree。清单保存插件名称、远程地址和版本标记。

Windows 清单的前五项指向本仓库 `FreeMusic/main/`，安卓清单的对应项指向 `qwerwhr/musicfree-plugins`。两端使用不同来源的文件，安卓可用不能直接证明本地 Windows 插件可用。

## 收录插件

| 清单名称 | Windows 本地脚本 | Windows 版本 | 安卓远程脚本 |
| --- | --- | --- | --- |
| QQ音乐-hwb | [qq.js](../FreeMusic/main/qq.js) | `1.0.1` | [迟言QQ.js](https://cdn.jsdelivr.net/gh/qwerwhr/musicfree-plugins@main/迟言QQ.js) |
| 网易云音乐-hwb | [wyy.js](../FreeMusic/main/wyy.js) | `1.0.1` | [溯音网易.js](https://cdn.jsdelivr.net/gh/qwerwhr/musicfree-plugins@main/溯音网易.js) |
| 酷我音乐-hwb | [kw.js](../FreeMusic/main/kw.js) | `2026.10.13` | [酷我音乐Thomas.js](https://cdn.jsdelivr.net/gh/qwerwhr/musicfree-plugins@main/酷我音乐Thomas.js) |
| 酷狗音乐-hwb | [kg.js](../FreeMusic/main/kg.js) | `2026.10.13` | [酷狗Thomas.js](https://cdn.jsdelivr.net/gh/qwerwhr/musicfree-plugins@main/酷狗Thomas.js) |
| 喜马拉雅-hwb | [xmly.js](../FreeMusic/main/xmly.js) | `0.6.3` | [喜马拉雅_竹侣.js](https://cdn.jsdelivr.net/gh/qwerwhr/musicfree-plugins@main/喜马拉雅_竹侣.js) |

Windows 前五项的清单版本与本地脚本一致，脚本的 `srcUrl` 也指向本仓库，避免应用内更新覆盖本地维护内容。安卓对应项的清单版本仍为 `1.0.0`，远程脚本由 [qwerwhr/musicfree-plugins](https://github.com/qwerwhr/musicfree-plugins) 维护。

两份清单还收录小秋音乐、小蜗音乐、小芸音乐、小枸音乐、小蜜音乐，标记版本均为 `0.3.0`，来源为 `Huibq/keep-alive`。这五项的实现不在本仓库内。远程脚本的实际功能与兼容性需要在客户端中确认。

## 订阅地址与发布前提

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

## 导入与更新

MusicFree 支持从网络或本地 JSON 文件安装插件。导入步骤参考 [安卓版官方说明](https://musicfree.catcat.work/usage/mobile/install-plugin.html) 和 [桌面版官方说明](https://musicfree.catcat.work/usage/pc/install-plugin.html)：

| 客户端 | 网络导入入口 | 本地导入入口 |
| --- | --- | --- |
| 安卓版 | 左上角菜单 → 插件设置 → 右下角加号 → 从网络安装插件 | 同一入口选择“从本地安装插件” |
| 桌面版 | 插件管理 → 从网络安装 | 插件管理 → 从本地安装 |

网络导入时填入对应客户端的 JSON 直链；本地导入时选择 `FreeMusic/plugins_win.json` 或 `FreeMusic/plugins_android.json`。本地 JSON 仍引用远程插件脚本，安装时需要能够访问清单中的地址。要立即验证尚未发布的本地修复，在桌面版“从本地安装”中直接选择 `FreeMusic/main/kw.js` 和 `FreeMusic/main/kg.js`；只导入本地 JSON 会下载线上版本。

在客户端订阅管理中添加相同的 JSON 地址后，可以通过“更新订阅”获取该订阅源的插件更新。入口细节见上述官方说明。
