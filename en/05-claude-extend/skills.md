---
title: Claude Code Skills - Reusable AI Manuals
description: Standardizing task quality with Skills. Two-stage loading, task-specific guide documents, and patterns for automating repetitive work.
---

# Skills (Work Manuals for AI)

Unlike one-off prompts, skills are **reusable work manuals provided to AI to automate repetitive tasks and achieve consistent quality**.

---

## Why Use Skills?

| Reason | Description |
|---|---|
| **Repetitive automation** | Automatically execute complex tasks with a single short keyword like `/ppt` |
| **Consistent quality** | Enforces a fixed order, format, and checklist to always produce the same output |
| **Team sharing** | Share via Git so the entire team uses the same automation system |

---

## CLAUDE.md vs Custom Commands vs Skills

| | CLAUDE.md | Custom Commands | **Skills** |
|---|---|---|---|
| Load timing | Always fully loaded | Loaded on call | **Loaded only when needed** |
| Context cost | High | Medium | **Very low** |
| Use case | Global rules | Repetitive workflows | Domain expertise |

---

## Two-Stage Loading (The Core)

Two-stage loading is precisely why skills save context.

```
Stage 1 (Idle)
  → Only the skill name + one-line description is loaded (~50–100 bytes)
  → Occupies almost no context

Stage 2 (On call)
  → Only when the request is determined to match the skill's purpose
  → Loads the full SKILL.md body + all referenced files (on-demand)
```

CLAUDE.md and MCP tools always load their full content, but skills are loaded only when needed, dramatically conserving context.

---

## Where to Store Skills

```
~/.claude/skills/          # Personal (used across all projects)
.claude/skills/            # Project-specific (used only in that project)
```

To share with your team, place them in `.claude/skills/` and commit to Git.

---

## Creating a Skill

### Method 1 — Auto-generate with a plugin (recommended)

```
/install-plugin skill-creator
```

After installation, request in natural language and it will automatically generate a SKILL.md with best practices applied.

```
"Create a skill that automatically generates PPT presentations"
```

### Method 2 — Write manually

Create a `.claude/skills/my-skill/SKILL.md` file and write it using the structure below.

```markdown
---
name: ppt-generator
description: Automatically generates PPT presentations. Triggered by requests like
             'make a PPT', 'create slides', or 'I need presentation materials'.
             Converts markdown into a slide structure.
---

# PPT Generation Skill

## Execution Order
1. Identify the topic and target audience
2. Draft a table of contents and confirm
3. Write the content for each slide
4. Add key message emphasis points
```

---

## Writing the Description Is Everything

For a skill to trigger correctly, you need to write a good description.

```markdown
❌ Bad example
description: Document generation skill

✅ Good example  
description: Automatically generates PPT presentations. Triggered by requests like
             'make a PPT', 'I need slides', or 'create presentation materials'.
             Proceeds in order: write table of contents → fill in content.
```

It's best to include **core functionality + at least 3 trigger expressions users are likely to say**.

---

## Real-World Usage Examples

```
/client-report   # Automatically generate a client report
/code-review     # Run a code review checklist
/ppt             # Generate a PPT presentation
/deploy-check    # Run a pre-deployment checklist
```

> 💡 You might confuse this with custom commands (`.claude/commands/`).  
> Commands execute a defined workflow; skills inject domain expertise into the AI.