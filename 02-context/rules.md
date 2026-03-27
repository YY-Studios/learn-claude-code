---
title: .claude/rules/ 경로별 규칙 설정 가이드
description: CLAUDE.md를 여러 파일로 분리해 토큰 절약하기. paths 설정으로 조건부 로드, 폴더별 다른 규칙 적용 방법.
---

# .claude/rules/ 경로별 규칙

AI 에이전트를 활용할 때 CLAUDE.md가 200줄을 넘어가면 Claude가 규칙을 무시하기 시작합니다. 이를 방지하는 핵심 도구가 바로 `.claude/rules/` 디렉토리입니다.

---

## ⚠️ 언제 Rules가 필요한가?

**이런 증상이 보이면 Rules로 쪼갤 타이밍입니다:**
- Claude가 방금 전에 말한 규칙을 또 어기고 있습니다
- "아까 말했잖아요"라고 해도 듣지 않습니다
- `/context` 명령어를 쳤을 때 System Prompt가 큰 비중을 차지합니다

**해결책 선택하기:**

**규칙이 길어서 Claude가 무시하는 경우** → Rules로 분리하세요. 핵심 규칙만 CLAUDE.md에 남기고, 폴더별 세부 규칙은 `.claude/rules/`로 빼냅니다.

**반복 작업인 경우 (커밋 전 린트, 파일 저장 시 포맷)** → Hook으로 자동화하세요. "커밋 전에 항상 npm run lint 돌려"같은 반복 지시는 CLAUDE.md에 쓰지 말고 pre-commit Hook으로 만드세요.

**규칙인데 항상 지켜지는 경우** → Hook으로 전환을 고려하세요. Claude가 100% 잘 지키는 규칙은 Hook으로 자동화하는 게 토큰 절약에 유리합니다.

> **💡 공식 권장:** "Claude가 알아서 잘하는 것은 Hook으로 자동화하고, 못하는 것은 Rules로 명시하세요"

---

## 기본 구조

```
your-project/
├── .claude/
│   ├── CLAUDE.md              ← 핵심 규칙 (50-100줄)
│   └── rules/
│       ├── code-style.md      ← 전역 스타일 (paths 없음)
│       ├── api.md             ← API 작업시만 (paths 있음)
│       └── components.md      ← 컴포넌트 작업시만
```

**중요:** `.claude/rules/` 안의 모든 `.md` 파일이 자동으로 인식됩니다.

---

## 두 가지 로드 방식

### 항상 로드 (paths 없음)

YAML frontmatter가 없거나 `paths` 필드가 없으면 세션 시작 시 무조건 로드됩니다. CLAUDE.md와 동일한 우선순위로 동작합니다.

```markdown
# 코딩 스타일 규칙

- 2-space 들여쓰기
- ESLint 준수
```

### 조건부 로드 (paths 있음)

YAML frontmatter에 `paths` 필드가 있으면 해당 파일을 작업할 때만 로드됩니다. `src/api/` 하위 파일을 수정할 때만 API 규칙이 컨텍스트에 들어옵니다.

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API 규칙

- Zod validation 필수
- rate limiting 필수
```

---

## 문법: YAML Frontmatter

```markdown
---
paths:
  - "경로/패턴/**"
  - "다른/패턴/*.ts"
---

# 규칙 내용
```

**주의사항:**
- `paths:` (복수형입니다. path가 아닙니다)
- `---`로 시작하고 `---`로 끝내야 합니다
- 각 경로는 `- "경로"` 형식의 YAML 배열입니다

---

## 경로 패턴

| 패턴 | 매칭되는 파일 |
|---|---|
| `"src/api/**/*.ts"` | `src/api/users/route.ts` |
| `"src/components/*.tsx"` | `src/components/Button.tsx` (하위 폴더 제외) |
| `"**/*.test.ts"` | 모든 테스트 파일 |

**Glob 패턴 규칙:**
- `*` = 한 레벨 (슬래시를 건너뛰지 않음)
- `**` = 모든 레벨 (재귀적으로 탐색)

---

## 실전 예시

### API 규칙 (조건부 로드)

**`.claude/rules/api.md`**
```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API 규칙

- Zod validation 필수
- rate limiting 기본 100 req/min
- 에러 응답 형식: { error: "message", code: "CODE" }
- JWT 검증은 Supabase로
```

### 컴포넌트 규칙 (조건부 로드)

**`.claude/rules/components.md`**
```markdown
---
paths:
  - "src/components/**/*.tsx"
---

# React 컴포넌트 규칙

## Props 네이밍
- 불리언: `isLoading`, `hasError`
- 핸들러: `onSubmit`, `onClick`

