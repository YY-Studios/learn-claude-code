---
title: 추천 스킬 · 훅 · 룰 · 에이전트 모음
description: Claude Code 커뮤니티에서 검증된 인기 스킬·훅·룰 모음. 12개 카테고리로 정리된 리소스 카탈로그.
---

# 추천 스킬 모음

Claude Code 커뮤니티에서 검증된 스킬을카테고리별로 추천합니다.

**리서치 소스:** [anthropics/skills](https://github.com/anthropics/skills) · [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) · [obra/superpowers](https://github.com/obra/superpowers) · [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) · [netresearch/git-workflow-skill](https://github.com/netresearch/git-workflow-skill) · [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package)

---

## 1. 스타일/디자인

UI 품질 향상 및 AI 생성 디자인 탈피.

| 이름 | 종류 | 용도 | 출처 |
|------|------|------|------|
| `frontend-design` | skill | AI 디자인 탈피, 개성 있는 타이포·컬러·모션 가이드 | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) |
| `web-design-guidelines` | skill | 접근성·성능·UX 100+ 규칙 (Vercel 공식) | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) |
| `tailwindcss` | skill | Tailwind CSS v4 CSS-first 설정, `@theme`, 다크모드 | [blencorp/claude-code-kit](https://github.com/blencorp/claude-code-kit) |
| `ui-ux-pro-max` | skill | 50+ UI 스타일, React/Next.js/Tailwind 컴포넌트 통합 | [claude-plugins.dev](https://claude-plugins.dev/skills) |
| `senior-frontend` | skill | Next.js/TS/Tailwind 컴포넌트 생성·번들 분석·a11y | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) |

---

## 2. 접근성/품질

WCAG 준수, 코드 리뷰 자동화, 린트 설정.

| 이름 | 종류 | 용도 | 출처 |
|------|------|------|------|
| `claude-a11y-skill` | skill | axe-core + eslint-plugin-jsx-a11y WCAG 2.1 AA 자동 감사 | [airowe/claude-a11y-skill](https://github.com/airowe/claude-a11y-skill) |
| `accessibility-a11y` | skill | WCAG 준수, 키보드 탐색, ARIA, 포커스 관리 | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) |
| `lint-changed` | hook | 파일 편집 후 Biome/ESLint 자동 실행 (PostToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) |
| `check-any-changed` | hook | TypeScript `any` 타입 사용 감지·차단 (PostToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) |
| `requesting-code-review` | skill | 심각도 기반 코드 리뷰 체크리스트 자동화 | [obra/superpowers](https://github.com/obra/superpowers) |

---

## 3. 개발 워크플로우

코드 포맷팅, 위험 명령 차단, CI 자동화.

| 이름 | 종류 | 용도 | 출처 |
|------|------|------|------|
| `typecheck-changed` | hook | 편집된 파일 TypeScript 검증 (PostToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) |
| `file-guard` | hook | `.env`·SSH키·클라우드 자격증명 195+ 패턴 차단 (PreToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) |
| `typecheck-project` | hook | 작업 종료 전 전체 프로젝트 TypeScript 검증 (Stop) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) |
| `writing-plans` | skill | 2-5분 단위 작업 분해, 파일 경로·검증 단계 포함 계획 수립 | [obra/superpowers](https://github.com/obra/superpowers) |
| `verification-before-completion` | skill | 완료 전 수정 사항 강제 검증 | [obra/superpowers](https://github.com/obra/superpowers) |

---

## 4. 성능

번들 분석, 렌더링 최적화.

| 이름 | 종류 | 용도 | 출처 |
|------|------|------|------|
| `vercel-react-best-practices` | skill | 워터폴 제거·번들 최적화·리렌더링 최적화 67개 규칙 | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) |
| `react-impl-performance` | skill | React.memo, Profiler, React Compiler, 코드 스플리팅, 가상화 | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) |
| `frontend-patterns` | skill | 메모이제이션, 레이지 로딩, 가상화 패턴 | [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) |
| `nextjs-anti-patterns` | skill | Next.js 흔한 실수 감지 및 수정 (eval 통과율 32%→78%) | [wsimmonds/claude-nextjs-skills](https://github.com/wsimmonds/claude-nextjs-skills) |
| `performance-optimization` | skill | 일반 성능 최적화 가이드라인 | [Mindrally/skills](https://github.com/Mindrally/skills) |

---

## 5. 테스트

유닛 테스트 및 E2E 테스트 자동 생성.

| 이름 | 종류 | 용도 | 출처 |
|------|------|------|------|
| `test-driven-development` | skill | RED-GREEN-REFACTOR TDD 사이클 강제화, 안티패턴 차단 | [obra/superpowers](https://github.com/obra/superpowers) |
| `webapp-testing` | skill | Playwright 브라우저 자동화로 로컬 웹앱 UI 검증 (공식) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) |
| `react-impl-testing` | skill | React Testing Library + Vitest, user-event, renderHook | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) |
| `playwright-skill` | skill | Playwright E2E 테스트 생성·실행 | [lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill) |
| `test-changed` | hook | 편집된 파일 관련 테스트 자동 실행 (PostToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) |

---

## 6. Git/PR

커밋 컨벤션 적용, PR 리뷰 자동화.

| 이름 | 종류 | 용도 | 출처 |
|------|------|------|------|
| `git-workflow` | skill | Conventional Commits·GitHub Flow·PR 자동화·CI 통합, v1.10.0 | [netresearch/git-workflow-skill](https://github.com/netresearch/git-workflow-skill) |
| `using-git-worktrees` | skill | 새 브랜치에서 격리된 작업 공간 생성·검증 | [obra/superpowers](https://github.com/obra/superpowers) |
| `finishing-a-development-branch` | skill | Merge/PR 결정 및 브랜치 정리 자동화 | [obra/superpowers](https://github.com/obra/superpowers) |
| `create-checkpoint` | hook | 작업 종료 시 자동 git 체크포인트 생성 (Stop) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) |
| `requesting-code-review` | skill | 심각도별 이슈 보고, 사전 셀프 리뷰 체크리스트 | [obra/superpowers](https://github.com/obra/superpowers) |

---

## 7. 문서화

README 생성, JSDoc 자동화, 변경로그 관리.

| 이름 | 종류 | 용도 | 출처 |
|------|------|------|------|
| `skill-creator` | skill | Q&A 방식 스킬 빌드, 평가 프레임워크, 설명 최적화 (공식) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/skill-creator) |
| `mcp-builder` | skill | 고품질 MCP 서버 생성 가이드 (공식) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) |
| `doc-coauthoring` | skill | 문서 공동 작성·편집 워크플로우 (공식) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) |
| `codebase-map` | hook | 프롬프트 제출 시 프로젝트 구조 컨텍스트 자동 주입 (UserPromptSubmit) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) |
| `writing-plans` | skill | 파일 경로·검증 단계 포함 상세 실행 계획 문서화 | [obra/superpowers](https://github.com/obra/superpowers) |

---

## 8. 보안

의존성 취약점 검사, 시크릿 커밋 방지.

| 이름 | 종류 | 용도 | 출처 |
|------|------|------|------|
| `file-guard` | hook | 195+ 패턴으로 시크릿·자격증명 파일 접근 차단 (PreToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) |
| `security-best-practices` | skill | OWASP Top 10 기반 애플리케이션 보안 가이드라인 | [Mindrally/skills](https://github.com/Mindrally/skills) |
| `codeql-analysis` | skill | CodeQL 정적 분석으로 코드 취약점 탐지 | [trailofbits/skills](https://github.com/trailofbits/skills) |
| `semgrep-scan` | skill | Semgrep 규칙 기반 정적 분석 | [trailofbits/skills](https://github.com/trailofbits/skills) |
| `safe-write-guard` | hook | 파일 작성 전 경로 순회·시스템 경로 안전성 검증 (PreToolUse) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) |

---

## 9. 에러 핸들링

Error Boundary 패턴, API 에러 처리 표준화.

| 이름 | 종류 | 용도 | 출처 |
|------|------|------|------|
| `react-ui-patterns` | skill | 에러 계층 구조 (인라인→토스트→배너→전체화면), 묵인 금지 | [ChrisWiles/claude-code-showcase](https://github.com/ChrisWiles/claude-code-showcase) |
| `react-errors-boundaries` | skill | Error Boundary, getDerivedStateFromError, 복구 패턴 | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) |
| `react-errors-hooks` | skill | Hook 규칙 위반·스테일 클로저·무한 루프 방지 | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) |
| `react-errors-hydration` | skill | SSR 수화 불일치 디버깅, React 19 개선 사항 | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) |
| `systematic-debugging` | skill | 근본 원인 추적 4단계 분석 | [obra/superpowers](https://github.com/obra/superpowers) |

---

## 10. 상태 관리

Zustand, TanStack Query 패턴 가이드.

| 이름 | 종류 | 용도 | 출처 |
|------|------|------|------|
| `zustand-state-management` | skill | 타입 안전 전역 상태, persist 미들웨어, Next.js SSR 수화 패턴 | [jezweb/claude-skills](https://github.com/jezweb/claude-skills) |
| `react-core-state` | skill | useState vs useReducer vs Context vs Zustand vs TanStack Query 선택 기준 | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) |
| `tanstack-query` | skill | 서버 상태 관리, 캐싱, 낙관적 업데이트 패턴 | [Mindrally/skills](https://github.com/Mindrally/skills) |
| `zod-react-hook-form` | skill | Zod 유효성 검사 + React Hook Form + Server Actions | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) |
| `redux-toolkit` | skill | Redux Toolkit 슬라이스·미들웨어 패턴 | [Mindrally/skills](https://github.com/Mindrally/skills) |

---

## 11. SEO

메타 태그 자동화, OG 이미지 생성, sitemap 관리.

| 이름 | 종류 | 용도 | 출처 |
|------|------|------|------|
| `claude-seo` | skill | 키워드 리서치·메타 태그·GA4/GSC 통합 전체 SEO 워크플로우 | [ivankuznetsov/claude-seo](https://github.com/ivankuznetsov/claude-seo) |
| `seo-metadata` | skill | 동적 메타데이터, hreflang, Open Graph 태그 (Next.js App Router) | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) |
| `sitemap-robots` | skill | sitemap·robots.txt·llms.txt 자동 생성 | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) |
| `json-ld-schemas` | skill | Schema.org 구조화 데이터 컴포넌트 | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) |
| `seo-best-practices` | skill | 검색 엔진 최적화 일반 가이드라인 | [Mindrally/skills](https://github.com/Mindrally/skills) |

---

## 12. 배포/인프라

Vercel 설정, 환경 변수 관리.

| 이름 | 종류 | 용도 | 출처 |
|------|------|------|------|
| `vercel-deploy-claimable` | skill | 40+ 프레임워크 Vercel 자동 배포, package.json 자동 감지, 미리보기 URL | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) |
| `nextjs-app-router` | skill | Next.js App Router 패턴, Server/Client 컴포넌트, route handlers | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) |
| `nextjs16-agent-skills` | skill | Next.js 16 마이그레이션, 비동기 params, React 19.2, Turbopack, CVE 패치 | [gocallum/nextjs16-agent-skills](https://github.com/gocallum/nextjs16-agent-skills) |
| `file-guard` | hook | `.env` 파일 보호, 환경 변수 시크릿 커밋 차단 (PreToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) |
| `vercel-react-best-practices` | skill | Vercel 환경 SSR 캐싱·번들 최적화 67개 규칙 | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) |