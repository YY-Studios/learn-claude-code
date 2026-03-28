---
title: Per-Path Rule Configuration Guide for .claude/rules/
description: Split CLAUDE.md into multiple files to save tokens. Conditional loading with paths settings, applying different rules per folder.
---

# Project Initial Setup and Context Management (CLAUDE.md)

When working with AI agents, the most important things to watch out for are **context overflow and hallucination**. The core tool for preventing this is the `claude.md` file.

---

## ⚠️ Key Point: Always Run from the Project Root Directory
Claude Code searches for files relative to the current directory. If you run it from a subdirectory (e.g., `/apps/api`), it won't be able to read the entire project structure, leading to incorrect code generation or missing files. Always make a habit of running from the top-level root directory.

---

## The `/init` Command and `CLAUDE.md` Hierarchy
Running `/init` in the terminal creates a `claude.md` file that serves as the project's documentation.
- **Global scope:** `~/.claude/claude.md` (rules shared across all projects, e.g., "always respond in Korean")
- **Project scope:** `projectroot/claude.md` (project-specific architecture and conventions)

---

## 💡 `claude.md` Token Optimization and Splitting Strategy (Important)
Since the AI reads `claude.md` every time, an overly long file wastes a significant number of tokens.
* **Keep it under 300 characters:** Keep the root `claude.md` lightweight by summarizing only the essentials within 300 characters. (Recommended)
* **Split by folder:** Create DB-related rules in `/supabase/claude.md` and API-related rules in `/api/claude.md` separately. This is much more efficient, as Claude will only read the detailed rules when working in that specific folder.

---

## Trigger Keyword Configuration
You can register recurring pipelines (e.g., commit and push after tests pass) as trigger keywords in `claude.md`.
> "When I type the word 'Ship', please proceed in this order: 1. Run tests 2. Stop if they fail 3. If they pass, git add & commit 4. Push"
Now, simply typing 'Ship' in Claude Code will automatically execute the entire sequence above.

---

## 🤝 Compound Engineering (Team-Level Context Synchronization)
Commit `claude.md` to your Git repository so the entire team can share it. When one team member updates an architecture rule, all other team members can use the AI under the same rules and context.

---

**💡 Pro Tip: Let the AI Do the Editing Instead of Editing It Yourself**
If you establish a new coding convention or rule during a conversation, there's no need to open the `claude.md` file and type it in manually.
> "Add the pattern we just decided on to claude.md"
Just give that instruction and Claude will update the file on its own.