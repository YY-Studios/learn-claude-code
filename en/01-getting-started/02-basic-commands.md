---
title: Claude Code Core Commands & Shortcuts
description: Essential slash commands and shortcuts for efficient token management. Practical usage of /context, /compact, Shift+Tab plan mode, and more.
---

# Core Commands & Shortcuts (Quick Reference)

A collection of essential commands and shortcuts to boost your token efficiency and workflow speed in Claude Code.

---

## ⌨️ Must-Know Key Shortcuts

| Shortcut | Action |
|---|---|
| `Shift + Tab` | **Toggle Plan ↔ Edit mode** — Essential when you want to plan before making direct code changes |
| `ESC` once | Immediately interrupt the current operation |
| `ESC` twice | **Rewind** — Returns to the previous prompt state |

---

## ⚡ Running Bash Commands in Terminal (`!`)

You don't need to open a new terminal to check git status or start a server inside Claude Code. Prefix any command with `!` to execute it as a local Bash command immediately.

```
!git status        → Check changed files
!git diff          → View detailed changes
!npm run dev       → Start local server
!npm run test      → Run tests
```

---

## 💬 Essential Slash Commands

### Session & Context Management

| Command | Description |
|---|---|
| `/init` | Auto-generates `CLAUDE.md`, your project's instruction file (required during initial project setup) |
| `/clear` | Completely resets the accumulated conversation context |
| `/compact` | Compresses context by keeping only key summaries to save tokens |
| `/context` | Visually displays current token usage in the session as a bar chart |

> 💡 Running `/context` shows token usage broken down by `System Prompt`, `System Tools`, and `User/Assistant`. If `System Tools` is consuming a lot after connecting MCP, consider deactivating it. → [MCP Token Management](../04-agents/mcp.md)

### Memory & Settings

| Command | Description |
|---|---|
| `/memory` | Displays the contents of currently loaded memory (`CLAUDE.md`, `MEMORY.md`, etc.) |
| `/status` | Shows a comprehensive overview of your logged-in account, subscription plan, and connected MCP server status |
| `/allowed-tools` | View and manage the list of tools permitted for the AI (file writing, local command execution, etc.) |

### Model & Output

| Command | Description |
|---|---|
| `/model` | Switch models based on task complexity to optimize token usage |
| `/output-style` | Change the AI's response style |

**`/model` Selection Guide:**

| Model | Best For |
|---|---|
| `Opus` | Complex architecture design, mysterious bug resolution, critical decision-making |
| `Sonnet` | General coding tasks, delegating to parallel sub-agents (default) |
| `Haiku` | File exploration, simple renaming, quick questions |

**`/output-style` Options:**

| Style | Description | Recommended When |
|---|---|---|
| `auto` | Automatically adjusts to the situation (default) | General use |
| `concise` | Short and to the point | Fast iterative work, code edits |
| `verbose` | Includes detailed explanations | Learning purposes, unfamiliar codebases |
| `explanatory` | Explains reasons behind code changes | Learning to code, code reviews |
| `warning` | Displays strong warnings for risky operations | Safety net for production work |

### Voice Input

| Command | Description |
|---|---|
| `/voice` | Enable/disable voice input mode (hold Space and speak) |
| `/config` | Settings menu (select Korean under Language for Korean voice recognition) |

### Agents & Automation

| Command | Description |
|---|---|
| `/agents` | View and manage the list of sub-agents defined in the current project |
| `/mcp` | View connected MCP servers and enable/disable them |

### Export

| Command | Description |
|---|---|
| `/export` | Extracts the current session context so it can be imported into other chatbots (ChatGPT, Gemini, etc.) |
| `/export --clipboard` | Copies directly to clipboard |

---

## 🛠️ Creating Your Own Custom Slash Commands

You can modularize frequently used pipelines as slash commands.

1. Create a `.claude/commands/` folder inside your project.
2. Create a file with any name you want, such as `ship.md`, and write the workflow to execute.
3. After restarting Claude Code, typing `/ship` will automatically run that pipeline.

→ See [Custom Slash Commands](../04-agents/custom-commands.md) for details