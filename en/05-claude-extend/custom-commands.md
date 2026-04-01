---
title: Creating Custom Slash Commands in Claude Code
description: Automate your own workflows with the .claude/commands/ folder. Practical patterns for modularizing repetitive tasks into slash commands.
---

# Creating Custom Slash Commands (.claude/commands)

You can modularize repetitive testing, formatting, and git commit processes into your own slash commands to build agent pipelines.

## 🚀 How to Create
1. Create a `.claude/commands/` folder in your project root directory.
2. Create a markdown file named after the command you want to run. (e.g., `ship.md`)
3. Write the workflow you want to execute inside the file as a prompt.

**Example `ship.md`:**
```md
# Description
Runs tests and, if successful, commits and pushes.

# Workflow
1. Run `npm run test`.
2. If tests fail, print the error log and immediately stop the task.
3. If tests pass, run `git add .`.
4. Analyze the changes and run `git commit` with an appropriate commit message.
5. Run `git push` to deploy to the remote repository.
```
After restarting Claude Code, type /ship in the chat window to execute the above pipeline fully automatically.