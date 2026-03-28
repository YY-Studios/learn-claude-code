---
title: Supabase Edge Function Creation Patterns
description: Writing Deno Edge Functions with Claude Code. Practical patterns for environment constraints, type definitions, and error handling.
---

# Supabase Edge Function Creation Patterns

When generating Supabase Edge Functions with Claude Code, if you don't clearly specify the **Deno runtime environment** and **deployment method**, it will write code in Node.js style. The key is to explicitly state your constraints in the prompt.

---

## What is an Edge Function?

Supabase Edge Functions are serverless functions that run on the **Deno runtime**. Here's how they differ from Node.js:

| | Node.js | Supabase Edge Function (Deno) |
|---|---|---|
| Import style | `require()` or ESM | ESM only (`import`) |
| Packages | npm | URL import or npm: prefix |
| Supabase client | `@supabase/supabase-js` | `npm:@supabase/supabase-js` |
| Environment variables | `process.env` | `Deno.env.get()` |

---

## 📋 Prompt Template — Basic Edge Function

```
Write a Supabase Edge Function.

[Feature Description]
- [Describe the feature here]

[Tech Stack & Constraints]
- Deno runtime environment (not Node.js)
- ESM-style imports only
- Supabase client: npm:@supabase/supabase-js
- Environment variable access: Deno.env.get('VARIABLE_NAME')
- File location: supabase/functions/[function-name]/index.ts
- Include CORS headers (handle OPTIONS method)
- Always return error responses as JSON

[Response Format]
- Success: { data: ..., error: null }
- Failure: { data: null, error: "error message" }
```

---

## 📋 Prompt Template — Edge Function with OpenAI Integration

```
Write a Supabase Edge Function that calls the OpenAI API.

[Feature Description]
- [Describe the feature here]

[Tech Stack & Constraints]
- Deno runtime, ESM import
- OpenAI client: npm:openai
- OpenAI API key: Deno.env.get('OPENAI_API_KEY')
- Supabase client: npm:@supabase/supabase-js
- Auth: validate JWT from Authorization header using Supabase
- File location: supabase/functions/[function-name]/index.ts
- Use ReadableStream for streaming responses if needed
```

---

## ✅ Good Example vs ❌ Bad Example

**❌ Bad Example — No Deno environment specified**
```
"Create an Edge Function that takes a user ID and generates a sentence."
```
→ Claude writes using `process.env`, `require()`, Node.js style — causes errors at deployment

**✅ Good Example — Environment specified**
```
"Write a Supabase Edge Function based on the Deno runtime.
- Accept userId from the request body and query the users table
- Supabase client: npm:@supabase/supabase-js
- Environment variables: Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
- File location: supabase/functions/get-user/index.ts"
```

---

## CORS Handling (Required Boilerplate)

When you ask Claude to include CORS, it will follow the structure below. Preflight requests (OPTIONS) are often missed, so always specify them explicitly.

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Actual logic
  // ...
})
```

---

## Deployment & Testing

```bash
# Local testing
supabase functions serve [function-name] --env-file .env.local

# Deploy
supabase functions deploy [function-name]

# View logs
supabase functions logs [function-name]
```

To have Claude Code handle testing as well:

```
"Also write a curl command to test the Edge Function we just created locally."
```

---

## Registering Common Rules in CLAUDE.md

```markdown
## Supabase Edge Function Rules
- Runtime: Deno (not Node.js)
- Import: ESM style, use npm: prefix (e.g. npm:@supabase/supabase-js)
- Environment variables: use Deno.env.get() (process.env is forbidden)
- File location: supabase/functions/[function-name]/index.ts
- Include CORS handling in all functions (OPTIONS method)
- Response format: { data: ..., error: ... }
```

→ For frontend hook patterns, see [frontend-hooks.md](./frontend-hooks.md)