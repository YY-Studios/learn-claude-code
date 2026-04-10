---
title: Harness Design — 5 Core Layers
description: How to design the 5 layers of a harness (Tools, Context, Memory, Permissions, Execution Loop). Covers Claude Code implementations, the "cheap tools first" principle, and cross-session state management.
---

# 🔴 Harness Design

> ⚠️ **Recommended prerequisite:** Read [What is Harness Engineering?](./01-harness-concept.md) first.

Designing a harness means building a complete system that lets an AI model **actually complete tasks**. This document covers the 5 layers that make up a harness and the design principles for each.

---

## The 5 Core Layers of a Harness

```
┌──────────────────────────────────────────┐
│  Layer 5: Execution Loop                  │
├──────────────────────────────────────────┤
│  Layer 4: Permission Control              │
├──────────────────────────────────────────┤
│  Layer 3: Memory                          │
├──────────────────────────────────────────┤
│  Layer 2: Context                         │
├──────────────────────────────────────────┤
│  Layer 1: Tools                           │
├──────────────────────────────────────────┤
│          [ AI Model ]                     │
└──────────────────────────────────────────┘
```

---

## Layer 1: Tools

### Concept

Tools are the **only means** by which a model can interact with the outside world. Without tools, a model can't read files or run code.

### Implementation in Claude Code

Claude Code includes built-in tools:

| Tool | Role |
|---|---|
| `Read` | Read files |
| `Write` | Create files |
| `Edit` | Modify files |
| `Bash` | Run shell commands |
| `Grep` | Search content |
| `Glob` | Find files by pattern |
| `WebSearch` | Search the web |

You can add external tools via MCP (Model Context Protocol).

### Core Principle: "Cheap Tools First"

Every tool has a **cost** — processing time, API fees, and error potential all add up.

| Tool type | Relative cost | When to use |
|---|---|---|
| `Grep`, `Glob`, `Read` | Very low | Searching, exploring |
| `Bash` (local scripts) | Low | Simple transforms/calculations |
| `Edit`, `Write` | Medium | File modification |
| Additional LLM calls | High | Complex reasoning/generation |
| External API calls | High + latency | When external data is needed |

```
✅ Good: Extracting a list of functions from a file
   → Use Grep to search for "def " pattern (0.01s)

❌ Bad: Extracting a list of functions from a file
   → Pass the entire file to LLM and ask it to extract function names (2–5s + cost)
```

> 💡 **Design tip:** Tool selection order = Grep/Glob → Read → Bash → Edit → LLM

---

## Layer 2: Context

### Concept

For a model to make **correct judgments**, it needs the right background information. The context layer designs "what to tell the model."

### Implementation in Claude Code

**`CLAUDE.md`** — Project-wide context

```markdown
# CLAUDE.md

## Project Overview
This project is a SaaS built with Next.js 14 + Supabase.

## Coding Rules
- Use TypeScript strict mode
- Components go under src/components/
- API routes go under app/api/

## Do NOT
- Leave console.log in commits
- Use the `any` type
```

**`.claude/rules/`** — Situational rule files

```
.claude/rules/
  docs.md        ← documentation writing rules
  testing.md     ← test writing rules
  database.md    ← DB-related cautions
```

### Context Design Principles

```
❌ Bad context: missing or too long
   → Model guesses the project's rules

✅ Good context: concise and structured
   → Project overview + rules + prohibited actions, briefly
```

> ⚠️ **Warning:** Context is included with every request. Too long means less room for actual work.

---

## Layer 3: Memory

### Concept

AI models fundamentally **forget everything when a session ends**. The memory layer designs how to persist state across sessions.

### Implementation in Claude Code

**Short-term memory — within a session**

```markdown
# TODO.md (task tracking)
- [x] Implement login API
- [ ] Add email verification
- [ ] Write tests

# Keep current work context in a file
```

**Long-term memory — across sessions**

```
.claude/memory/
  user.md          ← user preferences and work style
  project.md       ← ongoing work, decisions
  feedback.md      ← past feedback, lessons learned
  MEMORY.md        ← memory file index
```

