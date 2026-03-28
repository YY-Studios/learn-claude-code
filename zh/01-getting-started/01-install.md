---
title: Claude Code 安装方法（Windows、Mac、Linux）
description: 从 Claude Code 安装到初始配置。Node.js 20+ 要求、各平台安装指南、登录及开始第一个项目。
---

 安装方法

> 📖 官方文档: [code.claude.com/docs/ko](https://code.claude.com/docs/ko/overview)

---

## 1. 选择套餐

使用 Claude Code 需要 **Pro 套餐及以上**。免费套餐无法使用。

| 套餐 | 价格 | 推荐对象 |
|---|---|---|
| Pro | $20/月 | 初次使用者 |
| Max 5× | $100/月 | 用量增加时（Pro 的 5 倍限额） |
| Max 20× | $200/月 | 重度用户 / 长时间运行 Agent |
| Teams | $30/人/月（最少 5 人） | 团队使用，需要共享上下文时 |
| Enterprise | 单独询价 | 大型组织 |

> 💡 建议先从 Pro 开始，用 `/context` 监控 Token 用量，如果频繁超出限额再升级到 Max。

---

## 2. 安装

### ✅ 推荐方式 — 原生安装

这是官方推荐方式。无需单独安装 Node.js，只需在终端执行一行命令即可完成安装，并支持后台自动更新。

**macOS / Linux**
```bash
curl -fsSL https://claude.ai/install.sh | sh
```

**Windows**
```bash
winget install Anthropic.ClaudeCode
```

> ⚠️ WinGet 安装方式不支持自动更新。请定期执行 `winget upgrade Anthropic.ClaudeCode`。

---

### 使用 npm 安装（旧版方式）

> ⚠️ 官方文档将 npm 安装方式列为 deprecated（不再推荐）。如果是全新安装，请优先考虑原生安装方式。

如果已有 Node.js 18+ 环境且希望通过 npm 管理，可以使用此方式。

```bash
npm install -g @anthropic-ai/claude-code
```

**验证安装：**
```bash
claude --version
```

---

## 3. 初次启动 Claude Code

### 方式一 — 在终端直接运行

进入项目文件夹后输入 `claude`。

```bash
cd 我的项目文件夹
claude
```

### 方式二 — 通过 VS Code 扩展运行

1. 在 VS Code 扩展市场搜索 `Claude Code for VS Code` 并安装
2. 安装完成后点击右上角图标

> ⚠️ **请务必在项目根目录下运行。** 如果在子文件夹（例如 `/apps/api`）中运行，将无法读取整个项目结构，可能导致生成错误文件或找不到文件的问题。

---

## 4. 登录

首次运行时浏览器会自动打开并要求登录。使用 claude.ai 账号登录后即可立即使用。

---

## 5. 更新

```bash
# 原生安装（自动更新，如需手动检查）
claude update

# npm 安装方式
npm update -g @anthropic-ai/claude-code

# Windows winget
winget upgrade Anthropic.ClaudeCode
```

---

> 💡 **下一步：** 如果安装过程中出现问题 → [故障排除](./04-troubleshooting.md)  
> 安装成功后 → 前往 [CLAUDE.md 编写方法](./03-claude-md.md)。