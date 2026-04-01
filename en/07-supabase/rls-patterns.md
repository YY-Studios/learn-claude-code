---
title: Supabase RLS Policy Writing Patterns
description: Automating Row Level Security policies. Security policy templates, role-based access control, and how to avoid common RLS mistakes.
---

# Supabase RLS Policy Writing Patterns

RLS (Row Level Security) is the core of Supabase security. When delegating RLS policy writing to Claude Code, you must specify the **table structure, authentication method, and access rules** together so it writes them as intended.

---

## Common Mistakes When Delegating RLS to Claude

**Confusing `auth.uid()` with regular columns**
Claude may use an incorrect function like `user_id = current_user` instead of `user_id = auth.uid()`. Always explicitly specify Supabase auth functions.

**Creating policies without names**
Unnamed policies are hard to find when you need to modify or delete them later.

**Bundling SELECT/INSERT/UPDATE/DELETE into one**
In Supabase RLS, separating policies by operation type makes them easier to manage.

---

## 📋 Prompt Template

```
Write Supabase RLS policies for the table below.

[Table Structure]
- Table name: typing_sessions
- Columns: id (uuid), user_id (uuid, FK → auth.users), content (text), created_at (timestamptz)

[Authentication Method]
- Uses Supabase Auth
- Authenticated users: get current user ID via auth.uid() function
- Unauthenticated users (anon): no access

[Access Rules]
- SELECT: can only query own records (user_id = auth.uid())
- INSERT: authenticated users only, user_id must match auth.uid()
- UPDATE: can only modify own records
- DELETE: can only delete own records

[Constraints]
- Policy names should follow the format "[table_name]_[operation]_[role]"
- Use Supabase auth functions: auth.uid(), auth.role()
- No separate handling for admin roles
```

---

## RLS Policy Examples (Based on Typing Room)

```sql
-- Enable RLS
ALTER TABLE typing_sessions ENABLE ROW LEVEL SECURITY;

-- SELECT: query only own records
CREATE POLICY "typing_sessions_select_authenticated"
ON typing_sessions
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- INSERT: insert only with own user_id
CREATE POLICY "typing_sessions_insert_authenticated"
ON typing_sessions
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- UPDATE: modify only own records
CREATE POLICY "typing_sessions_update_authenticated"
ON typing_sessions
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- DELETE: delete only own records
CREATE POLICY "typing_sessions_delete_authenticated"
ON typing_sessions
FOR DELETE
TO authenticated
USING (user_id = auth.uid());
```

---

## Commonly Used Patterns

### Public Read + Owner-Only Write

```sql
-- Anyone can read (blog posts, etc.)
CREATE POLICY "posts_select_public"
ON posts FOR SELECT TO anon, authenticated
USING (true);

-- Only the author can modify/delete
CREATE POLICY "posts_update_owner"
ON posts FOR UPDATE TO authenticated
USING (author_id = auth.uid())
WITH CHECK (author_id = auth.uid());
```

### Team-Based Access (Using Join Tables)

```sql
-- Only users in the team_members table can access
CREATE POLICY "documents_select_team_member"
ON documents FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM team_members
    WHERE team_members.team_id = documents.team_id
    AND team_members.user_id = auth.uid()
  )
);
```

### Service Role Bypasses RLS

Using `SUPABASE_SERVICE_ROLE_KEY` in Edge Functions bypasses RLS. Use this for admin tasks or background jobs.

```typescript
// Using service role in Edge Function (bypasses RLS)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!  // ← bypasses RLS
)
```

> ⚠️ The `SERVICE_ROLE_KEY` must never be exposed to the client (browser). Use it only server-side in Edge Functions.

---

## RLS Policy Testing Prompt

After writing policies, also ask Claude for test queries.

```
"Write SQL test cases to verify that the RLS policies you just wrote work correctly.
- Cases where an authenticated user queries/modifies/deletes their own records
- Cases where access to another user's records is denied
- Cases where an unauthenticated user (anon) is denied access"
```

---

## Registering Common Rules in CLAUDE.md

```markdown
## Supabase RLS Rules
- Write RLS policies separated by operation (SELECT/INSERT/UPDATE/DELETE)
- Policy name format: "[table_name]_[operation]_[role]" (e.g. users_select_authenticated)
- Auth function: use auth.uid() (do not use current_user)
- Always include RLS activation when creating new tables
- Service Role Key is only for use in Edge Functions — never expose to clients
```