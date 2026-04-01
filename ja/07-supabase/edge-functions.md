---
title: Supabase Edge Function 生成パターン
description: Claude CodeでDeno Edge Functionを書く。環境制約、型定義、エラー処理の実践パターン。
---

# Supabase Edge Function 生成パターン

Claude CodeでSupabase Edge Functionを生成する際、**Deno ランタイム環境**と**デプロイ方法**を明確に指定しないと、Node.jsスタイルで書いてしまいます。制約条件をプロンプトに明示することが重要です。

---

## Edge Functionとは？

Supabase Edge Functionは**Deno ランタイム**上で動作するサーバーレス関数です。Node.jsとは異なる点があります。

| | Node.js | Supabase Edge Function (Deno) |
|---|---|---|
| importの方式 | `require()` または ESM | ESMのみ使用 (`import`) |
| パッケージ | npm | URL import または npm: prefix |
| Supabaseクライアント | `@supabase/supabase-js` | `npm:@supabase/supabase-js` |
| 環境変数 | `process.env` | `Deno.env.get()` |

---

## 📋 Prompt Template — 基本 Edge Function 生成

```
Supabase Edge Functionを書いてください。

[機能説明]
- [ここに機能の説明]

[技術スタックおよび制約条件]
- Deno ランタイム環境（Node.jsではない）
- importはESM方式のみ使用
- Supabaseクライアント: npm:@supabase/supabase-js
- 環境変数へのアクセス: Deno.env.get('変数名')
- ファイルの場所: supabase/functions/[関数名]/index.ts
- CORSヘッダーを含める（OPTIONSメソッドの処理）
- エラーレスポンスは常にJSON形式で返す

[返却形式]
- 成功: { data: ..., error: null }
- 失敗: { data: null, error: "エラーメッセージ" }
```

---

## 📋 Prompt Template — OpenAI連携 Edge Function

```
OpenAI APIを呼び出すSupabase Edge Functionを書いてください。

[機能説明]
- [ここに機能の説明]

[技術スタックおよび制約条件]
- Deno ランタイム、ESM import
- OpenAIクライアント: npm:openai
- OpenAI APIキー: Deno.env.get('OPENAI_API_KEY')
- Supabaseクライアント: npm:@supabase/supabase-js
- 認証: AuthorizationヘッダーのJWTをSupabaseで検証
- ファイルの場所: supabase/functions/[関数名]/index.ts
- ストリーミングレスポンスが必要な場合はReadableStreamを使用
```

---

## ✅ 良い例 vs ❌ 悪い例

**❌ 悪い例 — Deno環境の指定なし**
```
"ユーザーIDを受け取って文章を生成するEdge Functionを作って。"
```
→ Claudeが `process.env`、`require()`、Node.jsスタイルで書いてしまい、デプロイ時にエラーが発生

**✅ 良い例 — 環境を明示**
```
"Deno ランタイムベースのSupabase Edge Functionを書いてください。
- リクエストbodyからuserIdを受け取り、usersテーブルから情報を取得
- Supabaseクライアント: npm:@supabase/supabase-js
- 環境変数: Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
- ファイルの場所: supabase/functions/get-user/index.ts"
```

---

## CORS処理（必須ボイラープレート）

ClaudeにCORSを含めるよう指示すると、以下の構造で書いてくれます。プリフライトリクエスト（OPTIONS）を見落とすケースが多いため、必ず明示してください。

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // OPTIONSリクエストの処理（CORS preflight）
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // 実際のロジック
  // ...
})
```

---

## デプロイ & テスト

```bash
# ローカルテスト
supabase functions serve [関数名] --env-file .env.local

# デプロイ
supabase functions deploy [関数名]

# ログ確認
supabase functions logs [関数名]
```

Claude Codeにテストまで任せるには：

```
"作成したEdge Functionをローカルでテストするcurlコマンドも一緒に書いてください。"
```

---

## CLAUDE.mdに共通ルールを登録する

```markdown
## Supabase Edge Function ルール
- ランタイム: Deno（Node.jsではない）
- import: ESM方式、npm: prefixを使用（例: npm:@supabase/supabase-js）
- 環境変数: Deno.env.get()を使用（process.env禁止）
- ファイルの場所: supabase/functions/[関数名]/index.ts
- すべての関数にCORS処理を含める（OPTIONSメソッド）
- レスポンス形式: { data: ..., error: ... }
```

→ フロントエンドフックパターンは [frontend-hooks.md](./frontend-hooks.md) を参照