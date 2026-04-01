---
title: TODO.md Template Collection
description: TODO.md templates for maintaining continuity between sessions. Forms for recording task status, next steps, and notes.
---

# TODO.md Template Collection

TODO.md templates for maintaining task continuity between sessions. Copy and paste to save as `TODO.md` in your project root.

---

## Basic Template

```markdown
# [Project Name] TODO

## 🔥 In Progress
- [ ] 

## ✅ Completed
- [x] Initial project setup (2025-00-00)

## 📋 Up Next
- [ ] 

## 🚫 Blockers
- 

## 📝 Decision Notes
<!-- Record why decisions were made, with dates -->
- 2025-00-00: 
```

---

## Full-Stack Project Template

```markdown
# [Project Name] TODO

## 🔥 In Progress
- [ ] 

## 📦 Backend (Supabase)
### Completed
- [x] Database schema design
- [x] RLS policy configuration

### Upcoming
- [ ] Edge Function: [function name]
- [ ] Add migration

## 🖥️ Frontend (Next.js)
### Completed
- [x] Initial project setup

### Upcoming
- [ ] 

## 🐛 Known Bugs
- [ ] 

## 🚫 Blockers
- 

## 📝 Decision Notes
- 2025-00-00: 
```

---

## TODO Reading Rules to Add to CLAUDE.md

```markdown
## Work Rules
- Always read TODO.md at the start of each session to understand current status
- Update TODO.md whenever a feature is completed (check off completed items, add upcoming items)
- Record important technical decisions in the decision notes section with dates
- Before ending a session, summarize what was completed today and what comes next in TODO.md, then commit
```

---

## Per-Session Usage Examples

**Prompt at session start:**
```
Read TODO.md, understand what to work on today, then create a Plan.
```

**Prompt when work is completed:**
```
Check off the [feature name] I just finished in TODO.md and update the upcoming items as well.
```

**Prompt before ending a session:**
```
Summarize today's completed work, what to continue next time, and any important decisions
in TODO.md, then git commit.
```