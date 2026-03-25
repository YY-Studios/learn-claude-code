# Supabase RLS 정책 작성 패턴

RLS(Row Level Security)는 Supabase 보안의 핵심입니다. Claude Code에게 RLS 정책을 맡길 때는 **테이블 구조, 인증 방식, 접근 규칙**을 함께 명시해야 의도한 대로 작성해줍니다.

---

## RLS를 Claude에게 맡길 때 흔한 실수

**`auth.uid()`와 일반 컬럼 혼동**
Claude가 `user_id = auth.uid()` 대신 `user_id = current_user`처럼 잘못된 함수를 쓰는 경우가 있습니다. 반드시 Supabase auth 함수를 명시하세요.

**정책 이름 없이 생성**
이름 없는 정책은 나중에 수정하거나 삭제할 때 찾기 어렵습니다.

**SELECT/INSERT/UPDATE/DELETE를 하나로 뭉치기**
Supabase RLS는 작업별로 정책을 분리하는 게 관리하기 좋습니다.

---

## 📋 Prompt Template

```
아래 테이블에 대한 Supabase RLS 정책을 작성해줘.

[테이블 구조]
- 테이블명: typing_sessions
- 컬럼: id (uuid), user_id (uuid, FK → auth.users), content (text), created_at (timestamptz)

[인증 방식]
- Supabase Auth 사용
- 인증된 사용자: auth.uid() 함수로 현재 유저 ID 가져옴
- 비인증 사용자(anon): 접근 불가

[접근 규칙]
- SELECT: 자신의 레코드만 조회 가능 (user_id = auth.uid())
- INSERT: 인증된 사용자만 가능, user_id는 반드시 auth.uid()와 일치해야 함
- UPDATE: 자신의 레코드만 수정 가능
- DELETE: 자신의 레코드만 삭제 가능

[제약 조건]
- 정책 이름은 "[테이블명]_[작업]_[역할]" 형식으로 작성
- Supabase auth 함수 사용: auth.uid(), auth.role()
- 관리자 역할은 별도 처리하지 않음
```

---

## RLS 정책 예시 (타이핑룸 기준)

```sql
-- RLS 활성화
ALTER TABLE typing_sessions ENABLE ROW LEVEL SECURITY;

-- SELECT: 자신의 레코드만 조회
CREATE POLICY "typing_sessions_select_authenticated"
ON typing_sessions
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- INSERT: 자신의 user_id로만 삽입
CREATE POLICY "typing_sessions_insert_authenticated"
ON typing_sessions
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- UPDATE: 자신의 레코드만 수정
CREATE POLICY "typing_sessions_update_authenticated"
ON typing_sessions
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- DELETE: 자신의 레코드만 삭제
CREATE POLICY "typing_sessions_delete_authenticated"
ON typing_sessions
FOR DELETE
TO authenticated
USING (user_id = auth.uid());
```

---

## 자주 쓰는 패턴

### 공개 읽기 + 본인만 쓰기

```sql
-- 누구나 읽기 가능 (블로그 포스트 등)
CREATE POLICY "posts_select_public"
ON posts FOR SELECT TO anon, authenticated
USING (true);

-- 작성자만 수정/삭제
CREATE POLICY "posts_update_owner"
ON posts FOR UPDATE TO authenticated
USING (author_id = auth.uid())
WITH CHECK (author_id = auth.uid());
```

### 팀 기반 접근 (조인 테이블 활용)

```sql
-- team_members 테이블에 있는 유저만 접근
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

### Service Role은 RLS 우회

Edge Function에서 `SUPABASE_SERVICE_ROLE_KEY`를 사용하면 RLS를 우회합니다. 관리자 작업이나 백그라운드 작업에 활용합니다.

```typescript
// Edge Function에서 서비스 롤 사용 (RLS 우회)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!  // ← RLS 우회
)
```

> ⚠️ `SERVICE_ROLE_KEY`는 클라이언트(브라우저)에 절대 노출하면 안 됩니다. Edge Function 서버 사이드에서만 사용하세요.

---

## RLS 정책 테스트 프롬프트

작성 후 Claude에게 테스트 쿼리도 요청하세요.

```
"방금 작성한 RLS 정책이 잘 작동하는지 확인하는 SQL 테스트 케이스를 작성해줘.
- 인증된 유저가 자신의 레코드를 조회/수정/삭제하는 케이스
- 다른 유저의 레코드에 접근했을 때 거부되는 케이스
- 비인증 유저(anon)가 접근했을 때 거부되는 케이스"
```

---

## CLAUDE.md에 공통 규칙 등록하기

```markdown
## Supabase RLS 규칙
- RLS 정책은 작업별(SELECT/INSERT/UPDATE/DELETE)로 분리해서 작성
- 정책 이름: "[테이블명]_[작업]_[역할]" 형식 (예: users_select_authenticated)
- 인증 함수: auth.uid() 사용 (current_user 사용 금지)
- 새 테이블 생성 시 항상 RLS 활성화 포함
- Service Role Key는 Edge Function에서만 사용, 클라이언트 노출 금지
```
