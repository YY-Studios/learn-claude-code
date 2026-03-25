# WAT 프레임워크 (Workflows, Agents, Tools)

> ⚠️ **WAT 프레임워크는 공식 Anthropic 문서가 아니라 커뮤니티에서 정립된 아키텍처 패턴입니다.**  
> 다만 각 구성 요소(Subagent, Agent Teams 등)는 공식 기능으로 지원됩니다.

복잡한 기능을 개발할 때 Claude에게 무작정 지시하면 길을 잃기 쉽습니다. WAT 프레임워크는 복잡한 에이전트 시스템을 세 레이어로 구조화하는 방법입니다.

---

## 1. Workflows — 작업 흐름 정의

Claude가 달성해야 할 목표를 명확한 순차적 단계로 쪼개서 지시합니다.

```
"먼저 DB 스키마를 업데이트하고(Step 1),
그 다음 백엔드 API를 만들고(Step 2),
마지막으로 프론트엔드 UI를 연결해(Step 3)."
```

> 💡 큰 기능을 한 번에 맡기기 전에, Claude에게 먼저 **인터뷰 방식으로 요구사항을 정리**하게 하는 것도 좋은 방법이에요.
> ```
> "이 기능을 구현하기 전에 AskUserQuestion 도구로 나를 인터뷰해서 요구사항을 명확히 해줘.
>  완료되면 SPEC.md에 스펙을 작성해."
> ```

---

## 2. Agents — 역할 분담 및 병렬 처리

### Subagent (공식 기능)

Subagent는 특정 유형의 작업을 처리하는 특화된 AI 어시스턴트로, 각자 독립적인 컨텍스트 윈도우에서 실행되며 사용자 정의 시스템 프롬프트, 특정 도구 액세스, 독립적인 권한을 가집니다.

`.claude/agents/` 폴더에 Markdown 파일로 정의하거나 `/agents` 명령으로 생성합니다.

```yaml
---
name: frontend-reviewer
description: React 컴포넌트 코드 리뷰 전문가
tools: Read, Grep, Glob
model: sonnet
---
당신은 React/TypeScript 전문가입니다...
```

**병렬 vs 순차 실행 기준**

| 패턴 | 조건 |
|---|---|
| **병렬 실행** | 작업이 독립적 + 파일 겹침 없음 + 서로 의존성 없음 |
| **순차 실행** | 이전 결과가 다음 단계에 필요 / 같은 파일 수정 |

---

### Agent Teams (실험적 기능)

Agent Teams는 여러 Claude Code 세션이 팀으로 함께 작동하는 기능으로, 하나의 세션이 팀 리드 역할을 맡아 작업을 조율하고 팀원들은 서로 직접 소통하며 협업합니다. Subagent와의 핵심 차이는 팀원 간 직접 통신이 가능하다는 점입니다.

활성화 방법:
```json
// .claude/settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

> ⚠️ **비용 주의:** 3명 팀 기준으로 단일 세션 대비 약 3~4배 토큰을 소비합니다.  
> 팀원 간 소통이 불필요한 작업은 Subagent가 더 효율적입니다.

---

## 3. Tools — 원자적 도구 활용

한 번에 수천 줄의 코드를 짜게 하지 마세요. 원자 단위(Atomic)의 작은 유틸리티 함수나 스크립트를 먼저 만들고 조립하게 해야 버그를 쉽게 추적할 수 있습니다.

**좋은 예시:**
```
"먼저 날짜 포맷 유틸 함수만 만들어줘. 
 테스트 통과하면 그때 API에 붙이자."
```

**나쁜 예시:**
```
"인증 시스템 전체 만들어줘."
```

---

## 실전 적용 — 풀스택 기능 개발 예시

```
Step 1: DB 스키마 설계 (단일 세션 + Plan Mode)
Step 2: 백엔드 API + 프론트 컴포넌트 (병렬 Subagent)
  └─ backend-agent: API 라우트, 비즈니스 로직
  └─ frontend-agent: React 컴포넌트, UI 상태
Step 3: 테스트 + 문서화 (순차 실행)
```

> 💡 **서브에이전트 모델 비용 절감 팁:**  
> 메인 세션은 Opus, 서브에이전트는 Sonnet으로 설정하면 비용을 크게 줄일 수 있습니다.
> ```bash
> export CLAUDE_CODE_SUBAGENT_MODEL="claude-sonnet-4-5"
> ```
