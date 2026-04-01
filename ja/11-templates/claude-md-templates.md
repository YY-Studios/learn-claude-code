---
title: CLAUDE.md テンプレート集
description: Next.js、Node.js、コンポーネントライブラリ別のCLAUDE.mdテンプレート。プロジェクトタイプに合わせたドキュメント作成の出発点。
---

# CLAUDE.md テンプレート集

コピー&ペーストしてすぐに使えるCLAUDE.mdテンプレートです。プロジェクトの性質に合ったものを選び、`/init`で生成されたファイルに上書きするか、直接編集してください。

> 💡 CLAUDE.mdは**短いほど良いです。** 長くなるとClaudeがルールを無視し始めます。ルートは50〜100行、詳細はフォルダ別のCLAUDE.mdに分離しましょう。

---

## テンプレート1 — Next.js + Supabase（タイピングルーム基準）

```markdown
# プロジェクト名

## スタック
- Next.js App Router, TypeScript
- Supabase (DB + Edge Functions)
- Zustand (状態管理), TanStack Query (非同期)

## よく使うコマンド
- 開発サーバー: `npm run dev`
- ビルド: `npm run build`
- 型チェック: `npm run type-check`
- Supabase ローカル: `supabase start`

## コーディングルール
- 言語: TypeScript strict mode
- コンポーネント: 関数型、アロー関数
- スタイル: Tailwind CSS
- フックの戻り値: { data, isLoading, error } の形式に統一

## Supabase ルール
- クライアント: @/lib/supabase.ts の createClientComponentClient() を使用
- @supabase/ssr パッケージの使用禁止
- Edge Function: Deno ランタイム、ESM import、Deno.env.get()
- RLS: 新しいテーブルは必ず有効化

## 絶対に触らないでください
- .env, .env.local
- supabase/migrations/（マイグレーションは別途協議）

## 作業ルール
- セッション開始時にTODO.mdを読んで現在の状態を把握
- 機能完了ごとにTODO.mdを更新
- 重要な技術的決定はTODO.mdのメモセクションに日付とともに記録
```

---

## テンプレート2 — 汎用 Node.js / Express API

```markdown
# プロジェクト名 API

## スタック
- Node.js 20+, TypeScript
- Express.js
- PostgreSQL + Prisma ORM

## よく使うコマンド
- 開発サーバー: `npm run dev`
- ビルド: `npm run build`
- DB マイグレーション: `npx prisma migrate dev`
- テスト: `npm run test`

## コーディングルール
- 言語: TypeScript strict
- パッケージマネージャー: pnpm（npm、yarn の使用禁止）
- ルートファイルの場所: src/routes/
- エラー処理: 必ず try-catch、エラーは next(err) で伝達

## IMPORTANT: 絶対にしてはいけないこと
- .env ファイルの変更禁止
- Prisma schema の直接変更禁止（マイグレーションファイルのみ）
- console.log の代わりに logger モジュールを使用
```

---

## テンプレート3 — React コンポーネントライブラリ

```markdown
# コンポーネントライブラリ

## スタック
- React 18, TypeScript
- Storybook
- Vitest + Testing Library

## よく使うコマンド
- Storybook: `npm run storybook`
- テスト: `npm run test`
- ビルド: `npm run build`

## コンポーネントルール
- ファイル構造: ComponentName/index.tsx + ComponentName.stories.tsx + ComponentName.test.tsx
- Props 型: 必ず明示、オプショナルな prop はデフォルト値を提供
- export: named export を使用（default export 禁止）

## スタイルルール
- CSS-in-JS: styled-components
- デザイントークン: src/tokens/ を参照
- レスポンシブ: モバイルファースト

## YOU MUST: すべてのコンポーネントに Storybook story ファイルを含める
```

---

## フォルダ別 CLAUDE.md テンプレート

ルートのCLAUDE.mdから分離して、対応するフォルダに置く用途です。

### /supabase/CLAUDE.md

```markdown
# Supabase フォルダルール

## Edge Function
- ランタイム: Deno（Node.js ではない）
- import: ESM、npm: prefix
- 環境変数: Deno.env.get()
- ファイルの場所: supabase/functions/[関数名]/index.ts

## マイグレーション
- ファイル生成: `supabase migration new [名前]`
- SQL ファイルの直接作成禁止

## RLS
- 新しいテーブル: 必ず ENABLE ROW LEVEL SECURITY
- ポリシー名: [テーブル]_[操作]_[ロール] の形式
```

### /src/features/auth/CLAUDE.md

```markdown
# Auth ドメインルール

## 認証方式
- Supabase Auth を使用
- JWT は Supabase が管理（直接パース禁止）
- セッション確認: supabase.auth.getSession()

## ファイル構造（FSD）
- UI: features/auth/ui/
- API フック: features/auth/api/
- 型: features/auth/model/types.ts

## IMPORTANT
- 認証トークンを localStorage に直接保存しないでください
- パスワードは絶対にログに出力しないでください