# 项目内 MusicFree Skills

[返回项目首页](../README.md)

已将 [maotoumao/musicfree-skills](https://github.com/maotoumao/musicfree-skills) 的两项 AI 技能安装到项目根目录的 `.agents/skills/`：

| 技能 | 入口 | 用途 |
| --- | --- | --- |
| `musicfree-plugin-dev` | [SKILL.md](../.agents/skills/musicfree-plugin-dev/SKILL.md) | 开发 MusicFree 音乐源插件、适配音乐网站或 API |
| `musicfree-themepack-dev` | [SKILL.md](../.agents/skills/musicfree-themepack-dev/SKILL.md) | 开发 MusicFree 桌面版主题包 |

这两项技能是供 AI 编程助手读取的指令与参考文档，不会直接向 MusicFree 客户端安装音乐源或主题。每项技能的 `references/` 已一并保留。

按照 [Codex 官方技能说明](https://learn.chatgpt.com/docs/build-skills)，项目根目录的 `.agents/skills/` 可在当前仓库及其子目录中被发现。因此安装在根目录，便于从项目根目录维护 `FreeMusic` 时使用；本次没有向用户级技能目录安装，也没有修改全局配置。

下一轮对话即可使用，例如输入：

```text
$musicfree-plugin-dev 帮我将提供的音乐 API 适配成 MusicFree 插件
$musicfree-themepack-dev 帮我设计一个 MusicFree 桌面版主题包
```

Codex 也可按任务内容自动选择技能。如果技能未出现，重启 Codex 后再试。

本次安装日期为 `2026-10-13`，固定上游提交为 [`8767a70e9fbfc4f17c50d04618291a5e7e6c9a9d`](https://github.com/maotoumao/musicfree-skills/commit/8767a70e9fbfc4f17c50d04618291a5e7e6c9a9d)，技能文件保持上游原样，不会自动更新。上游采用 AGPL-3.0，许可证原文保存在 [musicfree-skills.LICENSE](../.agents/skills/musicfree-skills.LICENSE)。
