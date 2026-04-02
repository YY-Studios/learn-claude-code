---
title: 하네스 설계법 — 5가지 핵심 레이어
description: 하네스 엔지니어링의 5가지 레이어(툴·컨텍스트·메모리·권한·실행루프) 설계법. Claude Code 구현과 "싼 도구 우선" 원칙, 세션 간 상태 유지 방법.
---

# 🔴 하네스 설계법

> ⚠️ **사전 권장:** [하네스 개념](./01-harness-concept.md)을 먼저 읽고 오세요.

하네스를 설계한다는 것은 AI 모델이 **실제 작업을 완수**할 수 있는 전체 시스템을 만드는 것입니다. 이 문서는 하네스를 구성하는 5가지 레이어와 각각의 설계 원칙을 다룹니다.

---

## 하네스의 5가지 핵심 레이어

```
┌──────────────────────────────────────────┐
│  Layer 5: 실행 루프 (Execution Loop)      │
├──────────────────────────────────────────┤
│  Layer 4: 권한 제어 (Permission)          │
├──────────────────────────────────────────┤
│  Layer 3: 메모리 (Memory)                 │
├──────────────────────────────────────────┤
│  Layer 2: 컨텍스트 (Context)              │
├──────────────────────────────────────────┤
│  Layer 1: 도구 (Tools)                    │
├──────────────────────────────────────────┤
│          [ AI 모델 ]                      │
└──────────────────────────────────────────┘
```

---

## Layer 1: 도구 (Tools)

### 개념

모델이 외부 세계와 상호작용하는 유일한 수단입니다. 도구 없이는 모델이 파일을 읽지도, 코드를 실행하지도 못합니다.

### Claude Code에서의 구현

Claude Code는 기본 도구를 내장하고 있습니다:

| 도구 | 역할 |
|---|---|
| `Read` | 파일 읽기 |
| `Write` | 파일 생성 |
| `Edit` | 파일 수정 |
| `Bash` | 셸 명령 실행 |
| `Grep` | 콘텐츠 검색 |
| `Glob` | 파일 패턴 검색 |
| `WebSearch` | 웹 검색 |

MCP(Model Context Protocol)를 통해 외부 도구도 추가할 수 있습니다.

### 핵심 원칙: "싼 도구 우선"

도구에는 **비용**이 있습니다. 처리 시간, API 비용, 오류 가능성 모두 비용입니다.

| 도구 유형 | 상대적 비용 | 용도 |
|---|---|---|
| `Grep`, `Glob`, `Read` | 매우 낮음 | 검색, 탐색 |
| `Bash` (로컬 스크립트) | 낮음 | 간단한 변환·계산 |
| `Edit`, `Write` | 보통 | 파일 수정 |
| 추가 LLM 호출 | 높음 | 복잡한 판단·생성 |
| 외부 API 호출 | 높음 + 레이턴시 | 외부 데이터 필요 시 |

```
✅ 좋은 예: 파일에서 함수 목록을 추출할 때
   → Grep으로 "def " 패턴 검색 (0.01초)

❌ 나쁜 예: 파일에서 함수 목록을 추출할 때
   → LLM에게 파일 전체를 주고 함수명 추출 요청 (2~5초 + 비용)
```

> 💡 **설계 팁:** 도구 선택 순서 = Grep/Glob → Read → Bash → Edit → LLM

---

## Layer 2: 컨텍스트 (Context)

### 개념

모델이 **올바른 판단**을 내리려면 올바른 배경 정보가 필요합니다. 컨텍스트 레이어는 "모델에게 무엇을 알려줄 것인가"를 설계합니다.

### Claude Code에서의 구현

**`CLAUDE.md`** — 프로젝트 전역 컨텍스트

```markdown
# CLAUDE.md

## 프로젝트 개요
이 프로젝트는 Next.js 14 + Supabase로 만든 SaaS입니다.

## 코딩 규칙
- TypeScript strict 모드 사용
- 컴포넌트는 src/components/ 아래에 위치
- API 라우트는 app/api/ 아래에 위치

## 하면 안 되는 것
- console.log를 커밋에 남기지 않기
- any 타입 사용 금지
```

**`.claude/rules/`** — 상황별 규칙 파일

```
.claude/rules/
  docs.md        ← 문서 작성 규칙
  testing.md     ← 테스트 작성 규칙
  database.md    ← DB 관련 주의사항
```

### 컨텍스트 설계 원칙

```
❌ 나쁜 컨텍스트: 없거나 너무 김
   → 모델이 프로젝트 규칙을 추측해서 작성

✅ 좋은 컨텍스트: 핵심만, 구조적으로
   → 프로젝트 개요 + 규칙 + 금지 사항을 간결하게
```

> ⚠️ **주의:** 컨텍스트는 모든 요청에 포함됩니다. 너무 길면 실제 작업 공간이 줄어듭니다.

---

## Layer 3: 메모리 (Memory)

### 개념

AI 모델은 기본적으로 **세션이 끝나면 모든 것을 잊습니다**. 메모리 레이어는 세션 간에 상태를 유지하는 방법을 설계합니다.

### Claude Code에서의 구현

**단기 메모리 — 세션 내**

```markdown
# TODO.md (작업 추적)
- [x] 로그인 API 구현
- [ ] 이메일 인증 추가
- [ ] 테스트 작성

# 현재 작업 맥락을 파일로 유지
```

