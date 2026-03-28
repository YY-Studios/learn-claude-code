---
title: Supabase RLSポリシー作成パターン
description: Row Level Securityポリシーの自動化。セキュリティポリシーテンプレート、ロール別アクセス制御、よくあるRLSミスの防止法。
---

# Supabase RLSポリシー作成パターン

RLS（Row Level Security）はSupabaseセキュリティの核心です。Claude CodeにRLSポリシーを任せる際は、**テーブル構造、認証方式、アクセスルール**を一緒に明示することで、意図した通りに作成してもらえます。

---

## RLSをClaudeに任せるときのよくある間違い

**`auth.uid()`と一般カラムの混同**
Claudeが`user_id = auth.uid()`の代わりに`user_id = current_user`のような誤った関数を使う場合があります。必ずSupabase authの関数を明示してください。

**ポリシー名なしで作成**
名前のないポリシーは、後で修正・削除するときに見つけにくくなります。

**SELECT/INSERT/UPDATE/DELETEをひとつにまとめる**
Supabase RLSは操作ごとにポリシーを分けて管理するのが良いプラクティスです。

---

## 📋 プロンプトテンプレート

```
以下のテーブルに対するSupabase RLSポリシーを作成してください。

[テーブル構造]
- テーブル名: typing_sessions
- カラム: id (uuid), user_id (uuid, FK → auth.users), content (text), created_at (timestamptz)

[認証方式]
- Supabase Auth使用
- 認証済みユーザー: auth.uid() 関数で現在のユーザーIDを取得
- 未認証ユーザー(anon): アクセス不可

[アクセスルール]
- SELECT: 自分のレコードのみ照会可能 (user_id = auth.uid())
- INSERT: 認証済みユーザーのみ可能、user_idは必ずauth.uid()と一致する必要あり
- UPDATE: 自分のレコードのみ修正可能
- DELETE: 自分のレコードのみ削除可能

[制約条件]
- ポリシー名は "[テーブル名]_[操作]_[ロール]" 形式で作成
- Supabase auth関数を使用: auth.uid(), auth.role()
- 管理者ロールは別途処理しない
```

---

## RLSポリシーの例（タイピングルーム基準）

```sql
-- RLS有効化
ALTER TABLE typing_sessions ENABLE ROW LEVEL SECURITY;

-- SELECT: 自分のレコードのみ照会
CREATE POLICY "typing_sessions_select_authenticated"
ON typing_sessions
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- INSERT: 自分のuser_idでのみ挿入
CREATE POLICY "typing_sessions_insert_authenticated"
ON typing_sessions
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- UPDATE: 自分のレコードのみ修正
CREATE POLICY "typing_sessions_update_authenticated"
ON typing_sessions
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- DELETE: 自分のレコードのみ削除
CREATE POLICY "typing_sessions_delete_authenticated"
ON typing_sessions
FOR DELETE
TO authenticated
USING (user_id = auth.uid());
```

---

## よく使うパターン

### 公開読み取り＋本人のみ書き込み

```sql
-- 誰でも読み取り可能（ブログ投稿など）
CREATE POLICY "posts_select_public"
ON posts FOR SELECT TO anon, authenticated
USING (true);

-- 作成者のみ修正・削除
CREATE POLICY "posts_update_owner"
ON posts FOR UPDATE TO authenticated
USING (author_id = auth.uid())
WITH CHECK (author_id = auth.uid());
```

### チームベースのアクセス（結合テーブルの活用）

```sql
-- team_membersテーブルにいるユーザーのみアクセス
CREATE POLICY "documents_select_team_member"
ON documents FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM team_members
    WHERE team_members.team_id = documents.team_id
    AND team_members.user_id = auth.uid()
  )
);
```

### Service RoleはRLSをバイパス

Edge Functionで`SUPABASE_SERVICE_ROLE_KEY`を使用するとRLSをバイパスします。管理者作業やバックグラウンド処理に活用します。

```typescript
// Edge FunctionでService Roleを使用（RLSバイパス）
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!  // ← RLSバイパス
)
```

> ⚠️ `SERVICE_ROLE_KEY`はクライアント（ブラウザ）に絶対に公開してはいけません。Edge Functionのサーバーサイドでのみ使用してください。

---

## RLSポリシーのテストプロンプト

作成後にClaudeへテストクエリの生成も依頼しましょう。

```
「先ほど作成したRLSポリシーが正しく動作するか確認するSQLテストケースを作成してください。
- 認証済みユーザーが自分のレコードを照会・修正・削除するケース
- 他のユーザーのレコードにアクセスしたときに拒否されるケース
- 未認証ユーザー(anon)がアクセスしたときに拒否されるケース」
```

---

## CLAUDE.mdに共通ルールを登録する

```markdown
## Supabase RLSルール
- RLSポリシーは操作ごと(SELECT/INSERT/UPDATE/DELETE)に分けて作成
- ポリシー名: "[テーブル名]_[操作]_[ロール]" 形式（例: users_select_authenticated）
- 認証関数: auth.uid() を使用（current_userの使用禁止）
- 新しいテーブル作成時は必ずRLS有効化を含める
- Service Role KeyはEdge Functionでのみ使用、クライアントへの公開禁止
```