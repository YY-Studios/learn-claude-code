---
title: Skill Catalog
description: A curated collection of popular skills, hooks, and rules from the Claude Code community. Organized into 12 categories.
---

# Skill Catalog

A collection of community-validated skills, hooks, and rules. Resources organized by category that you can apply directly to your projects.

**Research sources:** [anthropics/skills](https://github.com/anthropics/skills) · [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) · [obra/superpowers](https://github.com/obra/superpowers) · [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) · [netresearch/git-workflow-skill](https://github.com/netresearch/git-workflow-skill) · [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package)

::: info Status Legend
- **reviewing** — Under discussion for adoption
- **confirmed** — Decided to adopt, not yet applied
- **active** — Currently in use on real projects
:::

---

## 1. Style/Design

Improve UI quality and move beyond generic AI-generated designs.

| Name | Type | Purpose | Source | Status |
|------|------|---------|--------|--------|
| `frontend-design` | skill | Escape AI design, guide for distinctive typography, color, and motion | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | reviewing |
| `web-design-guidelines` | skill | 100+ rules for accessibility, performance, and UX (Vercel official) | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | reviewing |
| `tailwindcss` | skill | Tailwind CSS v4 CSS-first config, `@theme`, dark mode | [blencorp/claude-code-kit](https://github.com/blencorp/claude-code-kit) | reviewing |
| `ui-ux-pro-max` | skill | 50+ UI styles, React/Next.js/Tailwind component integration | [claude-plugins.dev](https://claude-plugins.dev/skills) | reviewing |
| `senior-frontend` | skill | Next.js/TS/Tailwind component generation, bundle analysis, a11y | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | reviewing |

---

## 2. Accessibility/Quality

WCAG compliance, automated code review, lint setup.

| Name | Type | Purpose | Source | Status |
|------|------|---------|--------|--------|
| `claude-a11y-skill` | skill | Automated WCAG 2.1 AA audit with axe-core + eslint-plugin-jsx-a11y | [airowe/claude-a11y-skill](https://github.com/airowe/claude-a11y-skill) | reviewing |
| `accessibility-a11y` | skill | WCAG compliance, keyboard navigation, ARIA, focus management | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) | reviewing |
| `lint-changed` | hook | Auto-run Biome/ESLint after file edits (PostToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | reviewing |
| `check-any-changed` | hook | Detect and block TypeScript `any` usage (PostToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | reviewing |
| `requesting-code-review` | skill | Severity-based code review checklist automation | [obra/superpowers](https://github.com/obra/superpowers) | reviewing |

---

## 3. Development Workflow

Code formatting, dangerous command blocking, CI automation.

| Name | Type | Purpose | Source | Status |
|------|------|---------|--------|--------|
| `typecheck-changed` | hook | TypeScript validation on edited files (PostToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | reviewing |
| `file-guard` | hook | Block access to secrets and credentials with 195+ patterns (PreToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | reviewing |
| `typecheck-project` | hook | Full project TypeScript validation before task completion (Stop) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | reviewing |
| `writing-plans` | skill | Task decomposition into 2-5 minute steps with file paths and verification | [obra/superpowers](https://github.com/obra/superpowers) | reviewing |
| `verification-before-completion` | skill | Force verification of changes before marking complete | [obra/superpowers](https://github.com/obra/superpowers) | reviewing |

---

## 4. Performance

Bundle analysis, rendering optimization.

| Name | Type | Purpose | Source | Status |
|------|------|---------|--------|--------|
| `vercel-react-best-practices` | skill | 67 rules for eliminating waterfalls, bundle optimization, re-render optimization | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | reviewing |
| `react-impl-performance` | skill | React.memo, Profiler, React Compiler, code splitting, virtualization | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) | reviewing |
| `frontend-patterns` | skill | Memoization, lazy loading, virtualization patterns | [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | reviewing |
| `nextjs-anti-patterns` | skill | Detect and fix common Next.js mistakes (eval pass rate 32%→78%) | [wsimmonds/claude-nextjs-skills](https://github.com/wsimmonds/claude-nextjs-skills) | reviewing |
| `performance-optimization` | skill | General performance optimization guidelines | [Mindrally/skills](https://github.com/Mindrally/skills) | reviewing |

---

## 5. Testing

Auto-generate unit and E2E tests.

| Name | Type | Purpose | Source | Status |
|------|------|---------|--------|--------|
| `test-driven-development` | skill | Enforce RED-GREEN-REFACTOR TDD cycle, block anti-patterns | [obra/superpowers](https://github.com/obra/superpowers) | reviewing |
| `webapp-testing` | skill | Local web app UI verification via Playwright browser automation (official) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | reviewing |
| `react-impl-testing` | skill | React Testing Library + Vitest, user-event, renderHook | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) | reviewing |
| `playwright-skill` | skill | Playwright E2E test generation and execution | [lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill) | reviewing |
| `test-changed` | hook | Auto-run tests related to edited files (PostToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | reviewing |

---

## 6. Git/PR

Commit convention enforcement, PR review automation.

| Name | Type | Purpose | Source | Status |
|------|------|---------|--------|--------|
| `git-workflow` | skill | Conventional Commits, GitHub Flow, PR automation, CI integration, v1.10.0 | [netresearch/git-workflow-skill](https://github.com/netresearch/git-workflow-skill) | reviewing |
| `using-git-worktrees` | skill | Create and validate isolated workspaces on new branches | [obra/superpowers](https://github.com/obra/superpowers) | reviewing |
| `finishing-a-development-branch` | skill | Automate merge/PR decisions and branch cleanup | [obra/superpowers](https://github.com/obra/superpowers) | reviewing |
| `create-checkpoint` | hook | Auto-create git checkpoint on task stop (Stop) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | reviewing |
| `requesting-code-review` | skill | Severity-based issue reporting, pre-submit self-review checklist | [obra/superpowers](https://github.com/obra/superpowers) | reviewing |

---

## 7. Documentation

README generation, JSDoc automation, changelog management.

| Name | Type | Purpose | Source | Status |
|------|------|---------|--------|--------|
| `skill-creator` | skill | Q&A-driven skill building, evaluation framework, description optimization (official) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | reviewing |
| `mcp-builder` | skill | Guide for building high-quality MCP servers (official) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) | reviewing |
| `doc-coauthoring` | skill | Document co-authoring and editing workflow (official) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) | reviewing |
| `codebase-map` | hook | Auto-inject project structure context on prompt submit (UserPromptSubmit) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | reviewing |
| `writing-plans` | skill | Detailed execution plan documentation with file paths and verification steps | [obra/superpowers](https://github.com/obra/superpowers) | reviewing |

---

## 8. Security

Dependency vulnerability scanning, secret commit prevention.

| Name | Type | Purpose | Source | Status |
|------|------|---------|--------|--------|
| `file-guard` | hook | Block access to secrets and credentials with 195+ patterns (PreToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | reviewing |
| `security-best-practices` | skill | Application security guidelines based on OWASP Top 10 | [Mindrally/skills](https://github.com/Mindrally/skills) | reviewing |
| `codeql-analysis` | skill | Static code vulnerability detection via CodeQL | [trailofbits/skills](https://github.com/trailofbits/skills) | reviewing |
| `semgrep-scan` | skill | Rule-based static analysis with Semgrep | [trailofbits/skills](https://github.com/trailofbits/skills) | reviewing |
| `safe-write-guard` | hook | Validate path traversal and system path safety before file writes (PreToolUse) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | reviewing |

---

## 9. Error Handling

Error Boundary patterns, API error handling standardization.

| Name | Type | Purpose | Source | Status |
|------|------|---------|--------|--------|
| `react-ui-patterns` | skill | Error hierarchy (inline→toast→banner→fullscreen), no silent failures | [ChrisWiles/claude-code-showcase](https://github.com/ChrisWiles/claude-code-showcase) | reviewing |
| `react-errors-boundaries` | skill | Error Boundary, getDerivedStateFromError, recovery patterns | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) | reviewing |
| `react-errors-hooks` | skill | Prevent hook rule violations, stale closures, infinite loops | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) | reviewing |
| `react-errors-hydration` | skill | Debug SSR hydration mismatches, React 19 improvements | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) | reviewing |
| `systematic-debugging` | skill | 4-step root cause analysis | [obra/superpowers](https://github.com/obra/superpowers) | reviewing |

---

## 10. State Management

Zustand, TanStack Query pattern guides.

| Name | Type | Purpose | Source | Status |
|------|------|---------|--------|--------|
| `zustand-state-management` | skill | Type-safe global state, persist middleware, Next.js SSR hydration | [jezweb/claude-skills](https://github.com/jezweb/claude-skills) | reviewing |
| `react-core-state` | skill | Criteria for choosing useState vs useReducer vs Context vs Zustand vs TanStack Query | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) | reviewing |
| `tanstack-query` | skill | Server state management, caching, optimistic update patterns | [Mindrally/skills](https://github.com/Mindrally/skills) | reviewing |
| `zod-react-hook-form` | skill | Zod validation + React Hook Form + Server Actions | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) | reviewing |
| `redux-toolkit` | skill | Redux Toolkit slice and middleware patterns | [Mindrally/skills](https://github.com/Mindrally/skills) | reviewing |

---

## 11. SEO

Meta tag automation, OG image generation, sitemap management.

| Name | Type | Purpose | Source | Status |
|------|------|---------|--------|--------|
| `claude-seo` | skill | Full SEO workflow: keyword research, meta tags, GA4/GSC integration | [ivankuznetsov/claude-seo](https://github.com/ivankuznetsov/claude-seo) | reviewing |
| `seo-metadata` | skill | Dynamic metadata, hreflang, Open Graph tags (Next.js App Router) | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) | reviewing |
| `sitemap-robots` | skill | Auto-generate sitemap, robots.txt, and llms.txt | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) | reviewing |
| `json-ld-schemas` | skill | Schema.org structured data components | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) | reviewing |
| `seo-best-practices` | skill | General search engine optimization guidelines | [Mindrally/skills](https://github.com/Mindrally/skills) | reviewing |

---

## 12. Deployment/Infrastructure

Vercel configuration, environment variable management.

| Name | Type | Purpose | Source | Status |
|------|------|---------|--------|--------|
| `vercel-deploy-claimable` | skill | Auto-deploy to Vercel for 40+ frameworks, auto-detect package.json, preview URLs | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | reviewing |
| `nextjs-app-router` | skill | Next.js App Router patterns, Server/Client components, route handlers | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) | reviewing |
| `nextjs16-agent-skills` | skill | Next.js 16 migration, async params, React 19.2, Turbopack, CVE patches | [gocallum/nextjs16-agent-skills](https://github.com/gocallum/nextjs16-agent-skills) | reviewing |
| `file-guard` | hook | Protect `.env` files, block environment variable secret commits (PreToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | reviewing |
| `vercel-react-best-practices` | skill | 67 rules for SSR caching and bundle optimization in Vercel environments | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | reviewing |

---

## Curated TOP 3

The three most community-validated skills.

| Skill | Category | Local Path |
|-------|----------|------------|
| `test-driven-development` | Testing | [skills/curated/test-driven-development/](../../skills/curated/test-driven-development/) |
| `git-workflow` | Git/PR | [skills/curated/git-workflow/](../../skills/curated/git-workflow/) |
| `react-ui-patterns` | Error Handling / Style | [skills/curated/react-ui-patterns/](../../skills/curated/react-ui-patterns/) |
