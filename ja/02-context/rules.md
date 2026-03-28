---
title: .claude/rules/ パス別ルール設定ガイド
description: CLAUDE.mdを複数ファイルに分割してトークンを節約する。paths設定で条件付きロード、フォルダ別に異なるルールを適用する方法。
---

# .claude/rules/ パス別ルール

AIエージェントを活用する際、CLAUDE.mdが200行を超えるとClaudeがルールを無視し始めます。これを防ぐための核心的なツールが`.claude/rules/`ディレクトリです。

---

## ⚠️ いつRulesが必要か？

**このような症状が見られたら、Rulesに分割するタイミングです：**
- Claudeが直前に伝えたルールをまた破っています
- 「さっき言いましたよね」と言っても聞きません
- `/context`コマンドを実行したとき、System Promptが大きな割合を占めています

**解決策の選択：**

**ルールが長くてClaudeが無視する場合** → Rulesに分離してください。核心ルールだけCLAUDE.mdに残し、フォルダ別の詳細ルールは`.claude/rules/`に移します。

**繰り返し作業の場合（コミット前のlint、ファイル保存時のフォーマット）** → Hookで自動化してください。「コミット前に必ずnpm run lintを実行して」のような繰り返し指示はCLAUDE.mdに書かず、pre-commit Hookとして作成してください。

**ルールなのに常に守られている場合** → Hookへの転換を検討してください。Claudeが100%うまく守れているルールはHookで自動化する方がトークン節約に有利です。

> **💡 公式推奨：**「Claudeが自然にうまくできることはHookで自動化し、できないことはRulesで明示してください」

---

## 基本構造

```
your-project/
├── .claude/
│   ├── CLAUDE.md              ← 核心ルール（50〜100行）
│   └── rules/
│       ├── code-style.md      ← グローバルスタイル（pathsなし）
│       ├── api.md             ← API作業時のみ（pathsあり）
│       └── components.md      ← コンポーネント作業時のみ
```

**重要：**`.claude/rules/`内のすべての`.md`ファイルが自動的に認識されます。

---

## 2種類のロード方式

### 常にロード（pathsなし）

YAMLフロントマターがないか、`paths`フィールドがない場合、セッション開始時に必ずロードされます。CLAUDE.mdと同じ優先度で動作します。

```markdown
# コーディングスタイルルール

- 2スペースインデント
- ESLint準拠
```

### 条件付きロード（pathsあり）

YAMLフロントマターに`paths`フィールドがある場合、該当ファイルを作業するときのみロードされます。`src/api/`配下のファイルを編集するときのみ、APIルールがコンテキストに入ります。

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# APIルール

- Zod validation必須
- rate limiting必須
```

---

## 文法：YAML Frontmatter

```markdown
---
paths:
  - "パス/パターン/**"
  - "別の/パターン/*.ts"
---

# ルール内容
```

**注意事項：**
- `paths:`（複数形です。pathではありません）
- `---`で始まり`---`で終わらせる必要があります
- 各パスは`- "パス"`形式のYAML配列です

---

## パスパターン

| パターン | マッチするファイル |
|---|---|
| `"src/api/**/*.ts"` | `src/api/users/route.ts` |
| `"src/components/*.tsx"` | `src/components/Button.tsx`（サブフォルダ除外） |
| `"**/*.test.ts"` | すべてのテストファイル |

**Globパターンのルール：**
- `*` = 1レベル（スラッシュをまたがない）
- `**` = 全レベル（再帰的に探索）

---

## 実践例

### APIルール（条件付きロード）

**`.claude/rules/api.md`**
```markdown
---
paths:
  - "src/api/**/*.ts"
---

# APIルール

- Zod validation必須
- rate limitingデフォルト100 req/min
- エラーレスポンス形式: { error: "message", code: "CODE" }
- JWT検証はSupabaseで
```

### コンポーネントルール（条件付きロード）

**`.claude/rules/components.md`**
```markdown
---
paths:
  - "src/components/**/*.tsx"
---

# Reactコンポーネントルール

## Props命名
- Boolean: `isLoading`, `hasError`
- ハンドラー: `onSubmit`, `onClick`

