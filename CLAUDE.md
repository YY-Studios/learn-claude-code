# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Korean-language educational documentation site about Claude Code best practices, built with VitePress. It teaches AI agent development patterns, context management, workflows, and Supabase integration.

## Commands

```bash
pnpm dev        # Start local dev server with hot reload
pnpm build      # Build static site to .vitepress/dist/
pnpm preview    # Preview production build locally
```

## Architecture

### Content Organization

Documentation lives in numbered top-level directories (`01-getting-started/`, `02-context/`, etc.). VitePress auto-generates the sidebar by reading these directories — the numbering controls display order, and H1 headers become navigation titles.

The sidebar generation logic is in `.vitepress/config.js`: it reads directory prefixes, extracts H1 titles from markdown files, and strips emoji characters for display.

### Deployment

Two deployment targets configured:
- **Vercel** (primary): detected via `VERCEL` env var, uses root base path, `vercel.json` sets output to `.vitepress/dist/`
- **GitHub Pages** (fallback): uses `/learn-claude-code/` base path via `deploy.yml`

The base path switch in `.vitepress/config.js` is automatic based on the `VERCEL` environment variable.

### Theme & Styling

Custom theme in `.vitepress/theme/`:
- `index.js` — extends VitePress default theme, injects Vercel Analytics and Speed Insights
- `custom.css` — brand color green `#34a853`, Pretendard font, IBM Plex Mono for code blocks

### Automated Tracking

`.github/workflows/claude-code-tracker.yml` runs every 2 days to monitor Claude Code GitHub releases, uses GPT-4o to analyze release notes, and creates GitHub issues for significant updates (breaking changes, new features, security fixes). This workflow requires `GITHUB_TOKEN` and `OPENAI_API_KEY` secrets.

## Content Conventions

- All documents use YAML frontmatter with `title` and `description` for SEO
- Difficulty markers: 🟢 beginner, 🟡 intermediate, 🔴 advanced
- Korean language throughout (`lang: ko-KR`)
- PR template requires: personal experience validation, working code examples, spellcheck

## Adding New Content

1. Create a new `.md` file inside an existing numbered directory (or a new `NN-name/` directory)
2. Add YAML frontmatter (`title`, `description`)
3. Start with an H1 header — this becomes the sidebar title
4. The sidebar updates automatically on next build; no manual config changes needed
