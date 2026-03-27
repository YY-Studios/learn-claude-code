---
title: Subagents - 역할 분리와 병렬 처리
description: 여러 AI 에이전트에게 역할을 나눠 병렬 처리. 코드 리뷰, 테스트, 문서화 에이전트 분리 패턴.
---

# Subagents (역할 분리 & 병렬 처리)

> Subagent는 **Claude Code v1.x 이상**에서 지원되는 공식 기능입니다.

단일 Claude 세션에서 모든 걸 처리하다 보면 컨텍스트가 오염되고 집중력이 분산됩니다.
Subagent는 **특정 역할만 수행하는 독립된 AI 인스턴스**로, 각자 별도의 컨텍스트 윈도우에서 실행됩니다.

---

## Subagent의 핵심 특성

| 특성 | 설명 |
|---|---|
| **독립 컨텍스트** | 메인 세션과 별도의 컨텍스트 윈도우를 가짐 |
| **도구 제한** | 허용된 도구만 사용 가능 (보안 + 토큰 절약) |
| **전용 시스템 프롬프트** | 역할에 맞는 지시사항을 주입 |
| **독립 권한** | 메인 세션과 다른 권한 수준 설정 가능 |

---

## Subagent 정의 방법

`.claude/agents/` 폴더에 Markdown 파일로 정의합니다.

```
📁 프로젝트 루트/
└── .claude/
    └── agents/
        ├── frontend-reviewer.md
        ├── test-writer.md
        └── db-migration.md
```

또는 대화창에서 `/agents` 명령으로 생성할 수 있습니다.

---

## Subagent 파일 구조 (Front-matter)

```yaml
---
name: frontend-reviewer
description: React/TypeScript 컴포넌트 코드 리뷰 전문가.
             'UI 리뷰해줘', '컴포넌트 검토' 요청 시 자동 트리거.
tools: Read, Grep, Glob        # 읽기만 허용 (수정 불가)
model: claude-sonnet-4-5       # 비용 절약을 위해 Sonnet 사용
---

당신은 React/TypeScript 전문가입니다.

## 리뷰 기준
- Props 타입 정의가 명확한가
- 불필요한 리렌더링이 있는가
- 접근성(a11y) 속성이 누락됐는가
- 컴포넌트가 단일 책임 원칙을 지키는가

## 출력 형식
문제점은 파일명과 줄 번호를 명시하고, 심각도를 [critical / warning / suggestion]으로 분류하세요.
```

---

## Front-matter 옵션 전체 목록

| 옵션 | 타입 | 설명 | 기본값 |
|---|---|---|---|
| `name` | string | 에이전트 식별자 | 파일명 |
| `description` | string | 트리거 조건 포함한 역할 설명 | 필수 |
| `tools` | string | 허용 도구 목록 (쉼표 구분) | 전체 허용 |
| `model` | string | 사용할 Claude 모델 | 메인 세션 모델 |

**사용 가능한 도구 목록:**

| 도구 | 동작 |
|---|---|
| `Read` | 파일 읽기 |
| `Write` | 파일 쓰기/생성 |
| `Edit` | 파일 수정 |
| `Bash` | 터미널 명령 실행 |
| `Grep` | 파일 내 텍스트 검색 |
| `Glob` | 파일 패턴 검색 |
| `WebFetch` | 웹 페이지 조회 |

> 💡 `tools: Read, Grep, Glob` 처럼 읽기 전용 도구만 허용하면 코드 리뷰 에이전트가 실수로 파일을 수정하는 것을 원천 차단합니다. 보안과 토큰 절약 두 가지 효과가 있습니다.

---

## 병렬 vs 순차 실행 판단 기준

에이전트를 여러 개 띄울 때 가장 중요한 판단입니다.

| 조건 | 실행 방식 |
|---|---|
| 작업이 서로 독립적 + 같은 파일 수정 없음 | **병렬 실행** ✅ |
| 이전 결과가 다음 단계에 필요 | **순차 실행** |
| 같은 파일을 두 에이전트가 수정해야 함 | **순차 실행** (충돌 방지) |

**병렬 실행 예시 (독립적인 작업):**
```
백엔드 에이전트: /api 폴더의 라우트 작성
프론트엔드 에이전트: /components 폴더의 UI 컴포넌트 작성
→ 서로 다른 파일을 건드리므로 동시에 진행 가능
```

**순차 실행 예시 (의존성 있는 작업):**
```
1단계: DB 스키마 에이전트 → schema.sql 생성
2단계: API 에이전트 → 1단계 결과를 보고 라우트 작성
→ 2단계가 1단계 결과에 의존하므로 순차 실행 필요
```

---

## 비용 계산 & 절감 팁

서브에이전트는 **각자 별도의 컨텍스트 윈도우**를 사용합니다. 3개 에이전트를 병렬 실행하면 토큰이 최대 3배 소비됩니다.

**모델 분리 전략 (비용 절감 핵심):**

```bash
# 메인 세션: Opus (복잡한 판단, 조율)
# 서브에이전트: Sonnet (실행 작업)
export CLAUDE_CODE_SUBAGENT_MODEL="claude-sonnet-4-5"
```

`.claude/agents/` 파일에서도 모델을 개별 지정할 수 있습니다.

```yaml
---
name: file-scanner
model: claude-haiku-4-5   # 단순 파일 탐색은 Haiku로
tools: Read, Glob
---
```

---

## 실전 활용 예시

### 풀스택 기능 개발

```
메인 세션 (Opus): 요구사항 분석 → 작업 분리 → 결과 통합
  ├── backend-agent (Sonnet): API 라우트, 비즈니스 로직
  └── frontend-agent (Sonnet): React 컴포넌트, 상태 관리
```

### 코드 품질 파이프라인

```
메인 세션: /code-review 커맨드 실행
  ├── lint-agent: ESLint, TypeScript 오류 탐지
  ├── test-agent: 테스트 커버리지 분석
  └── security-agent: 취약점 스캔
```

### 문서화 자동화

```
메인 세션: 변경된 파일 목록 추출
  └── doc-agent (Haiku): 각 파일의 JSDoc 주석 업데이트
```

---

## 주의사항

**서브에이전트가 필요 없는 경우**
단순히 작업을 "더 잘" 하기 위해 에이전트를 추가하는 건 비용 낭비입니다. 작업이 독립적으로 분리될 수 없다면 단일 세션이 훨씬 효율적입니다.

**컨텍스트 공유 불가**
서브에이전트는 메인 세션의 대화 히스토리를 볼 수 없습니다. 필요한 맥락은 front-matter의 시스템 프롬프트나 파일로 전달해야 합니다.

→ WAT 프레임워크 전체 맥락은 [wat-overview.md](./wat-overview.md) 참고
