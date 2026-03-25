# 🤖 learn-claude-code

> Claude Code 실전 학습 가이드 — 설치부터 Supabase 백엔드리스 프로젝트 적용까지

Claude Code를 처음 접하는 개발자를 위한 실전 학습 레포입니다.  
단순한 튜토리얼이 아니라, **실제 프로젝트(타이핑룸)를 만들면서 배운 것들**을 함께 정리합니다.

---

## 📚 목차

### 01. 시작하기
- [설치 방법](./01-getting-started/install.md)
- [기본 명령어 & 단축키](./01-getting-started/basic-commands.md)
- [CLAUDE.md 작성법](./01-getting-started/claude-md.md)

### 02. 컨텍스트 관리 전략
- [CLAUDE.md 계층 구조](./02-context/claude-md-hierarchy.md) — 폴더별 분리, Lazy Loading
- [/memory 자동 메모리](./02-context/memory.md) — Claude가 학습한 내용 자동 저장·로드

### 03. 실전 워크플로우
- [TODO.md 활용](./03-workflow/todo-md.md) — 작업 연속성 유지 & 병렬 처리
- [스크립트 오프로드](./03-workflow/script-offload.md) — 무거운 처리는 스크립트로, 결과 요약만 Claude에게

### 04. 에이전트 & 자동화 (WAT 프레임워크)
- [WAT 프레임워크 개요](./04-agents/wat-overview.md) — Workflows · Agents · Tools
- [커스텀 슬래시 명령어](./04-agents/custom-commands.md) — `.claude/commands/`로 파이프라인 모듈화
- [MCP 연동 & 토큰 관리](./04-agents/mcp.md) — MCP 비활성화, 커스텀 래핑
- [Skills](./04-agents/skills.md) — 재사용 가능한 AI 업무 매뉴얼, 2단계 로딩 **(NEW)**
- [Hooks](./04-agents/hooks.md) — 이벤트 기반 자동화 엔진 **(NEW)**

### 05. 팁 & 주의사항
- [잘 되는 것 / 안 되는 것](./05-tips/dos-and-donts.md)
- [효과적인 지시 패턴](./05-tips/prompt-patterns.md) — `think hard` 활용법
- [다른 AI와 협업](./05-tips/multi-ai.md) — `/export`로 ChatGPT·Gemini에게 피드백 받기

### 06. 실전 패턴 (Supabase)
- [프론트엔드 훅 생성](./06-supabase/frontend-hooks.md) — `@supabase/ssr` 미사용 수동 훅 패턴

### 07. 개발 일지
- [타이핑룸 실전 사례](./07-devlog/README.md)

---

## 🛠 이 레포의 스택

| 영역 | 도구 |
|---|---|
| AI 에이전트 | Claude Code |
| 백엔드 | Supabase (DB + Edge Functions) |
| 문장 생성 | OpenAI API |

---

## 🙋 이런 분께 도움이 돼요

- Claude Code를 처음 써보는 개발자
- Supabase 백엔드리스 프로젝트에 AI 에이전트를 붙여보고 싶은 분
- 직접 써보면서 배우고 싶은 분

---

## ✍️ 기여

배우면서 발견한 내용을 자유롭게 추가해주세요.  
PR 환영합니다!
