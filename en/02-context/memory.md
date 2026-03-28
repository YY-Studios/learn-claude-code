---
title: Claude Code /memory Automatic Memory System
description: A memory system that automatically saves and loads what Claude has learned. Maintains continuity between sessions and manages context.
---

# Automatic Memory System (/memory)

> Automatic memory is supported in **Claude Code v2.1.59 and above**. Check with `claude --version`.

---

## CLAUDE.md vs Automatic Memory — What's the Difference?

| | **CLAUDE.md** | **Automatic Memory (MEMORY.md)** |
|---|---|---|
| Written by | Written manually by a person | Written by Claude itself |
| Role | Rules and conventions guide | Records what was learned during a session |
| Team sharing | Can be committed to Git and shared | Stored locally only (not shared) |
| Storage location | Project root | `~/.claude/projects/<project>/memory/` |

> ⚠️ **Note on content:** Automatic memory is managed via `MEMORY.md`, which is a completely separate file from `CLAUDE.md`. It is **a personal knowledge store saved only locally**, not shared with teammates.

---

## What Gets Saved in Automatic Memory

Claude saves notes for itself while working. This includes build commands, debugging insights, architecture notes, code style preferences, and workflow habits. It doesn't save on every session — it decides whether something is worth remembering based on whether it will be useful in future conversations.

**What gets saved ✅**
- "Use bun instead of npm in this project" → automatically applied from the next session
- Debugging lessons like content-type being required for API calls
- Architecture decisions, common pitfalls and their solutions

**What doesn't get saved ❌**
- "The file path I'm currently working on"
- "The error message I'm currently debugging"
- Temporary information that's only meaningful within the session

---

## Storage File Structure

```
~/.claude/projects/<project>/memory/
├── MEMORY.md          ← Index file, auto-loaded every session (first 200 lines)
├── debugging.md       ← Debugging pattern details (loaded only when needed)
├── patterns.md        ← Code patterns and conventions
└── api-conventions.md ← Notes on API design
```

> All worktrees and subdirectories within the same Git repository **share a single memory directory**.

---

## Using the /memory Command

```
/memory
```

View the list of currently loaded memory files and toggle automatic memory ON/OFF.

---

## Explicitly Asking Claude to Remember Something

Tell Claude directly to save something to automatic memory.

```
"Remember this frontend convention"
"Save the fact that we always use pnpm to memory"
```

If you want it added to CLAUDE.md, you need to say so explicitly.

```
"Add this to CLAUDE.md"  ← saves to CLAUDE.md
"Remember this"          ← saves to automatic memory
```

---

## Practical Tips

- **Periodic memory cleanup is needed:** If you switched your package manager from npm to bun but the old memory still says npm, it causes confusion. You can directly ask Claude to update it: `"Delete this memory"`, `"Update the build-related content"` — Claude will modify the file accordingly.
- **Disabling automatic memory:** You can turn it off if you don't want it.
  ```bash
  CLAUDE_CODE_DISABLE_AUTO_MEMORY=1
  ```

---

> 💡 **One-line summary:** CLAUDE.md = the guide I write for Claude / MEMORY.md = the learning notes Claude writes for itself