**Mid-term memory — for complex tasks**

```markdown
# Plans.md (implementation plan)
## Goal
Build authentication system

## Done
- [x] DB schema design
- [x] Sign-up API

## In Progress
- [ ] JWT token issuance

## Next
- [ ] Email verification
```

### Cross-Session State Design

```
Start work → Check Plans.md / TODO.md
    ↓
Working   → Check off completed items, record new decisions
    ↓
End work  → Save context for the next session
    ↓
Next session → Read files and continue
```

> 💡 **Design tip:** Use `/compact` to summarize long conversations and preserve the key points in Plans.md.

---

## Layer 4: Permission Control

### Concept

Clearly define **what the model can and cannot do**. Without permissions, it might accidentally delete important files or call unintended APIs.

### Implementation in Claude Code

**`settings.json`** — Allow/deny tools

```json
{
  "permissions": {
    "allow": [
      "Bash(git *)",
      "Bash(npm test)",
      "Read(**)",
      "Edit(src/**)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force)"
    ]
  }
}
```

**Hooks** — Control before/after tool execution

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "echo '[BASH] Running: $TOOL_INPUT' >> .claude/audit.log"
        }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [{
          "type": "command",
          "command": "npm run lint --fix"
        }]
      }
    ]
  }
}
```

### Permission Design Principles

```
Least privilege: only allow what's needed
Audit log: record important actions
Automation: automate repeated checks with Hooks
```

| Scenario | Permission design |
|---|---|
| Read-only analysis | Block Bash, allow Read only |
| Safe dev environment | Block git push --force |
| Automation pipeline | Allow Write only to specific directories |

---

## Layer 5: Execution Loop

### Concept

Design a loop where the model works **repeatedly** until a task is complete, rather than answering once and stopping.

### Implementation in Claude Code

Claude Code has a built-in "conversation → tool execution → reflect → repeat" loop.

```
User request
    ↓
Analysis (explore codebase with Read, Grep)
    ↓
Plan (write Plans.md)
    ↓
Execute (Edit, Bash, etc.)
    ↓
Validate (run tests, check lint)
    ↓
Done or next step
```

**Control loops with custom commands**

Define custom loops in the `.claude/commands/` directory:

```markdown
# .claude/commands/review.md
---
description: PR code review loop
---

Review the PR in this order:
1. Get the list of changed files (git diff --name-only)
2. Read each file's changes
3. Write feedback on code quality, security, and performance
4. Save a summary to REVIEW.md
```

---

## In Practice: A 5-Layer Design Example

**Goal:** Build a "documentation auto-update agent"

```
Layer 1 (Tools)
  → Read, Grep (read code)
  → Write (generate docs)
  → Bash("git diff") (detect changes)

Layer 2 (Context)
  → CLAUDE.md: "Documentation style and rules for this project"
  → .claude/rules/docs.md: "Documentation format guide"

Layer 3 (Memory)
  → TODO.md: "Which files still need docs updated"
  → last-updated.json: "Last doc-update timestamp per file"

Layer 4 (Permissions)
  → Allow Edit(docs/**)
  → Block Bash(git push) (human reviews before pushing)
  → PostToolUse Hook: auto-run spellcheck after doc update

Layer 5 (Execution Loop)
  → Start loop with /update-docs custom command
  → Detect changed code → update related docs → request review → repeat
```

---

## Summary: Claude Code Implementations by Layer

| Layer | Claude Code implementation |
|---|---|
| Tools | Built-in tools (Read/Write/Bash etc.) + MCP servers |
| Context | `CLAUDE.md` + `.claude/rules/*.md` |
| Memory | `TODO.md` + `Plans.md` + `.claude/memory/` |
| Permissions | `settings.json` + Hooks |
| Execution Loop | Built-in conversation loop + `.claude/commands/*.md` |

> 💡 **Next step:** Design a harness that fits your own workflow. The fastest starting point is writing a thorough `CLAUDE.md`.
