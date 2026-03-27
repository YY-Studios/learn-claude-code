---
title: CLAUDE.md 계층 구조와 우선순위
description: CLAUDE.md, MEMORY.md, .claude/rules/ 로딩 순서와 충돌 해결 방법. 폴더별 분리와 Lazy Loading 전략.
---

# CLAUDE.md 계층 구조 및 지연 로딩 (Lazy Loading)

프로젝트 규모가 커질수록 루트 `CLAUDE.md` 하나에 모든 API 스펙이나 DB 스키마를 넣으면, 매 세션마다 수천 토큰이 낭비됩니다.

---

## 1. 로딩 방식 이해하기 (중요)

폴더별 CLAUDE.md 전략을 쓰기 전에 로딩 방식을 먼저 이해해야 해요.

| 위치 | 로드 시점 |
|---|---|
| 실행 위치 기준 **상위** CLAUDE.md | 세션 시작 시 **즉시** 전부 로드 |
| 실행 위치 기준 **하위** CLAUDE.md | 해당 폴더 파일을 실제로 작업할 때만 로드 ✅ |

> ⚠️ **`@` 문법으로 파일을 참조하면 진짜 Lazy Loading이 아닙니다.**  
> `@docs/db-schema.md` 처럼 참조하면 세션 시작 시 즉시 로드되어 토큰을 전부 소비합니다.  
> 진짜 Lazy Loading은 **폴더 내부에 CLAUDE.md를 두는 방식**으로만 동작합니다.

---

## 2. 폴더별 CLAUDE.md 분리 전략 (진짜 Lazy Loading)

도메인이나 기능별로 폴더 내부에 별도의 `CLAUDE.md`를 작성하세요.

```
📁 프로젝트 루트/
├── CLAUDE.md              ← 항상 로드 (공통 규칙만, 50~100줄 이하)
├── src/
│   ├── features/
│   │   └── auth/
│   │       └── CLAUDE.md  ← auth 폴더 작업할 때만 로드
├── supabase/
│   └── CLAUDE.md          ← supabase 폴더 작업할 때만 로드
└── docs/
    └── CLAUDE.md          ← docs 폴더 작업할 때만 로드
```

Claude Code는 **루트에서 실행 시** 하위 폴더의 CLAUDE.md를 즉시 읽지 않고, 해당 폴더 내 파일을 실제로 수정할 때만 읽어옵니다.

---

## 3. Pointer(참조) 방식 — 언제 써야 하나

`@` 참조 방식은 토큰 절약이 목적이 아니라 **CLAUDE.md 파일 구조를 읽기 좋게 정리**할 때 씁니다.

```markdown
## References
- 아키텍처 전체 구조: @docs/architecture.md
- DB 스키마: @docs/db-schema.md
- API 컨벤션: @docs/api-patterns.md
```

> 이 방식은 세션 시작 시 참조된 파일을 전부 읽어오므로, **파일이 크면 오히려 역효과**입니다.  
> 참조 파일은 가능한 짧고 핵심만 담아야 합니다.

---

## 4. 루트 CLAUDE.md — 가볍게 유지하는 법

루트 CLAUDE.md에 넣을 것과 빼야 할 것을 명확히 구분하세요.

**넣을 것 (공통 규칙)**
- 기술 스택 한 줄 요약
- 자주 쓰는 커맨드 (`npm run dev`, `npm run test` 등)
- 언어/코딩 컨벤션 (ES modules, camelCase 등)
- 절대 건드리면 안 되는 파일/폴더

**빼야 할 것 (하위 CLAUDE.md로 이동)**
- 특정 도메인 API 스펙
- DB 스키마 상세
- 특정 기능의 비즈니스 로직 규칙

> 💡 **실무 교훈:** 1,500줄짜리 CLAUDE.md는 오히려 Claude가 규칙을 무시하게 만듭니다.  
> CLAUDE.md는 **시간이 지날수록 줄어드는** 방향이 맞습니다.

---

## 5. 중요한 규칙은 강조 표시

CLAUDE.md가 길어질수록 Claude가 규칙을 건너뛸 수 있습니다. 절대 어겨선 안 되는 규칙은 강조 키워드를 붙여두세요.

```markdown
IMPORTANT: 절대 .env 파일을 수정하지 마세요.
YOU MUST: 모든 DB 쿼리는 RLS 정책을 통과해야 합니다.
```

---

## 6. CLAUDE.local.md (개인 설정)

팀과 공유하지 않을 개인 설정은 `CLAUDE.local.md`에 따로 작성하고 `.gitignore`에 추가하세요.

> ⚠️ 공식 문서에서는 `CLAUDE.local.md`를 deprecated로 분류하고, `@` import 방식을 권장하고 있습니다. 다만 현재도 동작하며 팀 환경에서 개인 설정 분리 용도로는 여전히 유용합니다.

---

> 💡 **한 줄 요약:** 진짜 Lazy Loading = 폴더별 CLAUDE.md 분리. `@` 참조는 즉시 로드됩니다.
