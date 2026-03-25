# 프론트엔드 훅 생성 패턴

Claude에게 프론트엔드 훅 생성을 맡길 때, **제약 조건을 명시하지 않으면** Claude가 자신이 알고 있는 일반적인 방식(예: `@supabase/ssr`, Context API 등)으로 구현합니다.  
효과적인 프롬프트는 **스택 + 제약 조건 + 파일 위치**를 함께 명시하는 것이 핵심입니다.

---

## 💡 왜 이 방식이 효과적인가?

| 요소 | 효과 |
|---|---|
| 기술 스택 명시 | Claude가 라이브러리 API를 정확히 사용 |
| 금지 패키지 명시 | 원하지 않는 구현 방식 차단 |
| 파일 위치 명시 | 아키텍처 규칙 자동 준수 |
| 반환값 명시 | 인터페이스를 예측 가능하게 통일 |

---

## 📋 Prompt Template (React + Zustand + TanStack Query + FSD)

```
Supabase 클라이언트를 사용하여 [도메인/기능명] 데이터를 패칭하는 커스텀 훅을 작성해 줘.

[기술 스택 및 제약 조건]
- React, TypeScript 환경
- 상태 관리는 Zustand, 비동기 데이터 패칭 및 캐싱은 TanStack Query(React Query) 사용
- @supabase/ssr 패키지는 절대 사용하지 않고, 수동으로 Supabase 클라이언트를 초기화하여 로직을 구현할 것
- FSD(Feature-Sliced Design) 아키텍처를 따르므로, 해당 훅은 features/{도메인}/api/ 경로에 위치해야 함
- 에러 발생 시 처리 로직을 포함하고, 로딩 상태(isLoading)를 명확히 반환할 것
- 타입은 shared/types/ 경로의 기존 타입을 import하여 사용할 것
```

---

## 📋 Prompt Template (타이핑룸 기준 — Next.js + Supabase 백엔드리스)

```
Supabase 클라이언트를 사용하여 [기능명] 데이터를 패칭하는 커스텀 훅을 작성해 줘.

[기술 스택 및 제약 조건]
- Next.js App Router, TypeScript 환경
- 별도 상태 관리 라이브러리 없이 React useState/useEffect 사용
- Supabase 클라이언트는 @/lib/supabase.ts의 createClientComponentClient()를 사용할 것
- 훅 파일 위치: hooks/use[기능명].ts
- 반환값: { data, isLoading, error, refetch }
- 에러는 console.error 대신 error state로 반환할 것
```

---

## ✅ 좋은 예시 vs ❌ 나쁜 예시

**❌ 나쁜 예시 — 너무 모호함**
```
Supabase로 유저 데이터 가져오는 훅 만들어줘.
```
→ Claude가 임의로 패키지 선택, 파일 위치 무시, 타입 직접 정의

**✅ 좋은 예시 — 제약 조건 명시**
```
Supabase에서 현재 로그인한 유저의 타이핑 세션 기록을 가져오는 훅을 만들어줘.
- 훅 위치: hooks/useTypingHistory.ts
- Supabase 클라이언트: @/lib/supabase.ts의 createClientComponentClient() 사용
- TypingSession 타입은 @/types/typing.ts에서 import
- 반환: { sessions: TypingSession[], isLoading, error }
```

---

## 💡 CLAUDE.md에 공통 규칙 등록하기

매번 반복하기 귀찮은 제약 조건은 CLAUDE.md에 한 번만 써두세요.

```markdown
## 프론트엔드 규칙
- Supabase 클라이언트는 항상 @/lib/supabase.ts의 createClientComponentClient() 사용
- @supabase/ssr 패키지 사용 금지
- 훅 반환값은 항상 { data, isLoading, error } 형태로 통일
- 타입은 @/types/ 경로에서 import, 훅 파일 내 직접 정의 금지
```

이렇게 해두면 프롬프트가 훨씬 짧아지고, Claude가 컨벤션을 자동으로 따릅니다.
