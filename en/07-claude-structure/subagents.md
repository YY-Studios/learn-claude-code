---
title: Subagents - Role Separation and Parallel Processing
description: Distribute roles across multiple AI agents for parallel processing. Patterns for separating code review, testing, and documentation agents.
---

# Subagents (Role Separation & Parallel Processing)

> Subagents are an officially supported feature in **Claude Code v1.x and above**.

When handling everything in a single Claude session, context becomes polluted and focus gets scattered.
A subagent is an **independent AI instance that performs only a specific role**, running in its own separate context window.

---

## Core Characteristics of Subagents

| Characteristic | Description |
|---|---|
| **Independent Context** | Has its own context window separate from the main session |
| **Tool Restrictions** | Can only use permitted tools (security + token savings) |
| **Dedicated System Prompt** | Injects role-specific instructions |
| **Independent Permissions** | Can be configured with different permission levels from the main session |

---

## How to Define a Subagent

Define it as a Markdown file in the `.claude/agents/` folder.

```
📁 Project Root/
└── .claude/
    └── agents/
        ├── frontend-reviewer.md
        ├── test-writer.md
        └── db-migration.md
```

You can also create one using the `/agents` command in the chat window.

---

## Subagent File Structure (Front-matter)

```yaml
---
name: frontend-reviewer
description: A specialist in React/TypeScript component code review.
             Auto-triggers on requests like 'review the UI', 'check the component'.
tools: Read, Grep, Glob        # Read-only (no modifications allowed)
model: claude-sonnet-4-5       # Use Sonnet to reduce costs
---

You are a React/TypeScript expert.

## Review Criteria
- Are Props types clearly defined?
- Are there any unnecessary re-renders?
- Are accessibility (a11y) attributes missing?
- Does the component follow the single responsibility principle?

## Output Format
For each issue, specify the filename and line number, and classify the severity as [critical / warning / suggestion].
```

---

## Full List of Front-matter Options

| Option | Type | Description | Default |
|---|---|---|---|
| `name` | string | Agent identifier | Filename |
| `description` | string | Role description including trigger conditions | Required |
| `tools` | string | Allowed tools list (comma-separated) | All allowed |
| `model` | string | Claude model to use | Main session model |

**Available Tools:**

| Tool | Action |
|---|---|
| `Read` | Read files |
| `Write` | Write/create files |
| `Edit` | Modify files |
| `Bash` | Execute terminal commands |
| `Grep` | Search text within files |
| `Glob` | Search files by pattern |
| `WebFetch` | Fetch web pages |

> 💡 Allowing only read-only tools like `tools: Read, Grep, Glob` completely prevents a code review agent from accidentally modifying files. This has two benefits: security and token savings.

---

## Criteria for Parallel vs. Sequential Execution

This is the most critical decision when running multiple agents.

| Condition | Execution Mode |
|---|---|
| Tasks are mutually independent + no shared file modifications | **Parallel execution** ✅ |
| The next step requires the previous result | **Sequential execution** |
| Two agents need to modify the same file | **Sequential execution** (to prevent conflicts) |

**Parallel execution example (independent tasks):**
```
Backend agent: Write routes in the /api folder
Frontend agent: Write UI components in the /components folder
→ They touch different files, so they can proceed simultaneously
```

**Sequential execution example (dependent tasks):**
```
Step 1: DB schema agent → Generate schema.sql
Step 2: API agent → Write routes based on Step 1 results
→ Step 2 depends on Step 1 results, so sequential execution is required
```

---

## Cost Calculation & Savings Tips

Subagents each use **their own separate context window**. Running 3 agents in parallel can consume up to 3x the tokens.

**Model separation strategy (key to cost reduction):**

```bash
# Main session: Opus (complex reasoning, coordination)
# Subagents: Sonnet (execution tasks)
export CLAUDE_CODE_SUBAGENT_MODEL="claude-sonnet-4-5"
```

You can also specify the model individually in `.claude/agents/` files.

```yaml
---
name: file-scanner
model: claude-haiku-4-5   # Use Haiku for simple file scanning
tools: Read, Glob
---
```

---

## Real-World Usage Examples

### Full-Stack Feature Development

```
Main session (Opus): Analyze requirements → Split tasks → Integrate results
  ├── backend-agent (Sonnet): API routes, business logic
  └── frontend-agent (Sonnet): React components, state management
```

### Code Quality Pipeline

```
Main session: Run /code-review command
  ├── lint-agent: Detect ESLint, TypeScript errors
  ├── test-agent: Analyze test coverage
  └── security-agent: Vulnerability scan
```

### Documentation Automation

```
Main session: Extract list of changed files
  └── doc-agent (Haiku): Update JSDoc comments for each file
```

---

## Caveats

**When subagents are not needed**
Simply adding agents to do a task "better" is a waste of money. If tasks cannot be separated independently, a single session is far more efficient.

**Context cannot be shared**
Subagents cannot see the main session's conversation history. Any necessary context must be passed via the front-matter system prompt or through files.

→ For the full WAT framework context, see [wat-overview.md](./wat-overview.md)