**장기 메모리 — 세션 간**

```
.claude/memory/
  user.md          ← 사용자 선호·작업 스타일
  project.md       ← 진행 중인 작업, 결정 사항
  feedback.md      ← 이전 피드백, 학습 내용
  MEMORY.md        ← 메모리 파일 인덱스
```

**중기 메모리 — 복잡한 작업**

```markdown
# Plans.md (구현 계획)
## 목표
인증 시스템 구현

## 완료
- [x] DB 스키마 설계
- [x] 회원가입 API

## 진행 중
- [ ] JWT 토큰 발급

## 다음
- [ ] 이메일 인증
```

### 세션 간 상태 유지 설계

```
작업 시작 → Plans.md/TODO.md 확인
    ↓
작업 중   → 완료 항목 체크, 새 결정 사항 기록
    ↓
작업 종료 → 다음 세션을 위한 컨텍스트 저장
    ↓
다음 세션 → 파일 읽고 이어서 작업
```

> 💡 **설계 팁:** `/compact` 명령으로 긴 대화를 압축하고 핵심을 Plans.md에 보존하세요.

---

## Layer 4: 권한 제어 (Permission)

### 개념

모델이 **무엇을 할 수 있고 없는지**를 명확히 정의합니다. 권한 없이는 실수로 중요한 파일을 삭제하거나 의도치 않은 API를 호출할 수 있습니다.

### Claude Code에서의 구현

**`settings.json`** — 도구 허용/차단

```json
{
  "permissions": {
    "allow": [
      "Bash(git *)",
      "Bash(npm test)",
      "Read(**)",
      "Edit(src/**)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force)"
    ]
  }
}
```

**Hooks** — 도구 실행 전후 제어

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "echo '[BASH] 실행: $TOOL_INPUT' >> .claude/audit.log"
        }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [{
          "type": "command",
          "command": "npm run lint --fix"
        }]
      }
    ]
  }
}
```

### 권한 설계 원칙

```
최소 권한 원칙: 필요한 것만 허용
감사 로그: 중요한 작업은 기록
자동화: 반복 검증은 Hook으로 자동화
```

| 상황 | 권한 설계 |
|---|---|
| 읽기 전용 분석 | Bash 차단, Read만 허용 |
| 안전한 개발 환경 | git push --force 차단 |
| 자동화 파이프라인 | 특정 디렉토리만 Write 허용 |

---

## Layer 5: 실행 루프 (Execution Loop)

### 개념

모델이 **한 번 답하고 끝**나는 것이 아니라, 작업이 완료될 때까지 반복적으로 작업하는 루프를 설계합니다.

### Claude Code에서의 구현

Claude Code는 기본적으로 "대화 → 도구 실행 → 결과 반영 → 반복" 루프를 내장합니다.

```
사용자 요청
    ↓
분석 (Read, Grep으로 코드베이스 탐색)
    ↓
계획 수립 (Plans.md 작성)
    ↓
실행 (Edit, Bash 등)
    ↓
검증 (테스트 실행, lint 확인)
    ↓
완료 or 다음 단계
```

**커스텀 명령어로 루프 제어**

`.claude/commands/` 디렉토리에 커스텀 루프를 정의할 수 있습니다:

```markdown
# .claude/commands/review.md
---
description: PR 코드 리뷰 루프
---

다음 순서로 PR을 리뷰해주세요:
1. 변경된 파일 목록 확인 (git diff --name-only)
2. 각 파일의 변경사항 읽기
3. 코드 품질, 보안, 성능 관점에서 피드백 작성
4. REVIEW.md에 정리해서 저장
```

---

## 실전: 5레이어 설계 예시

**목표:** "문서 자동 갱신 에이전트" 만들기

```
Layer 1 (도구)
  → Read, Grep (코드 읽기)
  → Write (문서 생성)
  → Bash("git diff") (변경 감지)

Layer 2 (컨텍스트)
  → CLAUDE.md: "이 프로젝트의 문서 스타일과 규칙"
  → .claude/rules/docs.md: "문서 포맷 가이드"

Layer 3 (메모리)
  → TODO.md: "어떤 파일의 문서가 아직 갱신 안 됐는지"
  → last-updated.json: "각 파일 마지막 문서 갱신 시각"

Layer 4 (권한)
  → Edit(docs/**) 허용
  → Bash(git push) 차단 (사람이 직접 확인 후 푸시)
  → PostToolUse Hook: 문서 갱신 후 spellcheck 자동 실행

Layer 5 (실행 루프)
  → /update-docs 커스텀 명령어로 루프 시작
  → 변경된 코드 감지 → 관련 문서 갱신 → 검토 요청 반복
```

---

## 레이어별 Claude Code 구현 요약

| 레이어 | Claude Code 구현체 |
|---|---|
| 도구 | 내장 도구 (Read/Write/Bash 등) + MCP 서버 |
| 컨텍스트 | `CLAUDE.md` + `.claude/rules/*.md` |
| 메모리 | `TODO.md` + `Plans.md` + `.claude/memory/` |
| 권한 | `settings.json` + Hooks |
| 실행 루프 | 내장 대화 루프 + `.claude/commands/*.md` |

> 💡 **다음 단계:** 자신의 워크플로우에 맞는 하네스를 설계해보세요. 가장 빠른 시작은 `CLAUDE.md`를 꼼꼼히 작성하는 것입니다.
