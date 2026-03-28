---
title: Claude Code 核心命令与快捷键
description: 高效管理 Token 的必备斜杠命令与快捷键。/context、/compact、Shift+Tab 计划模式等实战用法。
---

# 核心命令与快捷键（Quick Reference）

这里汇集了提升 Claude Code Token 管理效率与操作速度的必备命令及快捷键。

---

## ⌨️ 必须掌握的核心快捷键

| 快捷键 | 操作 |
|---|---|
| `Shift + Tab` | **计划（Plan）↔ 编辑（Edit）模式切换** — 不直接修改代码、先制定计划时必备 |
| `ESC` 单击 | 立即中断正在进行的任务（Interrupt） |
| `ESC` 连击两次 | **回退（Rewind）** — 返回上一个提示词状态 |

---

## ⚡ 在终端内执行 Bash 命令（`!`）

在 Claude Code 中查看 Git 状态或启动服务器时，无需额外打开终端。在命令前加上 `!`，即可立即执行本地 Bash 命令。

```
!git status        → 查看已变更的文件
!git diff          → 查看变更详情
!npm run dev       → 启动本地服务器
!npm run test      → 运行测试
```

---

## 💬 必备斜杠命令

### 会话 & 上下文管理

| 命令 | 说明 |
|---|---|
| `/init` | 自动生成项目说明文件 `CLAUDE.md`（项目初始化时必备） |
| `/clear` | 完全清除已累积的对话上下文 |
| `/compact` | 仅保留对话历史中的核心摘要，压缩上下文以节省 Token |
| `/context` | 以进度条（Bar）形式直观查看当前会话的 Token 使用量 |

> 💡 输入 `/context` 后，Token 使用量会按 `System Prompt`、`System Tools`、`User/Assistant` 等项目分别显示。若连接了 MCP 后 `System Tools` 占用过多，可考虑将其禁用。→ [MCP Token 管理](../04-agents/mcp.md)

### 记忆 & 设置

| 命令 | 说明 |
|---|---|
| `/memory` | 查看当前加载的记忆（`CLAUDE.md`、`MEMORY.md` 等）内容 |
| `/status` | 综合查看当前登录账户、订阅计划及已连接 MCP 服务器状态 |
| `/allowed-tools` | 查看并管理 AI 被允许使用的工具（文件写入、本地命令执行等）权限列表 |

### 模型 & 输出

| 命令 | 说明 |
|---|---|
| `/model` | 根据任务难度切换模型，优化 Token 使用 |
| `/output-style` | 更改 AI 的响应风格 |

**`/model` 选择标准：**

| 模型 | 适合的任务 |
|---|---|
| `Opus` | 复杂架构设计、原因不明的 Bug 排查、重要决策 |
| `Sonnet` | 常规编码任务、交给并行子智能体处理时（默认值） |
| `Haiku` | 文件浏览、简单重命名、快速提问 |

**`/output-style` 选项：**

| 风格 | 说明 | 推荐场景 |
|---|---|---|
| `auto` | 根据情况自动调整（默认值） | 日常使用 |
| `concise` | 只呈现核心内容，简洁精炼 | 快速迭代、代码修改 |
| `verbose` | 包含详细说明 | 学习目的、初次接触的代码库 |
| `explanatory` | 同时解释代码变更原因 | 编程学习、代码审查 |
| `warning` | 执行危险操作时显示强力警告 | 生产环境操作安全保障 |

### 语音输入

| 命令 | 说明 |
|---|---|
| `/voice` | 启用/禁用语音输入模式（长按 Space 后说话） |
| `/config` | 设置菜单（在 Language 选项中选择 Korean 可启用韩语语音识别） |

### 智能体 & 自动化

| 命令 | 说明 |
|---|---|
| `/agents` | 查看并管理当前项目中定义的子智能体列表 |
| `/mcp` | 查看已连接的 MCP 服务器列表并进行启用/禁用管理 |

### 导出

| 命令 | 说明 |
|---|---|
| `/export` | 提取当前会话上下文，以便导入其他聊天机器人（ChatGPT、Gemini 等） |
| `/export --clipboard` | 直接复制到剪贴板 |

---

## 🛠️ 创建自定义斜杠命令

您可以将常用的工作流程模块化为斜杠命令。

1. 在项目内创建 `.claude/commands/` 文件夹。
2. 创建名为 `ship.md` 等任意名称的文件，并编写要执行的工作流程。
3. 重启 Claude Code 后，输入 `/ship` 即可自动运行该工作流程。

→ 详情请参考 [自定义斜杠命令](../04-agents/custom-commands.md)