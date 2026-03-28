---
title: CLAUDE.md Hierarchy and Priority
description: CLAUDE.md, MEMORY.md, .claude/rules/ loading order and conflict resolution. Per-folder separation and Lazy Loading strategies.
---

# CLAUDE.md Hierarchy and Lazy Loading

As a project grows, stuffing all API specs or DB schemas into a single root `CLAUDE.md` wastes thousands of tokens every session.

---

## 1. Understanding the Loading Mechanism (Important)

Before adopting a per-folder CLAUDE.md strategy, you need to understand how loading works.

| Location | Load Timing |
|---|---|
| CLAUDE.md files **above** the working directory | Loaded **immediately** at session start |
| CLAUDE.md files **below** the working directory | Loaded only when files in that folder are actually being worked on ✅ |

> ⚠️ **Referencing files with `@` syntax is not true Lazy Loading.**  
> A reference like `@docs/db-schema.md` loads immediately at session start, consuming all its tokens.  
> True Lazy Loading only works by **placing a CLAUDE.md inside the folder itself**.

---

## 2. Per-Folder CLAUDE.md Separation Strategy (True Lazy Loading)

Write separate `CLAUDE.md` files inside folders organized by domain or feature.

```
📁 Project Root/
├── CLAUDE.md              ← Always loaded (common rules only, under 50–100 lines)
├── src/
│   ├── features/
│   │   └── auth/
│   │       └── CLAUDE.md  ← Loaded only when working in the auth folder
├── supabase/
│   └── CLAUDE.md          ← Loaded only when working in the supabase folder
└── docs/
    └── CLAUDE.md          ← Loaded only when working in the docs folder
```

When Claude Code is **run from the root**, it does not immediately read CLAUDE.md files in subdirectories — it only reads them when files inside those folders are actually being modified.

---

## 3. Pointer (@) References — When to Use Them

The `@` reference syntax is not for saving tokens — it's for **organizing your CLAUDE.md file structure for readability**.

```markdown
## References
- Overall architecture: @docs/architecture.md
- DB schema: @docs/db-schema.md
- API conventions: @docs/api-patterns.md
```

> Since this approach reads all referenced files at session start, **large files will actually backfire**.  
> Reference files should be kept as short and essential as possible.

---

## 4. Root CLAUDE.md — How to Keep It Lightweight

Be clear about what belongs in the root CLAUDE.md and what should be moved out.

**Include (common rules)**
- One-line tech stack summary
- Frequently used commands (`npm run dev`, `npm run test`, etc.)
- Language/coding conventions (ES modules, camelCase, etc.)
- Files/folders that must never be touched

**Exclude (move to subdirectory CLAUDE.md)**
- Domain-specific API specs
- Detailed DB schemas
- Business logic rules for specific features

> 💡 **Practical lesson:** A 1,500-line CLAUDE.md actually causes Claude to start ignoring rules.  
> The right direction is for CLAUDE.md to **shrink over time**.

---

## 5. Emphasize Critical Rules

The longer a CLAUDE.md gets, the more likely Claude is to skip over rules. Add emphasis keywords to rules that must never be violated.

```markdown
IMPORTANT: Never modify the .env file.
YOU MUST: All DB queries must pass RLS policies.
```

---

## 6. CLAUDE.local.md (Personal Settings)

Write personal settings that shouldn't be shared with the team in `CLAUDE.local.md` and add it to `.gitignore`.

> ⚠️ The official documentation classifies `CLAUDE.local.md` as deprecated and recommends using `@` imports instead. However, it still works and remains useful for separating personal settings in a team environment.

---

> 💡 **One-line summary:** True Lazy Loading = per-folder CLAUDE.md separation. `@` references load immediately.