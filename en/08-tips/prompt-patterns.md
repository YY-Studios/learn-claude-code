---
title: Effective Instruction Patterns - How to Use Think Hard
description: Prompt patterns for getting better responses from Claude. Think hard, step-by-step instructions, and how to set clear constraints.
---

# Effective Prompt Patterns and Practical Tips (Dos and Don'ts)

Here are practical know-how and prompt patterns for using Claude Code more safely, affordably, and intelligently.

---

## 1. 🛡️ Always Use Plan Mode (Token and Cost Optimization)

Claude Code has two operating modes. Press `Shift + Tab` to switch between them.

| Mode | Description |
|---|---|
| **Plan** | Presents the work plan and structure first without immediately modifying code |
| **Edit** | Actually creates and modifies files as soon as it receives instructions |

**💡 Recommended Workflow: Plan First, Edit Later!**
Using Edit mode from the start risks the AI incorrectly modifying countless files in unintended ways.
1. In **Plan mode**, get an explanation of the work plan first.
2. Review the plan and, if there are no issues, Accept it and switch to **Edit mode** to execute.

**The Real Reason You Must Use Plan Mode (Optimization)**
* **Context window preservation:** Going straight to Edit mode fills up the context window as the AI scans through multiple files. By planning first in Plan mode and then approving, you can generate code cleanly with far less context.
* **Cost (token) savings:** The process of rolling back incorrect code and re-instructing the AI is itself a massive waste of tokens. Even if it seems tedious at first, developing the habit of reviewing the plan first saves money in the long run.

---

## 2. 💡 Practical Coding Tips and Prompt Patterns

### 🧠 Inducing Deep Reasoning (Think Hard / Think Harder)
When designing complex architecture or tracking down a bug of unknown cause—rather than simple code generation—try prepending `think hard` or `think harder` to your prompt.
> Example: "think harder. Analyze the cause of the infinite re-rendering issue occurring in the current login logic and suggest 3 solution options."

This is an officially recommended prompt pattern that guides the AI to go through a deeper, more multifaceted internal reasoning process before immediately outputting code, dramatically improving the quality of the result.

### 🎙️ Using Voice Input (Whisper Flow)
Instead of typing long prompts on a keyboard, try giving instructions by voice using **Whisper Flow**.
The more specific the prompt, the higher the quality of the output. Giving instructions verbally allows you to convey much richer context and developer intent to the AI in a short time, making it highly effective.

### 🖼️ Actively Use Image/Screenshot Drag and Drop
For frontend UI/UX work, rather than verbosely describing the tone and manner of a screen or a complex layout in words, **dragging and dropping the reference image directly into the terminal window** is 100 times more effective.
Architecture diagrams in Mermaid format and similar visuals, when provided as images, allow Claude to accurately grasp the intent with far fewer tokens.

### 🌳 Essential Git Integration (Building a Safety Net)
AI is not perfect. As a project grows, version control that lets you revert to a previous state at any time—when the AI writes code in the wrong direction—is essential. Before instructing Claude Code on complex tasks, always develop the habit of committing the current state.

```bash
git init
git add .
git commit -m "chore: before claude code refactoring"