## スタイリング
- Tailwind CSSのみ使用
- インラインスタイル禁止
```

---

## 💡 実践のコツ

### 1. 既存のCLAUDE.mdを分割する

長いCLAUDE.mdをRulesにマイグレーションする段階的な戦略です。

```
1. CLAUDE.mdをバックアップ（コピーを作成）
2. フォルダ別にグルーピング（API/コンポーネント/DB...）
3. Rulesファイル作成 + paths設定
4. CLAUDE.mdから該当部分を削除
5. ひとつずつテスト（一度に全部分割しないこと）
```

### 2. トークン節約の実測値

**タイピングルームプロジェクト基準：**
```
BEFORE: CLAUDE.md 280行 → 常にロード

AFTER: CLAUDE.md 50行 + rules 230行（paths別に分離）

効果：
- API作業時：150行のみロード（46%節約）
- コンポーネント作業時：140行のみロード（50%節約）
```

### 3. pathsパターンを見つける

自分がよく作業するファイルパターンをgit logで確認できます。

```bash
# よく作業するファイルを確認
git log --name-only --pretty=format: | sort | uniq -c | sort -rn | head -20

# 結果例：
# 42 src/api/users/route.ts
# 38 src/components/Button.tsx
# 25 src/hooks/useAuth.ts

→ src/api/**, src/components/**, src/hooks/** をそれぞれrulesに分離
```

### 4. 衝突の確認

> 「CLAUDE.mdとrulesで衝突しているルールを見つけて」

Claudeに聞くと自動的に見つけてくれます。

---

## ❌ 絶対にやってはいけないこと（よくある失敗）

### 失敗1：pathを単数形で書く

10回中8回間違える文法です。

```markdown
# ❌ 間違い
path: "src/api/**"

# ✅ 正しい
---
paths:
  - "src/api/**/*.ts"
---
```

### 失敗2：pathsがないのに条件付きだと思い込む

pathsフロントマターがない場合、必ず常にロードされます。

```markdown
# .claude/rules/api.md

# APIルール
- rate limiting必須
```

→「API作業時のみロードされるはず」← 勘違いです。pathsがなければ常にロードされます。

### 失敗3：CLAUDE.mdと衝突する

```markdown
# CLAUDE.md
- APIはExpressを使用

# .claude/rules/api.md
- APIはFastifyを使用
```

→ Claudeが混乱してランダムに選択します。

**解決策：** CLAUDE.mdにはスタックの概要のみ記載し、具体的な実装ルールはRulesに分離してください。

### 失敗4：10行のファイルを10個作る

```
❌ 悪い例：
.claude/rules/
  ├── api-users.md（10行）
  ├── api-auth.md（8行）
  ├── api-posts.md（12行）
  ...

✅ 良い例：
.claude/rules/
  └── api.md（40行、すべて統合）
```

**基準：** ファイル1つが50行以上で、明確に独立している場合のみ分離してください。

### 失敗5：適用されないのに作業を続ける

Rulesを作ったのにClaudeが従わない場合です。

**チェックリスト：**
```
1. YAML文法は正しいですか？（---, paths:）
2. パスパターンが実際のファイルとマッチしていますか？
3. Claude Codeを再起動しましたか？
```

**確認方法：**
> 「今ロードされているルールファイルを見せて」

Claudeに聞くと、現在ロードされているルールの一覧を表示してくれます。

---

## 活用パターン

### 基本3-tier構造

```
CLAUDE.md（50行）
  ← プロジェクトスタック、核心禁止事項

.claude/rules/
  ├── code-style.md（pathsなし、50行）
  │   ← グローバルコーディングスタイル
  ├── api.md（pathsあり、50行）
  │   ← src/api/** 作業時のみロード
  └── components.md（pathsあり、50行）
      ← src/components/** 作業時のみロード
```

**効果：**
- 合計ルールは200行ですが、一度に150行のみロードされます
- トークン25%節約

---

## トラブルシューティング

### Rulesが適用されないとき

```
1. YAMLフロントマターの文法を確認（---, paths:）
2. パスパターンが実際のファイルとマッチしているか確認
3. Claude Codeを再起動
```

### pathsがあるのに常にロードされるとき

```
→ globパターンが広すぎます（**/* のような全体マッチ）
→ pathsの文法を再確認してください
```

### ロードの確認方法

```bash
# Claudeに直接聞く
"今ロードされているルールファイルを見せて"

# またはHookを使ったログ出力
# .claude/settings.json
{
  "hooks": {
    "InstructionsLoaded": [{
      "hooks": [{
        "type": "command",
        "command": "echo 'Loaded: $HOOK_FILE_PATH'"
      }]
    }]
  }
}
```

→ どのファイルがいつロードされたかがターミナルにログ出力されます。

---