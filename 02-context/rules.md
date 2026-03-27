# .claude/rules/ 경로별 규칙

CLAUDE.md가 200줄 넘어가면 Claude가 규칙을 무시하기 시작합니다. `.claude/rules/`로 분리하세요.

---

## 언제 필요한가?

**이런 증상이 보이면:**
- Claude가 방금 말한 규칙을 또 어김
- "아까 말했잖아"라고 해도 안 들음
- `/context` 했을 때 System Prompt가 큼

**해결책 선택:**

| 상황 | 해결책 |
|---|---|
| 규칙이 길어서 Claude가 무시함 | Rules로 분리 |
| 반복 작업 (커밋 전 린트, 파일 저장 시 포맷) | Hook으로 자동화 |
| 규칙인데 항상 지켜짐 | Hook으로 전환 고려 |

**판단 기준:**
```
"커밋 전에 항상 npm run lint 돌려" 
→ CLAUDE.md에 쓰지 말고 pre-commit Hook

"API 파일에서는 Zod validation 필수"
→ Rules로 분리 (조건부 규칙)
```

→ **공식 권장:** "Claude가 알아서 잘하는 것 = Hook으로, 못하는 것 = 규칙으로"

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

**중요:** `.claude/rules/` 안의 모든 `.md` 파일이 자동 인식됩니다.

---

## 두 가지 로드 방식

### 항상 로드 (paths 없음)

```markdown
# 코딩 스타일 규칙

- 2-space 들여쓰기
- ESLint 준수
```

→ 세션 시작 시 무조건 로드

### 조건부 로드 (paths 있음)

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API 규칙

- Zod validation 필수
- rate limiting 필수
```

→ `src/api/` 작업할 때만 로드

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

**주의:**
- `paths:` (복수형, 단수 아님)
- `---`로 시작하고 끝
- 경로는 `- "경로"` 형식

---

## 경로 패턴

| 패턴 | 매칭 |
|---|---|
| `"src/api/**/*.ts"` | `src/api/users/route.ts` |
| `"src/components/*.tsx"` | `src/components/Button.tsx` (하위 폴더 제외) |
| `"**/*.test.ts"` | 모든 테스트 파일 |

**Glob 규칙:**
- `*` = 한 레벨
- `**` = 모든 레벨 (재귀)

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
- 에러: { error: "message", code: "CODE" }
- JWT 검증: Supabase
```

### 컴포넌트 규칙 (조건부 로드)

**`.claude/rules/components.md`**
```markdown
---
paths:
  - "src/components/**/*.tsx"
---

# React 컴포넌트 규칙

## Props
- 불리언: `isLoading`, `hasError`
- 핸들러: `onSubmit`, `onClick`

## 스타일
- Tailwind CSS만
- 인라인 스타일 금지
```

---

## 💡 실전 꿀팁

### 1. 기존 CLAUDE.md 쪼개기

**단계:**
```
1. CLAUDE.md 백업
2. 폴더별로 그룹핑 (API/컴포넌트/DB...)
3. Rules 파일 생성 + paths 설정
4. CLAUDE.md에서 해당 부분 삭제
5. 하나씩 테스트
```

### 2. 토큰 절약 실측

**타이핑룸 프로젝트:**
```
BEFORE: CLAUDE.md 280줄 → 항상 로드
AFTER: CLAUDE.md 50줄 + rules 230줄

효과:
- API 작업: 150줄만 로드 (46% 절약)
- 컴포넌트 작업: 140줄만 로드 (50% 절약)
```

### 3. paths 패턴 찾기

```bash
# 본인이 자주 작업하는 파일 확인
git log --name-only --pretty=format: | sort | uniq -c | sort -rn | head -20

# 결과 예시:
# 42 src/api/users/route.ts
# 38 src/components/Button.tsx
# 25 src/hooks/useAuth.ts

→ src/api/**, src/components/**, src/hooks/** 각각 rules 분리
```

### 4. 충돌 확인

```bash
# Claude에게 물어보기
"CLAUDE.md와 rules에서 충돌나는 규칙 찾아줘"
```

---

## ❌ 흔한 삽질

### 삽질 1: 문법 틀림

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

```markdown
# .claude/rules/api.md

# API 규칙
- rate limiting 필수
```

→ paths 없으면 **항상 로드됨**

### 삽질 3: 충돌

```markdown
# CLAUDE.md
- API는 Express

# .claude/rules/api.md
- API는 Fastify
```

→ Claude 혼란, 랜덤 선택

**해결:** CLAUDE.md에는 스택 개요만, 구체적 규칙은 Rules에

### 삽질 4: 과도한 분리

```
❌ 나쁜 예:
.claude/rules/
  ├── api-users.md (10줄)
  ├── api-auth.md (8줄)
  ├── api-posts.md (12줄)

✅ 좋은 예:
.claude/rules/
  └── api.md (30줄)
```

**기준:** 50줄 이상, 명확히 독립적일 때만 분리

---

## 활용 패턴

### 기본 3-tier

```
CLAUDE.md (50줄)
  ← 스택, 핵심 금지사항

.claude/rules/
  ├── code-style.md (paths 없음, 50줄)
  ├── api.md (paths 있음, 50줄)
  └── components.md (paths 있음, 50줄)
```

**효과:**
- 총 200줄이지만 한 번에 150줄만 로드
- 토큰 25% 절약

---

## 트러블슈팅

### Rules가 적용 안 됨

```
1. YAML 문법 확인 (---, paths:)
2. 경로 패턴 확인
3. Claude Code 재시작
```

### paths 있는데 항상 로드됨

```
→ glob 패턴이 너무 넓음 (**/* 같은)
→ paths 문법 확인
```

### 로드 확인

```bash
# Claude에게
"지금 로드된 규칙 파일 보여줘"

# 또는 Hook 사용
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





