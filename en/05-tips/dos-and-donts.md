---
title: What Works vs. What Doesn't with Claude Code
description: What you can and can't do with Claude Code. Common mistakes encountered in practice, how to fix them, and tips for efficient use.
---

# What Works & What Doesn't (Dos and Don'ts)

---

## ✅ Strongly Recommended (Dos)

**Plan Mode First**
Always use `Shift + Tab` to review the plan before letting Claude modify code. Make it a habit to immediately cancel with `ESC` when the plan looks wrong.

**Short Cycles with TDD**
Maintain a short cycle of small change → lint/test → commit. This makes it easy to roll back when Claude heads in the wrong direction.

**Convey Context with Images**
For UI tone and manner, architecture diagrams, or design references, drag and drop a screenshot instead of describing it in words. It's far more accurate than text explanations.

**Paste Error Logs in Full**
Paste the entire terminal error log without your own interpretation. Summarizing or interpreting it actually loses information.

**Be Specific with Instructions**
Vague instructions produce vague results. Instead of "write test code," be specific: "Write test code covering the edge case when a user logs out. No mocking."

**Use think hard**
For complex architecture decisions or problems with many edge cases, prepend `think hard` to your prompt. Claude will reason more deeply. (Use only when necessary, as it increases internal reasoning tokens.)

```
"think hard about the edge cases in our authentication flow"
```

**Explore Before Working**
Before starting a large task, explicitly tell Claude to read the relevant files first and not to modify anything yet. Separating exploration from implementation prevents unintended file changes.

```
"먼저 인증 관련 파일들을 읽고 구조를 파악해줘. 아직 아무것도 수정하지 마."
```

---

## ❌ Things to Absolutely Avoid (Don'ts)

**Developing Multiple Features in One Session**
Context gets polluted and hallucinations occur. Follow the one session = one feature principle, and run `/clear` when a feature is done. The same applies to inserting unrelated questions mid-session.

**Having Claude Directly Analyze Large Files**
Don't make Claude parse tens of thousands of lines of JSON or logs in the chat window. Ask Claude to write a parsing script, run it locally, and only pass the summary back to Claude.

**Dumping Everything into Root CLAUDE.md**
The longer CLAUDE.md gets, the more Claude starts ignoring the rules. Move content like full API specs or DB schemas to separate files and split into per-folder CLAUDE.md files.

**Giving Exploration Instructions Without Scope**
Telling Claude to "find this bug" without specifying scope will cause it to read hundreds of files and fill up the context. Always specify the search scope.

```
❌ "이 버그 어디서 나는지 찾아줘"
✅ "auth 모듈에서 로그인 시 발생하는 이 버그를 찾아줘"
```

**Ignoring Claude When It Repeats the Same Mistake**
If the same mistake keeps happening, CLAUDE.md is either too long or the instructions are too vague. Emphasize the relevant rule in CLAUDE.md with the `IMPORTANT:` keyword, or rewrite it more specifically.

**Installing npm with sudo**
Don't use `sudo npm install -g` when you get a permission error. The correct fix is to use `nvm`. → [Troubleshooting](../01-getting-started/04-troubleshooting.md)

---

## 💰 Checklist When Costs Spike Unexpectedly

Check these in order when you have a cost issue.

```
1. /context → If System Tools is large, disable MCP
2. /context → If User/Assistant is large, run /compact or /clear
3. Check CLAUDE.md length → If over 300 lines, split into per-folder files
4. Confirm you're not running multiple agents for a task that doesn't need sub-agents
5. Check if too many unrelated questions were inserted mid-conversation
```

→ Full guide to cost optimization strategies: [cost-optimization.md](./cost-optimization.md)

---

## 💡 Decision Criteria — When to Split Sessions

If any of the following apply, run `/clear` and open a new session.

- You asked a question unrelated to the current task
- One feature has been completely finished
- Claude suddenly starts creating files or packages that didn't exist before
- Responses become strangely slow or Claude repeats irrelevant content
- Context is over 70% full in `/context`