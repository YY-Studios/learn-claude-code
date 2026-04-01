---
title: Claude Code Cost Optimization and Token Management
description: Identify where tokens are leaking. Practical saving strategies including the /context command, disabling MCP, and context compression.
---

# Cost Optimization & Token Management

Claude Code charges based on the tokens you use. Here's how to identify where tokens are leaking and reduce them.

---

## Checking Current Token Usage

```
/context
```

Displays token usage broken down by category in a bar chart format.

| Category | Meaning |
|---|---|
| `System Prompt` | System instructions such as CLAUDE.md |
| `System Tools` | Connected MCP servers, tool definitions |
| `User/Assistant` | Actual conversation content |

---

## TOP 5 Token-Heavy Patterns

### 1. Always Keeping Heavy MCPs On

MCPs that handle large volumes of data, like Notion or Linear, consume **10% or more** of `System Tools` tokens just by being active.

```
Fix: Enable only when needed
/mcp → deactivate/activate the relevant server
```

### 2. CLAUDE.md Becomes Too Long

Putting everything in the root CLAUDE.md wastes thousands of tokens every turn.

```
Fix: Split into per-folder CLAUDE.md files
Root: Only core rules, 50–100 lines
Subfolders: Only domain-specific rules → loaded only when working in that folder
```

→ See [CLAUDE.md Hierarchy](../02-context/claude-md-hierarchy.md) for details

### 3. Developing Multiple Features in One Session

As context accumulates, the history Claude must process grows, making it progressively slower and more expensive.

```
Fix: One session = one feature principle
Always run /clear after completing a feature
```

### 4. Analyzing Large Files Directly in the Chat

Pasting thousands of lines of JSON or log files into the chat consumes tens of thousands of tokens at once.

```
Fix: Script offloading
Ask Claude to write an analysis script,
run it locally → pass only the summarized results back to Claude
```

→ See [Script Offloading](../03-workflow/script-offload.md) for details

### 5. Overusing Subagents

Each subagent uses its own independent context. Running 3 in parallel can consume up to 3× the tokens.

```
Fix: Only run in parallel when tasks are truly independent
If not independent, a single session is far more efficient
```

---

## Cost Strategy by Model

Claude Code lets you switch models mid-task with `/model`.

| Model | Relative Cost | Suitable Tasks |
|---|---|---|
| Opus | Highest | Architecture design, complex bugs, critical decisions |
| Sonnet | Medium | General coding, parallel subagents |
| Haiku | Lowest | File exploration, simple renaming, quick questions |

**Pinning the subagent model:**

```bash
# Main session: Opus (judgment), subagents: Sonnet (execution)
export CLAUDE_CODE_SUBAGENT_MODEL="claude-sonnet-4-5"
```

---

## 3-Step Context Management

| Situation | Command | Effect |
|---|---|---|
| Context is over 70% full | `/compact` | Compresses down to a core summary |
| A single feature is complete | `/clear` | Full reset, starts a new session |
| Need to carry context across sessions | Update `TODO.md` then `/clear` | Context lives in files, memory is cleared |

---

## Cost Monitoring Checklist

Before starting work:
- [ ] Check current token usage with `/context`
- [ ] Disable unused MCP servers
- [ ] Select the right model for the scope of work

During work:
- [ ] `/clear` after each feature is complete
- [ ] Offload large files via scripts
- [ ] Use `think hard` only when truly necessary (increases internal reasoning tokens)

After work:
- [ ] Move recurring patterns from root CLAUDE.md into a folder-level CLAUDE.md
- [ ] Automate frequently used tasks with custom commands or hooks