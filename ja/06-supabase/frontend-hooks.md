---
title: Supabaseフロントエンドフック生成パターン
description: supabase/ssr不使用の手動フックパターン。React QueryとSupabaseクライアントを活用したカスタムフックの書き方。
---

# フロントエンドフック生成パターン

Claudeにフロントエンドフックの生成を任せる際、**制約条件を明示しないと**、Claudeが自身の知っている一般的な方法（例：`@supabase/ssr`、Context APIなど）で実装してしまいます。  
効果的なプロンプトは、**スタック + 制約条件 + ファイルの場所**を一緒に明示することが重要です。

---

## 💡 なぜこの方法が効果的なのか？

| 要素 | 効果 |
|---|---|
| 技術スタックの明示 | ClaudeがライブラリAPIを正確に使用 |
| 禁止パッケージの明示 | 望まない実装方法をブロック |
| ファイル位置の明示 | アーキテクチャルールを自動遵守 |
| 戻り値の明示 | インターフェースを予測可能に統一 |

---

## 📋 Prompt Template (React + Zustand + TanStack Query + FSD)

```
Supabase クライアントを使用して [ドメイン/機能名] データをフェッチするカスタムフックを書いてください。

[技術スタック及び制約条件]
- React、TypeScript 環境
- 状態管理は Zustand、非同期データフェッチ及びキャッシングは TanStack Query(React Query) を使用
- @supabase/ssr パッケージは絶対に使用せず、手動で Supabase クライアントを初期化してロジックを実装すること
- FSD(Feature-Sliced Design) アーキテクチャに従うため、該当フックは features/{ドメイン}/api/ パスに配置すること
- エラー発生時の処理ロジックを含め、ローディング状態(isLoading)を明確に返すこと
- 型は shared/types/ パスの既存の型を import して使用すること
```

---

## 📋 Prompt Template (タイピングルーム基準 — Next.js + Supabase バックエンドレス)

```
Supabase クライアントを使用して [機能名] データをフェッチするカスタムフックを書いてください。

[技術スタック及び制約条件]
- Next.js App Router、TypeScript 環境
- 別途状態管理ライブラリを使わず React useState/useEffect を使用
- Supabase クライアントは @/lib/supabase.ts の createClientComponentClient() を使用すること
- フックファイルの場所: hooks/use[機能名].ts
- 戻り値: { data, isLoading, error, refetch }
- エラーは console.error の代わりに error state で返すこと
```

---

## ✅ 良い例 vs ❌ 悪い例

**❌ 悪い例 — 曖昧すぎる**
```
Supabase でユーザーデータを取得するフックを作って。
```
→ Claudeが任意にパッケージを選択し、ファイル位置を無視し、型を直接定義してしまう

**✅ 良い例 — 制約条件を明示**
```
Supabase で現在ログインしているユーザーのタイピングセッション履歴を取得するフックを作ってください。
- フックの場所: hooks/useTypingHistory.ts
- Supabase クライアント: @/lib/supabase.ts の createClientComponentClient() を使用
- TypingSession 型は @/types/typing.ts から import
- 戻り値: { sessions: TypingSession[], isLoading, error }
```

---

## 💡 CLAUDE.md に共通ルールを登録する

毎回繰り返すのが面倒な制約条件は、CLAUDE.md に一度だけ書いておきましょう。

```markdown
## フロントエンドルール
- Supabase クライアントは常に @/lib/supabase.ts の createClientComponentClient() を使用
- @supabase/ssr パッケージの使用禁止
- フックの戻り値は常に { data, isLoading, error } の形式に統一
- 型は @/types/ パスから import し、フックファイル内での直接定義を禁止
```

こうしておくとプロンプトがずっと短くなり、Claudeがコンベンションを自動的に従うようになります。