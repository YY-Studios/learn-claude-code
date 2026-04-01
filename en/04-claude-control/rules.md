---
title: .claude/rules/ Path-Based Rule Configuration Guide
description: Split CLAUDE.md into multiple files to save tokens. Conditional loading with paths settings, applying different rules per folder.
---

# .claude/rules/ Path-Based Rules

When using AI agents, once CLAUDE.md exceeds 200 lines, Claude starts ignoring rules. The key tool to prevent this is the `.claude/rules/` directory.

---

## ⚠️ When Do You Need Rules?

**If you're seeing these symptoms, it's time to split into Rules:**
- Claude is violating a rule you just mentioned
- Even saying "I told you earlier" doesn't help
- When you run `/context`, the System Prompt takes up a large portion

**Choosing a solution:**

**If Claude is ignoring rules because they're too long** → Split into Rules. Keep only the core rules in CLAUDE.md and move folder-specific detailed rules to `.claude/rules/`.

**If it's a repetitive task (lint before commit, format on file save)** → Automate with Hooks. Repeated instructions like "always run npm run lint before committing" shouldn't be in CLAUDE.md — make them a pre-commit Hook instead.

**If it's a rule that's always followed** → Consider converting to a Hook. Rules that Claude follows 100% of the time are better automated as Hooks to save tokens.

> **💡 Official recommendation:** "Automate what Claude does well with Hooks, and explicitly define what it doesn't with Rules."

---

## Basic Structure

```
your-project/
├── .claude/
│   ├── CLAUDE.md              ← Core rules (50-100 lines)
│   └── rules/
│       ├── code-style.md      ← Global style (no paths)
│       ├── api.md             ← Only for API work (with paths)
│       └── components.md      ← Only for component work
```

**Important:** All `.md` files inside `.claude/rules/` are automatically recognized.

---

## Two Loading Methods

### Always Load (no paths)

If there is no YAML frontmatter or no `paths` field, the file is loaded unconditionally at session start. It operates at the same priority as CLAUDE.md.

```markdown
# Coding Style Rules

- 2-space indentation
- ESLint compliance
```

### Conditional Load (with paths)

If the YAML frontmatter has a `paths` field, the file is only loaded when working with matching files. API rules only enter the context when modifying files under `src/api/`.

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Rules

- Zod validation required
- rate limiting required
```

---

## Syntax: YAML Frontmatter

```markdown
---
paths:
  - "path/pattern/**"
  - "another/pattern/*.ts"
---

# Rule Content
```

**Notes:**
- `paths:` (plural — not `path`)
- Must start with `---` and end with `---`
- Each path is a YAML array in `- "path"` format

---

## Path Patterns

| Pattern | Matched Files |
|---|---|
| `"src/api/**/*.ts"` | `src/api/users/route.ts` |
| `"src/components/*.tsx"` | `src/components/Button.tsx` (excludes subdirectories) |
| `"**/*.test.ts"` | All test files |

**Glob pattern rules:**
- `*` = one level (does not cross slashes)
- `**` = all levels (recursive)

---

## Real-World Examples

### API Rules (conditional load)

**`.claude/rules/api.md`**
```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Rules

- Zod validation required
- rate limiting default 100 req/min
- Error response format: { error: "message", code: "CODE" }
- JWT verification via Supabase
```

### Component Rules (conditional load)

**`.claude/rules/components.md`**
```markdown
---
paths:
  - "src/components/**/*.tsx"
---

# React Component Rules

## Props Naming
- Booleans: `isLoading`, `hasError`
- Handlers: `onSubmit`, `onClick`

