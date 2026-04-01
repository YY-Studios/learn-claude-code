---
title: Claude 메커니즘 비교 — 뭘 언제 쓰나?
description: rules, hooks, skills, custom-commands, MCP, subagents의 차이와 선택 기준
---

# 🗺️ Claude 메커니즘 한눈에 보기

Claude Code를 쓰다 보면 비슷해 보이는 것들이 많다.
rules도 있고, hooks도 있고, skills도 있고... 전부 "Claude에게 뭔가를 시키는 것" 같은데 어떻게 다른가?

한 줄 요약: **누가 실행하느냐, 언제 작동하느냐**가 핵심이다.

---

## 전체 비교표

| 메커니즘 | 위치 | 언제 작동 | 누가 실행 | 용도 |
|---|---|---|---|---|
| **CLAUDE.md / rules** | `.claude/rules/` | 매 대화 시작 시 자동 로드 | Claude가 읽음 | 행동 지침, 프로젝트 규칙 |
| **hooks** | `settings.json` | 특정 이벤트 발생 시 (PreToolUse 등) | **셸**이 실행 | 자동 린트, 파일 가드, 검증 |
| **skills** | `.claude/skills/` | Claude가 필요하다 판단할 때 | Claude가 읽음 (지연 로드) | 재사용 가능한 업무 매뉴얼 |
| **custom-commands** | `.claude/commands/` | 사용자가 `/명령어` 입력 시 | Claude가 실행 | 반복 작업 파이프라인 |
| **MCP** | `settings.json` | 연결된 동안 항상 사용 가능 | 외부 서버 | 외부 도구 연결 (DB, API 등) |
| **subagents** | `.claude/agents/` | Agent 도구 호출 시 | 별도 컨텍스트 Claude | 역할 분리, 병렬 처리 |

---

## 헷갈리는 쌍들

### rules vs skills — "둘 다 Claude가 읽는 텍스트인데?"

```
rules  → 항상 로드 (컨텍스트 소모)  → 모든 대화에 적용되어야 하는 규칙
skills → 필요할 때만 로드           → 특정 작업에만 필요한 가이드
```

> 예: "절대 `git push --force` 하지 마" → rules
> 예: "PR 작성 방법 단계별 가이드" → skills (PR 쓸 때만 로드)

### rules vs hooks — "둘 다 Claude 행동을 바꾸는데?"

```
rules  → Claude에게 읽히는 텍스트   → "이렇게 해줘"라고 부탁
hooks  → 셸 명령 자동 실행          → Claude가 뭘 하든 강제 적용
```

> 예: "타입 오류 있으면 고쳐줘" → rules (Claude가 지키면 됨)
> 예: "파일 저장 후 항상 tsc 실행" → hooks (Claude가 잊어도 자동 실행)

### hooks vs custom-commands — "둘 다 자동화인데?"

```
hooks           → 이벤트 기반 자동 실행 (사용자 개입 없음)
custom-commands → 사용자가 /명령어 입력해야 실행
```

> 예: PostToolUse마다 린트 → hooks
> 예: `/ship` 입력하면 테스트→빌드→PR 파이프라인 → custom-commands

---

## 선택 가이드

```
"모든 대화에 적용되어야 해"
  → 짧으면 CLAUDE.md, 길거나 경로별이면 rules

"Claude가 잊어도 자동으로 강제하고 싶어"
  → hooks

"특정 작업에만 필요한 상세 가이드가 있어"
  → skills

"반복하는 작업 흐름을 /명령어로 만들고 싶어"
  → custom-commands

"외부 서비스(DB, Notion, GitHub)에 연결하고 싶어"
  → MCP

"복잡한 작업을 여러 역할로 나눠 병렬 처리하고 싶어"
  → subagents
```

---

이 섹션에서는 **Claude 동작을 제어하는** rules와 hooks를 다룬다.
확장(MCP, skills, custom-commands)은 [05 · Claude 확장](/05-claude-extend/mcp)에서,
구조(subagents, WAT 프레임워크)는 [06 · Claude 구조](/07-claude-structure/wat-overview)에서 확인하자.