## 스타일링
- Tailwind CSS만 사용
- 인라인 스타일 금지
```

---

## 💡 실전 꿀팁

### 1. 기존 CLAUDE.md 쪼개기

긴 CLAUDE.md를 Rules로 마이그레이션하는 단계별 전략입니다.

```
1. CLAUDE.md 백업 (복사본 만들기)
2. 폴더별로 그룹핑 (API/컴포넌트/DB...)
3. Rules 파일 생성 + paths 설정
4. CLAUDE.md에서 해당 부분 삭제
5. 하나씩 테스트 (한 번에 전부 쪼개지 마세요)
```

### 2. 토큰 절약 실측

**타이핑룸 프로젝트 기준:**
```
BEFORE: CLAUDE.md 280줄 → 항상 로드

AFTER: CLAUDE.md 50줄 + rules 230줄 (paths별 분리)

효과:
- API 작업 시: 150줄만 로드 (46% 절약)
- 컴포넌트 작업 시: 140줄만 로드 (50% 절약)
```

### 3. paths 패턴 찾기

본인이 자주 작업하는 파일 패턴을 git log로 확인할 수 있습니다.

```bash
# 자주 작업하는 파일 확인
git log --name-only --pretty=format: | sort | uniq -c | sort -rn | head -20

# 결과 예시:
# 42 src/api/users/route.ts
# 38 src/components/Button.tsx
# 25 src/hooks/useAuth.ts

→ src/api/**, src/components/**, src/hooks/** 각각 rules 분리
```

### 4. 충돌 확인

> "CLAUDE.md와 rules에서 충돌나는 규칙 찾아줘"

Claude에게 물어보면 알아서 찾아줍니다.

---

## ❌ 절대 하지 말 것 (흔한 삽질)

### 삽질 1: path 단수형으로 쓰기

10번 중 8번 틀리는 문법입니다.

```markdown
# ❌ 틀림
path: "src/api/**"

# ✅ 맞음
---
paths:
  - "src/api/**/*.ts"
---
```

### 삽질 2: paths 없는데 조건부라고 착각

paths frontmatter가 없으면 무조건 항상 로드됩니다.

```markdown
# .claude/rules/api.md

# API 규칙
- rate limiting 필수
```

→ "API 작업 시에만 로드될 거야" ← 착각입니다. paths 없으면 항상 로드됩니다.

### 삽질 3: CLAUDE.md와 충돌

```markdown
# CLAUDE.md
- API는 Express 사용

# .claude/rules/api.md
- API는 Fastify 사용
```

→ Claude가 혼란스러워하며 랜덤하게 선택합니다.

**해결법:** CLAUDE.md에는 스택 개요만 적고, 구체적인 구현 규칙은 Rules에 분리하세요.

### 삽질 4: 10줄짜리 파일 10개 만들기

```
❌ 나쁜 예:
.claude/rules/
  ├── api-users.md (10줄)
  ├── api-auth.md (8줄)
  ├── api-posts.md (12줄)
  ...

✅ 좋은 예:
.claude/rules/
  └── api.md (40줄, 모두 통합)
```

**기준:** 파일 하나가 50줄 이상이고 명확히 독립적일 때만 분리하세요.

### 삽질 5: 적용 안 되는데 계속 작업

Rules를 만들었는데 Claude가 안 따르는 경우입니다.

**체크리스트:**
```
1. YAML 문법이 맞나요? (---, paths:)
2. 경로 패턴이 실제 파일과 매칭되나요?
3. Claude Code를 재시작했나요?
```

**확인 방법:**
> "지금 로드된 규칙 파일 보여줘"

Claude에게 물어보면 현재 로드된 규칙 목록을 보여줍니다.

---

## 활용 패턴

### 기본 3-tier 구조

```
CLAUDE.md (50줄)
  ← 프로젝트 스택, 핵심 금지사항

.claude/rules/
  ├── code-style.md (paths 없음, 50줄)
  │   ← 전역 코딩 스타일
  ├── api.md (paths 있음, 50줄)
  │   ← src/api/** 작업 시만 로드
  └── components.md (paths 있음, 50줄)
      ← src/components/** 작업 시만 로드
```

**효과:**
- 총 규칙은 200줄이지만 한 번에 150줄만 로드됩니다
- 토큰 25% 절약

---

## 트러블슈팅

### Rules가 적용 안 될 때

```
1. YAML frontmatter 문법 확인 (---, paths:)
2. 경로 패턴이 실제 파일과 매칭되는지 확인
3. Claude Code 재시작
```

### paths 있는데 항상 로드될 때

```
→ glob 패턴이 너무 넓습니다 (**/* 같은 전체 매칭)
→ paths 문법을 다시 확인하세요
```

### 로드 확인 방법

```bash
# Claude에게 직접 물어보기
"지금 로드된 규칙 파일 보여줘"

# 또는 Hook을 사용한 로그 출력
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

→ 어떤 파일이 언제 로드됐는지 터미널에 로그가 출력됩니다.

---