## Styling
- Tailwind CSS only
- No inline styles
```

---

## 💡 Practical Tips

### 1. Splitting an Existing CLAUDE.md

A step-by-step strategy for migrating a long CLAUDE.md to Rules.

```
1. Back up CLAUDE.md (make a copy)
2. Group by folder (API/components/DB...)
3. Create Rules files + set paths
4. Delete those sections from CLAUDE.md
5. Test one at a time (don't split everything at once)
```

### 2. Measured Token Savings

**Based on the Typingroom project:**
```
BEFORE: CLAUDE.md 280 lines → always loaded

AFTER: CLAUDE.md 50 lines + rules 230 lines (split by paths)

Results:
- During API work: only 150 lines loaded (46% savings)
- During component work: only 140 lines loaded (50% savings)
```

### 3. Finding paths Patterns

You can check file patterns you frequently work with using git log.

```bash
# Check frequently worked-on files
git log --name-only --pretty=format: | sort | uniq -c | sort -rn | head -20

# Example output:
# 42 src/api/users/route.ts
# 38 src/components/Button.tsx
# 25 src/hooks/useAuth.ts

→ Split rules separately for src/api/**, src/components/**, src/hooks/**
```

### 4. Checking for Conflicts

> "Find any conflicting rules between CLAUDE.md and rules"

Ask Claude and it will find them for you.

---

## ❌ Never Do This (Common Mistakes)

### Mistake 1: Using the singular `path`

This is the syntax mistake that trips people up 8 out of 10 times.

```markdown
# ❌ Wrong
path: "src/api/**"

# ✅ Correct
---
paths:
  - "src/api/**/*.ts"
---
```

### Mistake 2: Thinking it's conditional without paths

Without a paths frontmatter, the file is always loaded unconditionally.

```markdown
# .claude/rules/api.md

# API Rules
- rate limiting required
```

→ "This will only load during API work" ← This is wrong. Without paths, it always loads.

### Mistake 3: Conflicting with CLAUDE.md

```markdown
# CLAUDE.md
- Use Express for API

# .claude/rules/api.md
- Use Fastify for API
```

→ Claude gets confused and picks randomly.

**Fix:** Keep only the stack overview in CLAUDE.md, and put specific implementation rules in Rules.

### Mistake 4: Making 10 files with 10 lines each

```
❌ Bad example:
.claude/rules/
  ├── api-users.md (10 lines)
  ├── api-auth.md (8 lines)
  ├── api-posts.md (12 lines)
  ...

✅ Good example:
.claude/rules/
  └── api.md (40 lines, all consolidated)
```

**Rule of thumb:** Only split when a single file exceeds 50 lines and is clearly independent.

### Mistake 5: Continuing to work when rules aren't being applied

When you've created Rules but Claude isn't following them.

**Checklist:**
```
1. Is the YAML syntax correct? (---, paths:)
2. Does the path pattern match the actual files?
3. Have you restarted Claude Code?
```

**How to verify:**
> "Show me the rule files currently loaded"

Ask Claude and it will show you the list of currently loaded rules.

---

## Usage Patterns

### Basic 3-tier Structure

```
CLAUDE.md (50 lines)
  ← Project stack, core prohibitions

.claude/rules/
  ├── code-style.md (no paths, 50 lines)
  │   ← Global coding style
  ├── api.md (with paths, 50 lines)
  │   ← Loaded only during src/api/** work
  └── components.md (with paths, 50 lines)
      ← Loaded only during src/components/** work
```

**Result:**
- Total rules are 200 lines but only 150 lines are loaded at a time
- 25% token savings

---

## Troubleshooting

### When Rules Aren't Being Applied

```
1. Check YAML frontmatter syntax (---, paths:)
2. Verify that the path pattern matches the actual files
3. Restart Claude Code
```

### When a File with paths Always Loads

```
→ The glob pattern is too broad (like **/* matching everything)
→ Double-check the paths syntax
```

### How to Verify Loading

```bash
# Ask Claude directly
"Show me the rule files currently loaded"

# Or use Hook for log output
# .claude/settings.json
{
  "hooks": {
    "InstructionsLoaded": [{
      "hooks": [{
        "type": "command",
        "command": "echo 'Loaded: $HOOK_FILE_PATH'"
      }]
    }]
  }
}
```

→ Logs will appear in the terminal showing which files were loaded and when.

---