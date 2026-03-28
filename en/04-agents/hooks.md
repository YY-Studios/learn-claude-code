---
title: Claude Code Hooks - Event-Based Automation
description: Hooks that auto-execute on git commit, file save, and more. A guide to event-driven workflow automation with TaskCreated, FileSaved, and other events.
---

# Hooks (Automation Engine)

Hooks are an **engine that automatically executes specified actions when certain events occur**.
They let you automate repetitive post-processing tasks that people used to do manually — like "automatically run lint every time Claude modifies a file."

> 💡 **Hooks are more reliable than prompts.**
> If you instruct Claude via prompt to "always run lint," Claude might forget — but hooks **always execute** regardless of model behavior.

---

## How It Works

```
Event fires → Matcher (condition check) → Command (action) executes
```

---

## 4 Event Types

| Event | When It Fires | Primary Use |
|---|---|---|
| **PreToolUse** | Just before a tool is called | Input validation, blocking dangerous commands |
| **PostToolUse** | Just after a tool executes | Post-processing like lint, formatting |
| **Notification** | While Claude is waiting for a response | Sending notifications, logging |
| **Stop** | When the agent turn ends | Final cleanup, report generation |

---

## Creating Hooks

Ask Claude in natural language and it will automatically add entries to `.claude/settings.json`.

```
"Create a hook that automatically runs eslint after a file is modified"
"Create a hook that plays a macOS notification sound when a task completes"
"Create a hook that prints a warning before executing rm -rf commands"
```

---

## Hook Structure Example

```json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint --fix",
            "timeout": 10
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Glass.aiff",
            "timeout": 5
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'rm -rf' && echo 'BLOCKED: rm -rf detected' && exit 1 || exit 0",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
```

---

## ⚠️ Important Notes

**Timeout is required**

Claude pauses and waits while a hook is running. If you don't set a timeout and the hook hangs, Claude will hang indefinitely too.

```json
"timeout": 10  // Always set this (unit: seconds)
```

**Run heavy tasks in the background**

For long-running tasks, append `&` to run them in the background.

```json
"command": "npm run test &"  // Background execution
```

---

## Debugging Hooks

How to investigate when a hook isn't behaving as expected.

### Check the Logs

```bash
# Hook execution log location
~/.claude/logs/

# Watch the latest log in real time
tail -f ~/.claude/logs/$(ls -t ~/.claude/logs/ | head -1)
```

### Run in Debug Mode

```bash
claude --debug
```

The `--debug` flag outputs detailed information: whether hooks executed, matcher condition evaluation results, and command output.

### Test Hook Commands Directly

Before registering a hook, run it directly in the terminal to verify it works correctly.

```bash
# Example: verify the lint hook works first
npm run lint --fix
echo "Exit code: $?"  # 0 means success, 1 or higher means failure
```

> ⚠️ If a hook command returns exit code 1, Claude will **block** that operation. If a `PreToolUse` hook unintentionally returns 1, Claude will be unable to modify any files.

### Common Mistakes

| Symptom | Cause | Fix |
|---|---|---|
| Hook never runs | Typo in `matcher` pattern | Change to `"matcher": ".*"` and test first |
| Claude refuses to modify files | PreToolUse hook returns exit 1 | Run the hook command directly and check the exit code |
| Hook runs but result isn't applied | Not waiting for result after background (`&`) execution | Remove `&` for hooks where the result is required |
| Notification sound doesn't play (macOS) | `afplay` path issue | Run `which afplay` to find the path and use the absolute path |

---

## Real-World Examples

```
Auto-format after file save          → PostToolUse + prettier --write
Block dangerous rm -rf commands      → PreToolUse + check command pattern then exit 1
Slack notification on long task done → Notification + slack webhook curl
Generate summary report on session end → Stop + run script
Auto type-check                      → PostToolUse + tsc --noEmit
```