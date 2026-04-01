---
title: How to Find & Install Claude Code Skills
description: How to find and install skills from external platforms like Skills.sh and Skills.mcp. Recommended skills and precautions.
---

# Finding & Installing Skills

You can use skills created by the community instead of building your own.

---

## Where to Find Skills

| Platform | Features |
|---|---|
| **Anthropic Official Marketplace** | Access via `/plugins` command in Claude Code |
| **Skills.sh** | Popular leaderboard based on install count |
| **Skills.mcp** | Category-based organization for easy browsing |
| **Skill.bu** | Browser playground to try before installing (coming soon) |

---

## Recommended Skills

### Find Skills (essential for beginners)
A skill that finds skills for you. Describe what you need in natural language and it will suggest relevant skills with install commands.
```
"Find me a skill for making card news"
```

### Commit Command
Automatically writes commit messages after code changes.

### Skill Creator
A tool that creates custom skills tailored to your needs. → See [Creating Your Own Skills](./skills.md)

---

## How to Install

Access the marketplace via `/plugins` in Claude Code, or install directly from the terminal.

---

## ⚠️ Precautions

- **Install limit**: Too many skills can cause Claude to miss some. Keep it to around **40 or fewer**.
- **Security check**: External skills may include file deletions or external calls. Check the markdown file on GitHub before installing.
