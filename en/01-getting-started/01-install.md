---
title: How to Install Claude Code (Windows, Mac, Linux)
description: From installation to initial setup. Node.js 20+ requirements, platform-specific installation guides, login, and starting your first project.
---

 Installation Guide

> 📖 Official docs: [code.claude.com/docs/ko](https://code.claude.com/docs/ko/overview)

---

## 1. Choose a Plan

To use Claude Code, a **Pro plan or higher** is required. The free plan is not supported.

| Plan | Price | Recommended For |
|---|---|---|
| Pro | $20/month | Getting started |
| Max 5× | $100/month | When usage grows (5× limit vs Pro) |
| Max 20× | $200/month | Heavy users / long-running agents |
| Teams | $30/person/month (min. 5 people) | Teams needing shared context |
| Enterprise | Contact sales | Large organizations |

> 💡 We recommend starting with Pro, monitoring your token usage with `/context`, and upgrading to Max if you frequently hit the limit.

---

## 2. Installation

### ✅ Recommended Method — Native Installation

This is the officially recommended method. No separate Node.js installation needed — install with a single terminal command, with background auto-updates supported.

**macOS / Linux**
```bash
curl -fsSL https://claude.ai/install.sh | sh
```

**Windows**
```bash
winget install Anthropic.ClaudeCode
```

> ⚠️ WinGet installation does not auto-update. Run `winget upgrade Anthropic.ClaudeCode` periodically.

---

### Installing via npm (Legacy)

> ⚠️ The official documentation classifies npm installation as deprecated (no longer recommended). For new installations, consider native installation first.

If you already have a Node.js 18+ environment set up and prefer to manage it through npm, this option is available.

```bash
npm install -g @anthropic-ai/claude-code
```

**Verify installation:**
```bash
claude --version
```

---

## 3. Getting Started with Claude Code

### Method 1 — Run Directly from Terminal

Navigate to your project folder and type `claude`.

```bash
cd my-project-folder
claude
```

### Method 2 — Run via VS Code Extension

1. Search for `Claude Code for VS Code` in the VS Code extension marketplace and install it
2. Click the icon in the upper right after installation

> ⚠️ **Always run from the project root directory.** Running from a subdirectory (e.g., `/apps/api`) means Claude Code cannot read the full project structure, which can cause it to create files in the wrong location or fail to find files.

---

## 4. Login

On first launch, your browser will open automatically and prompt you to log in. Log in with your claude.ai account and you're ready to go.

---

## 5. Updates

```bash
# Native installation (auto-updates; run manually to check)
claude update

# npm installation
npm update -g @anthropic-ai/claude-code

# Windows winget
winget upgrade Anthropic.ClaudeCode
```

---

> 💡 **Next steps:** If you ran into issues during installation → [Troubleshooting](./04-troubleshooting.md)  
> If installation succeeded → move on to [How to Write CLAUDE.md](./03-claude-md.md).