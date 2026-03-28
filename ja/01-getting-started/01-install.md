---
title: Claude Codeのインストール方法（Windows、Mac、Linux）
description: Claude Codeのインストールから初期設定まで。Node.js 20+の要件、プラットフォーム別インストールガイド、ログインと最初のプロジェクトの開始方法。
---

 インストール方法

> 📖 公式ドキュメント: [code.claude.com/docs/ko](https://code.claude.com/docs/ko/overview)

---

## 1. プランの選択

Claude Codeを使用するには、**Proプラン以上**が必須です。無料プランでは使用できません。

| プラン | 価格 | 推奨対象 |
|---|---|---|
| Pro | $20/月 | 初めて始める場合 |
| Max 5× | $100/月 | 使用量が増えたとき（Pro比5倍の上限） |
| Max 20× | $200/月 | ヘビーユーザー／長時間エージェント実行 |
| Teams | $30/人/月（最小5人） | チーム単位、共有コンテキストが必要な場合 |
| Enterprise | 別途お問い合わせ | 大規模組織 |

> 💡 Proから始めて`/context`でトークン使用量をモニタリングし、上限を頻繁に超えるようになったらMaxへアップグレードすることをおすすめします。

---

## 2. インストール

### ✅ 推奨方法 — ネイティブインストール

公式推奨方法です。別途Node.jsのインストールなしにターミナルのコマンド1行でインストールでき、バックグラウンド自動アップデートをサポートします。

**macOS / Linux**
```bash
curl -fsSL https://claude.ai/install.sh | sh
```

**Windows**
```bash
winget install Anthropic.ClaudeCode
```

> ⚠️ WinGetインストールは自動アップデートされません。定期的に`winget upgrade Anthropic.ClaudeCode`を実行してください。

---

### npmでインストールする場合（レガシー）

> ⚠️ 公式ドキュメントではnpmインストールはdeprecated（推奨されない）方式に分類されています。新規インストールであればネイティブインストールを先に検討してください。

Node.js 18+環境がすでにセットアップされていて、npmで管理したい場合に使用できます。

```bash
npm install -g @anthropic-ai/claude-code
```

**インストール確認:**
```bash
claude --version
```

---

## 3. Claude Codeを初めて起動する

### 方法1 — ターミナルから直接実行

プロジェクトフォルダに移動してから`claude`と入力します。

```bash
cd 내-프로젝트-폴더
claude
```

### 方法2 — VS Code拡張機能から実行

1. VS Code拡張マーケットプレイスで`Claude Code for VS Code`を検索してインストール
2. インストール完了後、右上のアイコンをクリック

> ⚠️ **必ずプロジェクトのルートディレクトリで実行してください。** サブフォルダ（例: `/apps/api`）で実行すると、プロジェクト全体の構造を読み取れず、엉뚱한ファイルを生成したり見つけられない問題が発生します。

---

## 4. ログイン

初回起動時にブラウザが自動で開き、ログインを求められます。claude.aiのアカウントでログインするとすぐに使用できます。

---

## 5. アップデート

```bash
# ネイティブインストール（自動アップデートされます。手動で確認する場合）
claude update

# npmインストールの場合
npm update -g @anthropic-ai/claude-code

# Windows winget
winget upgrade Anthropic.ClaudeCode
```

---

> 💡 **次のステップ:** インストール中に問題が発生した場合 → [トラブルシューティング](./04-troubleshooting.md)  
> 正常にインストールできた場合 → [CLAUDE.mdの書き方](./03-claude-md.md)に進んでください。