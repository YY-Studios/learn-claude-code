---
title: Claude Code ボイスモードの使い方
description: Spaceキーで音声入力する方法。日本語設定、IME競合の解決、適切なユースケースとトラブルシューティングガイド。
---

# トラブルシューティング（インストール & 初期設定）

Claude Code を初めてインストールする際によく遭遇する問題と解決方法をまとめます。

---

## インストール関連

### `claude: command not found`

ネイティブインストール後に `claude` を実行してもコマンドが見つからない場合です。

```bash
# インストールパスの確認
which claude
ls ~/.local/bin/claude   # Linux/macOS デフォルトインストールパス

# PATHに追加 (bash)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# PATHに追加 (zsh, macOS デフォルト)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### npm インストール後の権限エラー `EACCES`

```
❌ sudo npm install -g @anthropic-ai/claude-code  ← 絶対にしないでください
```

`sudo` でインストールすると、その後 npm 全体で権限の問題が発生します。正しい解決方法：

```bash
# nvm を使用（推奨）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
npm install -g @anthropic-ai/claude-code
```

### Windows でインストール後に起動しない

```powershell
# winget のパスが PATH にない場合
$env:PATH += ";$env:LOCALAPPDATA\Microsoft\WinGet\Packages"

# PowerShell 実行ポリシーの問題の場合
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## ログイン関連

### ブラウザが自動で開かない

```bash
# 手動でログイン URL を出力
claude auth login --print-url
# 出力された URL をブラウザに直接貼り付ける
```

### ログインしたのに "Not authenticated" エラーが出る

```bash
# ログイン状態の確認
claude auth status

# ログアウトして再ログイン
claude auth logout
claude auth login
```

### 社内ネットワーク（VPN/プロキシ）で接続できない

```bash
# プロキシ設定
export HTTPS_PROXY=http://your-proxy:port
export HTTP_PROXY=http://your-proxy:port
claude
```

---

## 実行関連

### サブフォルダで実行したら엉뚱한ファイルが変更された

Claude Code は実行した場所をルートとして認識します。必ずプロジェクトのルートディレクトリで実行してください。

```bash
# 誤った例 — /apps/api で実行
cd /my-project/apps/api
claude   # ← プロジェクト全体の構造を把握できない

# 正しい例 — プロジェクトルートで実行
cd /my-project
claude   # ← 全体構造を把握できる
```

### 応答が途中で止まる（タイムアウト）

```bash
# 現在の作業を中断
ESC 1回

# コンテキストの状態を確認
/context

# いっぱいになっている場合は圧縮または初期化
/compact   # 重要な要約だけ残して圧縮
/clear     # 完全に初期化
```

### "Context window full" エラー

コンテキストが満杯の状態です。`/compact` で圧縮するか、`/clear` 後に TODO.md を活用してコンテキストを引き継いでください。→ [TODO.md の活用方法](../03-workflow/todo-md.md)

---

## バージョンとアップデート

```bash
# 現在のバージョン確認
claude --version

# アップデート
claude update          # ネイティブインストール
npm update -g @anthropic-ai/claude-code   # npm インストール
```

> 💡 自動メモリ（`/memory`）機能は **v2.1.59 以上** でのみサポートされています。まずバージョンを確認してください。

---

## それでも解決しない場合

1. [公式ドキュメント](https://code.claude.com/docs/ko/overview) を確認
2. `claude --debug` フラグで実行してログを確認
3. `~/.claude/logs/` ディレクトリで最近のログファイルを確認