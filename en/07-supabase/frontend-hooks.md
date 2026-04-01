---
title: Supabase Frontend Hook Creation Patterns
description: Manual hook patterns without supabase/ssr. How to write custom hooks using React Query and the Supabase client.
---

# Frontend Hook Creation Patterns

When delegating frontend hook creation to Claude, **without specifying constraints**, Claude will implement using the general approaches it knows (e.g., `@supabase/ssr`, Context API, etc.).  
The key to effective prompting is **specifying stack + constraints + file location** together.

---

## 💡 Why Is This Approach Effective?

| Element | Effect |
|---|---|
| Specifying the tech stack | Claude uses library APIs accurately |
| Specifying forbidden packages | Blocks unwanted implementation patterns |
| Specifying file location | Automatically follows architecture rules |
| Specifying return values | Unifies the interface predictably |

---

## 📋 Prompt Template (React + Zustand + TanStack Query + FSD)

```
Write a custom hook that fetches [domain/feature name] data using the Supabase client.

[Tech Stack & Constraints]
- React, TypeScript environment
- Use Zustand for state management, TanStack Query (React Query) for async data fetching and caching
- Do NOT use the @supabase/ssr package; initialize the Supabase client manually to implement the logic
- Follows FSD (Feature-Sliced Design) architecture, so the hook must be located at features/{domain}/api/
- Include error handling logic and clearly return loading state (isLoading)
- Import types from existing types at the shared/types/ path
```

---

## 📋 Prompt Template (Typing Room Standard — Next.js + Supabase Backendless)

```
Write a custom hook that fetches [feature name] data using the Supabase client.

[Tech Stack & Constraints]
- Next.js App Router, TypeScript environment
- Use React useState/useEffect without a separate state management library
- Use createClientComponentClient() from @/lib/supabase.ts for the Supabase client
- Hook file location: hooks/use[FeatureName].ts
- Return value: { data, isLoading, error, refetch }
- Return errors as error state instead of console.error
```

---

## ✅ Good Example vs ❌ Bad Example

**❌ Bad Example — Too vague**
```
Make a hook that fetches user data with Supabase.
```
→ Claude arbitrarily selects packages, ignores file location, defines types inline

**✅ Good Example — Constraints specified**
```
Create a hook that fetches the typing session history for the currently logged-in user from Supabase.
- Hook location: hooks/useTypingHistory.ts
- Supabase client: use createClientComponentClient() from @/lib/supabase.ts
- Import TypingSession type from @/types/typing.ts
- Return: { sessions: TypingSession[], isLoading, error }
```

---

## 💡 Registering Common Rules in CLAUDE.md

For constraints you find tedious to repeat every time, write them once in CLAUDE.md.

```markdown
## Frontend Rules
- Always use createClientComponentClient() from @/lib/supabase.ts for the Supabase client
- Do not use the @supabase/ssr package
- Hook return values must always follow the { data, isLoading, error } format
- Import types from the @/types/ path; defining types directly inside hook files is forbidden
```

This keeps your prompts much shorter and Claude automatically follows the conventions.