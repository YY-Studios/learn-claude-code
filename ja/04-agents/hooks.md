---
title: Claude Code Hooks - イベントベースの自動化
description: git commit、ファイル保存時に自動実行されるHooks。TaskCreated、FileSaved等のイベントベースワークフロー自動化ガイド。
---

# Hooks (自動化エンジン)

フックは**特定のイベントが発生したときに指定されたアクションを自動実行するエンジン**です。
「Claudeがファイルを修正するたびに自動でlintを実行する」といったように、人が繰り返していた後処理作業を自動化できます。

> 💡 **プロンプトよりフックの方が信頼できます。**
> 「必ずlintを実行して」とプロンプトで指示してもClaudeが忘れることがありますが、フックはモデルの動作に関係なく**必ず実行**されます。

---

## 動作フロー

```
イベント発生 → Matcher(条件チェック) → コマンド(アクション)実行
```

---

## 4種類のイベントタイプ

| イベント | 実行タイミング | 主な用途 |
|---|---|---|
| **PreToolUse** | ツール呼び出し直前 | 入力値の検証、危険なコマンドのブロック |
| **PostToolUse** | ツール実行直後 | lint、フォーマット等の後処理 |
| **Notification** | Claudeが応答待ち中 | 通知送信、ロギング |
| **Stop** | エージェントターン終了時 | 最終クリーンアップ、レポート生成 |

---

## フックの作成

Claudeに自然言語でリクエストすると、`.claude/settings.json`に自動追加してくれます。

```
"ファイル修正後に自動でeslintを実行するフックを作って"
"作業完了時にmacOSの通知音を再生するフックを作って"
"rm -rf コマンドを実行する前に警告を出力するフックを作って"
```

---

## フック構造の例

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
            "command": "echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'rm -rf' && echo 'BLOCKED: rm -rf 検出' && exit 1 || exit 0",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
```

---

## ⚠️ 注意事項

**タイムアウトは必須**

フックが実行されている間、Claudeは停止して待機します。タイムアウトを設定しないと、フックが止まった場合にClaudeも永遠に停止します。

```json
"timeout": 10  // 必ず設定 (単位: 秒)
```

**重い処理はバックグラウンドで**

時間のかかる処理は`&`を付けてバックグラウンドで実行してください。

```json
"command": "npm run test &"  // バックグラウンド実行
```

---

## フックのデバッグ

フックが期待通りに動作しないときの確認方法です。

### ログの確認

```bash
# フック実行ログの場所
~/.claude/logs/

# 最新ログのリアルタイム確認
tail -f ~/.claude/logs/$(ls -t ~/.claude/logs/ | head -1)
```

### デバッグモードで実行

```bash
claude --debug
```

`--debug`フラグを付けると、フックの実行有無、matcher条件の評価結果、コマンド出力などが詳細に表示されます。

### フックコマンドを直接テスト

フックに登録する前にターミナルで直接実行して、正常動作を確認してください。

```bash
# 例: lintフックが正しく動作するか先に確認
npm run lint --fix
echo "Exit code: $?"  # 0なら成功、1以上なら失敗
```

> ⚠️ フックコマンドがexit code 1を返すと、Claudeはその操作を**ブロック**します。`PreToolUse`フックで意図せず1を返すと、Claudeがどのファイルも修正できない状況になります。

### よくある間違い

| 症状 | 原因 | 解決策 |
|---|---|---|
| フックが全く実行されない | `matcher`パターンのタイポ | `"matcher": ".*"`に変更して先にテスト |
| Claudeがファイル修正を拒否する | PreToolUseフックがexit 1を返している | フックコマンドを直接実行してexit codeを確認 |
| フックは実行されるが結果が反映されない | バックグラウンド(`&`)実行後に結果を待っていない | 結果が必要なフックは必ず`&`を外す |
| 通知音が鳴らない (macOS) | `afplay`のパス問題 | `which afplay`でパス確認後、絶対パスを使用 |

---

## 実践活用例

```
ファイル保存後の自動フォーマット       → PostToolUse + prettier --write
危険な rm -rf コマンドのブロック       → PreToolUse + コマンドパターン検査後 exit 1
長い作業完了時にSlack通知             → Notification + slack webhook curl
セッション終了時に要約レポート生成     → Stop + スクリプト実行
型エラーの自動チェック                → PostToolUse + tsc --noEmit
```