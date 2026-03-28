---
title: How to Use Claude Code Voice Mode
description: How to use voice input with the Space key. Korean settings, IME conflict resolution, suitable use cases, and troubleshooting guide.
---

# Troubleshooting (Installation & Initial Setup)

A summary of common issues and solutions you may encounter when installing Claude Code for the first time.

---

## Installation

### `claude: command not found`

This happens when you type `claude` after a native installation but the command cannot be found.

```bash
# Check installation path
which claude
ls ~/.local/bin/claude   # Default installation path on Linux/macOS

# Add to PATH (bash)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Add to PATH (zsh, macOS default)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Permission error `EACCES` after npm installation

```
❌ sudo npm install -g @anthropic-ai/claude-code  ← Never do this
```

Installing with `sudo` will lead to permission issues across your entire npm setup. The correct solution:

```bash
# Use nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
npm install -g @anthropic-ai/claude-code
```

### Won't run after installation on Windows

```powershell
# If winget path is not in PATH
$env:PATH += ";$env:LOCALAPPDATA\Microsoft\WinGet\Packages"

# If it's a PowerShell execution policy issue
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Login

### Browser doesn't open automatically

```bash
# Manually print the login URL
claude auth login --print-url
# Paste the output URL directly into your browser
```

### "Not authenticated" error after logging in

```bash
# Check login status
claude auth status

# Log out and log back in
claude auth logout
claude auth login
```

### Can't connect on a corporate network (VPN/proxy)

```bash
# Configure proxy settings
export HTTPS_PROXY=http://your-proxy:port
export HTTP_PROXY=http://your-proxy:port
claude
```

---

## Running

### It modified the wrong files when run from a subdirectory

Claude Code treats the directory where it's launched as the root. Always run it from the top-level project directory.

```bash
# Wrong — run from /apps/api
cd /my-project/apps/api
claude   # ← Doesn't know the full project structure

# Correct — run from the project root
cd /my-project
claude   # ← Can understand the full structure
```

### Response stops mid-way (timeout)

```bash
# Cancel current task
ESC once

# Check context status
/context

# If too full, compress or reset
/compact   # Compress, keeping only a core summary
/clear     # Full reset
```

### "Context window full" error

The context is full. Compress it with `/compact`, or use `/clear` and then use TODO.md to carry the context forward. → [How to use TODO.md](../03-workflow/todo-md.md)

---

## Version and Updates

```bash
# Check current version
claude --version

# Update
claude update          # Native installation
npm update -g @anthropic-ai/claude-code   # npm installation
```

> 💡 The auto-memory (`/memory`) feature is only supported in **v2.1.59 or later**. Check your version first.

---

## If the issue still isn't resolved

1. Check the [official documentation](https://code.claude.com/docs/ko/overview)
2. Run with the `claude --debug` flag to check logs
3. Check recent log files in the `~/.claude/logs/` directory