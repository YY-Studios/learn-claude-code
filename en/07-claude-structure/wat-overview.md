---
title: WAT Framework Overview - Workflows · Agents · Tools
description: Understanding the WAT automation framework structure in Claude Code. Concepts and practical usage of Workflows, Agents, and Tools.
---

# WAT Framework (Workflows, Agents, Tools)

> ⚠️ **The WAT Framework is an architecture pattern established by the community, not official Anthropic documentation.**  
> However, each component (Subagent, Agent Teams, etc.) is supported as an official feature.

When developing complex features, giving Claude vague instructions makes it easy to lose direction. The WAT framework is a method for structuring complex agent systems into three layers.

---

## 1. Workflows — Defining Task Flow

Break down the goals Claude needs to achieve into clear, sequential steps.

```
"First update the DB schema (Step 1),
then create the backend API (Step 2),
and finally connect the frontend UI (Step 3)."
```

> 💡 Before handing off a large feature all at once, it's also a good idea to have Claude **clarify requirements through an interview-style process** first.
> ```
> "Before implementing this feature, use the AskUserQuestion tool to interview me and clarify the requirements.
>  When done, write the spec in SPEC.md."
> ```

---

## 2. Agents — Role Distribution and Parallel Processing

### Subagent (Official Feature)

A Subagent is a specialized AI assistant that handles a specific type of task. Each runs in its own independent context window with custom system prompts, specific tool access, and independent permissions.

Define them as Markdown files in the `.claude/agents/` folder or create them with the `/agents` command.

```yaml
---
name: frontend-reviewer
description: React 컴포넌트 코드 리뷰 전문가
tools: Read, Grep, Glob
model: sonnet
---
당신은 React/TypeScript 전문가입니다...
```

**Parallel vs. Sequential Execution Criteria**

| Pattern | Condition |
|---|---|
| **Parallel execution** | Tasks are independent + no file overlap + no interdependencies |
| **Sequential execution** | Previous results are needed for the next step / modifying the same files |

---

### Agent Teams (Experimental Feature)

Agent Teams is a feature where multiple Claude Code sessions work together as a team. One session takes on the role of team lead to coordinate work, while team members communicate directly with each other to collaborate. The key difference from Subagents is that direct communication between team members is possible.

How to enable:
```json
// .claude/settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

> ⚠️ **Cost warning:** A team of 3 consumes approximately 3–4x more tokens compared to a single session.  
> For tasks that don't require inter-member communication, Subagents are more efficient.

---

## 3. Tools — Leveraging Atomic Tools

Don't have Claude write thousands of lines of code at once. Have it build small, atomic utility functions or scripts first and then assemble them — this makes bugs much easier to track down.

**Good example:**
```
"First just create the date format utility function.
 Once the tests pass, we'll attach it to the API."
```

**Bad example:**
```
"Build the entire authentication system."
```

---

## Practical Application — Full-Stack Feature Development Example

```
Step 1: DB schema design (single session + Plan Mode)
Step 2: Backend API + frontend component (parallel Subagents)
  └─ backend-agent: API routes, business logic
  └─ frontend-agent: React components, UI state
Step 3: Testing + documentation (sequential execution)
```

> 💡 **Tip for reducing subagent model costs:**  
> Setting the main session to Opus and subagents to Sonnet can significantly cut costs.
> ```bash
> export CLAUDE_CODE_SUBAGENT_MODEL="claude-sonnet-4-5"
> ```