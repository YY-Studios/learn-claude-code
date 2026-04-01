![Vercel](https://img.shields.io/badge/vercel-deployed-brightgreen?logo=vercel)
![GitHub last commit](https://img.shields.io/github/last-commit/YY-Studios/learn-claude-code)
![visitors](https://visitor-badge.laobi.icu/badge?page_id=YY-Studios.learn-claude-code)
![License](https://img.shields.io/badge/license-MIT-green)

# 🤖 learn claude code
> Claude Code 실전 학습 가이드 — 설치부터 Supabase 백엔드리스 프로젝트 적용까지

Claude Code를 처음 접하는 개발자를 위한 실전 학습 레포입니다.  
단순한 튜토리얼이 아니라, **실제 프로젝트(타이핑룸)를 만들면서 배운 것들**을 함께 정리합니다.

> 🟢 입문 &nbsp;|&nbsp; 🟡 중급 &nbsp;|&nbsp; 🔴 고급

---

## 📢 최근 업데이트

| 날짜 | 내용 |
|------|------|
| 2026.04.02 | [추천 스킬 카탈로그 추가](./06-resources/skills.md) — 12개 카테고리 |

---

## 📚 목차

### 01. 시작하기
- 🟢 [설치 방법](./01-getting-started/01-install.md)
- 🟢 [기본 명령어 & 단축키](./01-getting-started/02-basic-commands.md)
- 🟢 [CLAUDE.md 작성법](./01-getting-started/03-claude-md.md)
- 🟢 [트러블슈팅](./01-getting-started/04-troubleshooting.md) — 설치/로그인/실행 오류 해결
- 🟢 [보이스모드 사용법](./01-getting-started/05-voice-mode.md) — 보이스 모드 사용법, 관련 트러블슈팅

### 02. 컨텍스트 관리 전략
- 🟡 [CLAUDE.md 계층 구조](./02-context/claude-md-hierarchy.md) — 폴더별 분리, Lazy Loading
- 🟡 [/memory 자동 메모리](./02-context/memory.md) — Claude가 학습한 내용 자동 저장·로드

### 03. 실전 워크플로우
- 🟢 [TODO.md 활용](./03-workflow/todo-md.md) — 작업 연속성 유지 & 병렬 처리
- 🟡 [스크립트 오프로드](./03-workflow/script-offload.md) — 무거운 처리는 스크립트로, 결과 요약만 Claude에게

### 04. Claude 제어 — 동작을 통제하는 것들
- 🗺️ [메커니즘 비교 가이드](./04-claude-control/00-concepts.md) — rules vs hooks vs skills 한눈에 보기
- 🟡 [rules](./04-claude-control/rules.md) — 경로별 규칙, 폴더마다 다른 행동 지침
- 🔴 [Hooks](./04-claude-control/hooks.md) — 이벤트 기반 자동화 엔진, 디버깅 가이드 포함

### 05. Claude 확장 — 기능을 추가하는 것들
- 🟡 [MCP 연동 & 토큰 관리](./05-claude-extend/mcp.md) — MCP 비활성화, 커스텀 래핑
- 🟡 [Skills](./05-claude-extend/skills.md) — 재사용 가능한 AI 업무 매뉴얼, 2단계 로딩
- 🟢 [스킬 찾기 & 설치](./05-claude-extend/find-skills.md) — Skills.sh·Skills.mcp 등 외부 플랫폼, 주의사항
- 🟢 [커스텀 슬래시 명령어](./05-claude-extend/custom-commands.md) — `.claude/commands/`로 파이프라인 모듈화

### 06. 커뮤니티 리소스
- 🟢 [추천 스킬 카탈로그](./06-resources/skills.md) — 12개 카테고리별 스킬 모음

### 07. Claude 구조 — 멀티 에이전트 아키텍처
- 🟡 [WAT 프레임워크 개요](./07-claude-structure/wat-overview.md) — Workflows · Agents · Tools
- 🟡 [Subagents](./07-claude-structure/subagents.md) — 역할 분리, 병렬 처리, 비용 최적화

### 08. 팁 & 주의사항
- 🟢 [잘 되는 것 / 안 되는 것](./08-tips/dos-and-donts.md)
- 🟡 [효과적인 지시 패턴](./08-tips/prompt-patterns.md) — `think hard` 활용법
- 🟡 [비용 최적화 & 토큰 관리](./08-tips/cost-optimization.md) — 어디서 토큰이 새는지 파악하기
- 🟡 [다른 AI와 협업](./08-tips/multi-ai.md) — `/export`로 ChatGPT·Gemini에게 피드백 받기

### 09. 실전 패턴 (Supabase)
- 🟡 [프론트엔드 훅 생성](./09-supabase/frontend-hooks.md) — `@supabase/ssr` 미사용 수동 훅 패턴
- 🟡 [Edge Function 생성 패턴](./09-supabase/edge-functions.md) — Deno 환경 제약 조건 명시
- 🔴 [RLS 정책 작성 패턴](./09-supabase/rls-patterns.md) — 보안 정책 자동화

### 10. 개발 일지
- [타이핑룸 실전 사례](./10-devlog/README.md)

### 11. 템플릿 모음
- 🟢 [CLAUDE.md 템플릿](./11-templates/claude-md-templates.md) — Next.js/Node.js/컴포넌트 라이브러리별
- 🟢 [TODO.md 템플릿](./11-templates/todo-md-templates.md) — 세션 간 연속성 유지용
- 🟡 [Subagent 템플릿](./11-templates/subagent-templates.md) — 코드 리뷰/테스트/DB/문서화 에이전트



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

## 🗺️ 추천 학습 순서

**처음 시작하는 경우 (🟢 입문):**
설치 → 기본 명령어 → CLAUDE.md 작성법 → TODO.md 활용 → 잘 되는 것/안 되는 것

**기본을 익혔다면 (🟡 중급):**
CLAUDE.md 계층 구조 → 스크립트 오프로드 → 메커니즘 비교 가이드 → rules → Skills → WAT 프레임워크 → Subagents

**더 깊이 파고들기 (🔴 고급):**
Hooks → MCP → 비용 최적화 → RLS 패턴 → 다른 AI와 협업

---

## 📎 참고 자료
- [Claude Code 공식 문서](https://docs.anthropic.com/en/docs/claude-code)
- [sv.developer](https://www.youtube.com/@sv.developer) — Claude Code 학습 영상 참고

---

## ✍️ 기여
배우면서 발견한 내용을 자유롭게 추가해주세요.
PR 환영합니다!
