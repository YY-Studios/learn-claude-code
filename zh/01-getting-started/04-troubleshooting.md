---
title: Claude Code 语音模式使用方法
description: 使用 Space 键进行语音输入的方法。韩语设置、IME 冲突解决、适用场景及故障排查指南。
---

# 故障排查（安装 & 初始配置）

整理了初次安装 Claude Code 时常见问题及解决方法。

---

## 安装相关

### `claude: command not found`

原生安装后输入 `claude` 却找不到命令的情况。

```bash
# 确认安装路径
which claude
ls ~/.local/bin/claude   # Linux/macOS 默认安装路径

# 添加到 PATH（bash）
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# 添加到 PATH（zsh，macOS 默认）
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### npm 安装后权限错误 `EACCES`

```
❌ sudo npm install -g @anthropic-ai/claude-code  ← 绝对不要这样做
```

使用 `sudo` 安装会导致整个 npm 出现权限混乱问题。正确解决方法：

```bash
# 使用 nvm（推荐）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
npm install -g @anthropic-ai/claude-code
```

### Windows 安装后无法运行

```powershell
# winget 路径不在 PATH 中的情况
$env:PATH += ";$env:LOCALAPPDATA\Microsoft\WinGet\Packages"

# PowerShell 执行策略问题
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 登录相关

### 浏览器未自动打开

```bash
# 手动输出登录 URL
claude auth login --print-url
# 将输出的 URL 直接粘贴到浏览器中
```

### 已登录但出现 "Not authenticated" 错误

```bash
# 确认登录状态
claude auth status

# 登出后重新登录
claude auth logout
claude auth login
```

### 公司网络（VPN/代理）下无法连接

```bash
# 设置代理
export HTTPS_PROXY=http://your-proxy:port
export HTTP_PROXY=http://your-proxy:port
claude
```

---

## 运行相关

### 在子目录下运行时修改了错误的文件

Claude Code 将运行位置识别为根目录。请务必在项目最顶层目录下运行。

```bash
# 错误示例 — 在 /apps/api 下运行
cd /my-project/apps/api
claude   # ← 无法了解整个项目结构

# 正确示例 — 在项目根目录下运行
cd /my-project
claude   # ← 可以掌握整体结构
```

### 响应中途停止（超时）

```bash
# 中断当前任务
ESC 1次

# 确认上下文状态
/context

# 上下文过满时进行压缩或初始化
/compact   # 仅保留核心摘要并压缩
/clear     # 完全初始化
```

### "Context window full" 错误

上下文已满。请使用 `/compact` 进行压缩，或执行 `/clear` 后利用 TODO.md 继续衔接上下文。→ [TODO.md 使用方法](../03-workflow/todo-md.md)

---

## 版本及更新

```bash
# 查看当前版本
claude --version

# 更新
claude update          # 原生安装
npm update -g @anthropic-ai/claude-code   # npm 安装
```

> 💡 自动记忆（`/memory`）功能仅在 **v2.1.59 及以上版本**中支持。请先确认版本。

---

## 如果仍未解决

1. 查看[官方文档](https://code.claude.com/docs/ko/overview)
2. 使用 `claude --debug` 标志运行并查看日志
3. 在 `~/.claude/logs/` 目录中查看最近的日志文件