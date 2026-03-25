# CLAUDE.md 템플릿 모음

복붙해서 바로 쓸 수 있는 CLAUDE.md 템플릿입니다. 프로젝트 성격에 맞는 것을 골라 `/init`으로 생성된 파일에 덮어쓰거나 직접 편집하세요.

> 💡 CLAUDE.md는 **짧을수록 좋습니다.** 길어지면 Claude가 규칙을 무시하기 시작합니다. 루트는 50~100줄, 세부 내용은 폴더별 CLAUDE.md로 분리하세요.

---

## 템플릿 1 — Next.js + Supabase (타이핑룸 기준)

```markdown
# 프로젝트명

## 스택
- Next.js App Router, TypeScript
- Supabase (DB + Edge Functions)
- Zustand (상태관리), TanStack Query (비동기)

## 자주 쓰는 커맨드
- 개발 서버: `npm run dev`
- 빌드: `npm run build`
- 타입 체크: `npm run type-check`
- Supabase 로컬: `supabase start`

## 코딩 규칙
- 언어: TypeScript strict mode
- 컴포넌트: 함수형, 화살표 함수
- 스타일: Tailwind CSS
- 훅 반환값: { data, isLoading, error } 형태로 통일

## Supabase 규칙
- 클라이언트: @/lib/supabase.ts의 createClientComponentClient() 사용
- @supabase/ssr 패키지 사용 금지
- Edge Function: Deno 런타임, ESM import, Deno.env.get()
- RLS: 새 테이블은 반드시 활성화

## 절대 건드리지 마세요
- .env, .env.local
- supabase/migrations/ (마이그레이션은 별도 논의)

## 작업 규칙
- 세션 시작 시 TODO.md 읽고 현재 상태 파악
- 기능 완료마다 TODO.md 업데이트
- 중요한 기술 결정은 TODO.md 메모 섹션에 날짜와 함께 기록
```

---

## 템플릿 2 — 일반 Node.js / Express API

```markdown
# 프로젝트명 API

## 스택
- Node.js 20+, TypeScript
- Express.js
- PostgreSQL + Prisma ORM

## 자주 쓰는 커맨드
- 개발 서버: `npm run dev`
- 빌드: `npm run build`
- DB 마이그레이션: `npx prisma migrate dev`
- 테스트: `npm run test`

## 코딩 규칙
- 언어: TypeScript strict
- 패키지 매니저: pnpm (npm, yarn 사용 금지)
- 라우트 파일 위치: src/routes/
- 에러 처리: 반드시 try-catch, 에러는 next(err)로 전달

## IMPORTANT: 절대 하지 말 것
- .env 파일 수정 금지
- Prisma schema 직접 수정 금지 (마이그레이션 파일로만)
- console.log 대신 logger 모듈 사용
```

---

## 템플릿 3 — React 컴포넌트 라이브러리

```markdown
# 컴포넌트 라이브러리

## 스택
- React 18, TypeScript
- Storybook
- Vitest + Testing Library

## 자주 쓰는 커맨드
- Storybook: `npm run storybook`
- 테스트: `npm run test`
- 빌드: `npm run build`

## 컴포넌트 규칙
- 파일 구조: ComponentName/index.tsx + ComponentName.stories.tsx + ComponentName.test.tsx
- Props 타입: 반드시 명시, 선택적 prop은 기본값 제공
- export: named export 사용 (default export 금지)

## 스타일 규칙
- CSS-in-JS: styled-components
- 디자인 토큰: src/tokens/ 참조
- 반응형: 모바일 퍼스트

## YOU MUST: 모든 컴포넌트에 Storybook story 파일 포함
```

---

## 폴더별 CLAUDE.md 템플릿

루트 CLAUDE.md에서 분리해서 해당 폴더에 넣는 용도입니다.

### /supabase/CLAUDE.md

```markdown
# Supabase 폴더 규칙

## Edge Function
- 런타임: Deno (Node.js 아님)
- import: ESM, npm: prefix
- 환경변수: Deno.env.get()
- 파일 위치: supabase/functions/[함수명]/index.ts

## 마이그레이션
- 파일 생성: `supabase migration new [이름]`
- 직접 SQL 파일 생성 금지

## RLS
- 새 테이블: 반드시 ENABLE ROW LEVEL SECURITY
- 정책 이름: [테이블]_[작업]_[역할] 형식
```

### /src/features/auth/CLAUDE.md

```markdown
# Auth 도메인 규칙

## 인증 방식
- Supabase Auth 사용
- JWT는 Supabase가 관리 (직접 파싱 금지)
- 세션 확인: supabase.auth.getSession()

## 파일 구조 (FSD)
- UI: features/auth/ui/
- API 훅: features/auth/api/
- 타입: features/auth/model/types.ts

## IMPORTANT
- 인증 토큰을 localStorage에 직접 저장하지 마세요
- 비밀번호는 절대 로그에 출력하지 마세요
```
