---
title: スキルカタログ
description: Claude Codeコミュニティで検証済みの人気スキル・フック・ルール集。12カテゴリに整理されたリソースカタログ。
---

# スキルカタログ

コミュニティで収集・検証されたスキル、フック、ルールの一覧です。プロジェクトにすぐ活用できるリソースをカテゴリ別に整理しています。

**リサーチソース:** [anthropics/skills](https://github.com/anthropics/skills) · [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) · [obra/superpowers](https://github.com/obra/superpowers) · [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) · [netresearch/git-workflow-skill](https://github.com/netresearch/git-workflow-skill) · [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package)

::: info ステータス基準
- **検討中** — 導入の可否を議論中
- **確定** — 導入決定、未適用
- **適用中** — 実際のプロジェクトで使用中
:::

---

## 1. スタイル/デザイン

UI品質の向上とAI生成デザインからの脱却。

| 名前 | 種類 | 用途 | 出典 | ステータス |
|------|------|------|------|-----------|
| `frontend-design` | skill | AIデザイン脱却、個性的なタイポ・カラー・モーションガイド | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | 検討中 |
| `web-design-guidelines` | skill | アクセシビリティ・パフォーマンス・UX 100+ルール (Vercel公式) | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | 検討中 |
| `tailwindcss` | skill | Tailwind CSS v4 CSSファースト設定、`@theme`、ダークモード | [blencorp/claude-code-kit](https://github.com/blencorp/claude-code-kit) | 検討中 |
| `ui-ux-pro-max` | skill | 50+ UIスタイル、React/Next.js/Tailwindコンポーネント統合 | [claude-plugins.dev](https://claude-plugins.dev/skills) | 検討中 |
| `senior-frontend` | skill | Next.js/TS/Tailwindコンポーネント生成・バンドル分析・a11y | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | 検討中 |

---

## 2. アクセシビリティ/品質

WCAG準拠、コードレビュー自動化、lint設定。

| 名前 | 種類 | 用途 | 出典 | ステータス |
|------|------|------|------|-----------|
| `claude-a11y-skill` | skill | axe-core + eslint-plugin-jsx-a11y WCAG 2.1 AA自動監査 | [airowe/claude-a11y-skill](https://github.com/airowe/claude-a11y-skill) | 検討中 |
| `accessibility-a11y` | skill | WCAG準拠、キーボードナビ、ARIA、フォーカス管理 | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) | 検討中 |
| `lint-changed` | hook | ファイル編集後にBiome/ESLintを自動実行 (PostToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | 検討中 |
| `check-any-changed` | hook | TypeScript `any`型の使用を検知・ブロック (PostToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | 検討中 |
| `requesting-code-review` | skill | 深刻度ベースのコードレビューチェックリスト自動化 | [obra/superpowers](https://github.com/obra/superpowers) | 検討中 |

---

## 3. 開発ワークフロー

コードフォーマット、危険コマンドのブロック、CI自動化。

| 名前 | 種類 | 用途 | 出典 | ステータス |
|------|------|------|------|-----------|
| `typecheck-changed` | hook | 編集ファイルのTypeScript検証 (PostToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | 検討中 |
| `file-guard` | hook | `.env`・SSHキー・クラウド認証情報 195+パターンをブロック (PreToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | 検討中 |
| `typecheck-project` | hook | タスク終了前にプロジェクト全体のTypeScript検証 (Stop) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | 検討中 |
| `writing-plans` | skill | 2〜5分単位のタスク分解、ファイルパス・検証ステップ付き計画 | [obra/superpowers](https://github.com/obra/superpowers) | 検討中 |
| `verification-before-completion` | skill | 完了前に変更内容の強制検証 | [obra/superpowers](https://github.com/obra/superpowers) | 検討中 |

---

## 4. パフォーマンス

バンドル分析、レンダリング最適化。

| 名前 | 種類 | 用途 | 出典 | ステータス |
|------|------|------|------|-----------|
| `vercel-react-best-practices` | skill | ウォーターフォール除去・バンドル最適化・再レンダリング最適化 67ルール | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | 検討中 |
| `react-impl-performance` | skill | React.memo、Profiler、React Compiler、コード分割、仮想化 | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) | 検討中 |
| `frontend-patterns` | skill | メモ化、遅延ロード、仮想化パターン | [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | 検討中 |
| `nextjs-anti-patterns` | skill | Next.jsよくある間違いを検出・修正 (eval通過率 32%→78%) | [wsimmonds/claude-nextjs-skills](https://github.com/wsimmonds/claude-nextjs-skills) | 検討中 |
| `performance-optimization` | skill | 一般的なパフォーマンス最適化ガイドライン | [Mindrally/skills](https://github.com/Mindrally/skills) | 検討中 |

---

## 5. テスト

ユニットテスト・E2Eテストの自動生成。

| 名前 | 種類 | 用途 | 出典 | ステータス |
|------|------|------|------|-----------|
| `test-driven-development` | skill | RED-GREEN-REFACTORサイクルの強制、アンチパターンブロック | [obra/superpowers](https://github.com/obra/superpowers) | 検討中 |
| `webapp-testing` | skill | PlaywrightブラウザでローカルWebアプリUIを検証 (公式) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | 検討中 |
| `react-impl-testing` | skill | React Testing Library + Vitest、user-event、renderHook | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) | 検討中 |
| `playwright-skill` | skill | Playwright E2Eテスト生成・実行 | [lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill) | 検討中 |
| `test-changed` | hook | 編集ファイル関連のテストを自動実行 (PostToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | 検討中 |

---

## 6. Git/PR

コミット規約の適用、PRレビュー自動化。

| 名前 | 種類 | 用途 | 出典 | ステータス |
|------|------|------|------|-----------|
| `git-workflow` | skill | Conventional Commits・GitHub Flow・PR自動化・CI統合 v1.10.0 | [netresearch/git-workflow-skill](https://github.com/netresearch/git-workflow-skill) | 検討中 |
| `using-git-worktrees` | skill | 新しいブランチで隔離された作業環境を作成・検証 | [obra/superpowers](https://github.com/obra/superpowers) | 検討中 |
| `finishing-a-development-branch` | skill | Merge/PR判断とブランチクリーンアップの自動化 | [obra/superpowers](https://github.com/obra/superpowers) | 検討中 |
| `create-checkpoint` | hook | タスク終了時に自動でgitチェックポイントを作成 (Stop) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | 検討中 |
| `requesting-code-review` | skill | 深刻度別の問題レポート、事前セルフレビューチェックリスト | [obra/superpowers](https://github.com/obra/superpowers) | 検討中 |

---

## 7. ドキュメント

README生成、JSDoc自動化、変更ログ管理。

| 名前 | 種類 | 用途 | 出典 | ステータス |
|------|------|------|------|-----------|
| `skill-creator` | skill | Q&A方式のスキルビルド、評価フレームワーク、説明最適化 (公式) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | 検討中 |
| `mcp-builder` | skill | 高品質MCPサーバー生成ガイド (公式) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) | 検討中 |
| `doc-coauthoring` | skill | ドキュメント共同作成・編集ワークフロー (公式) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) | 検討中 |
| `codebase-map` | hook | プロンプト送信時にプロジェクト構造コンテキストを自動注入 (UserPromptSubmit) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | 検討中 |
| `writing-plans` | skill | ファイルパス・検証ステップ付きの詳細実行計画のドキュメント化 | [obra/superpowers](https://github.com/obra/superpowers) | 検討中 |

---

## 8. セキュリティ

依存関係の脆弱性スキャン、シークレットコミット防止。

| 名前 | 種類 | 用途 | 出典 | ステータス |
|------|------|------|------|-----------|
| `file-guard` | hook | 195+パターンでシークレット・認証情報ファイルアクセスをブロック (PreToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | 検討中 |
| `security-best-practices` | skill | OWASP Top 10ベースのアプリケーションセキュリティガイドライン | [Mindrally/skills](https://github.com/Mindrally/skills) | 検討中 |
| `codeql-analysis` | skill | CodeQL静的解析によるコードの脆弱性検出 | [trailofbits/skills](https://github.com/trailofbits/skills) | 検討中 |
| `semgrep-scan` | skill | Semgrepルールベースの静的解析 | [trailofbits/skills](https://github.com/trailofbits/skills) | 検討中 |
| `safe-write-guard` | hook | ファイル書き込み前にパストラバーサル・システムパスの安全性を検証 (PreToolUse) | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 検討中 |

---

## 9. エラーハンドリング

Error Boundaryパターン、APIエラー処理の標準化。

| 名前 | 種類 | 用途 | 出典 | ステータス |
|------|------|------|------|-----------|
| `react-ui-patterns` | skill | エラー階層 (インライン→トースト→バナー→全画面)、無視禁止 | [ChrisWiles/claude-code-showcase](https://github.com/ChrisWiles/claude-code-showcase) | 検討中 |
| `react-errors-boundaries` | skill | Error Boundary、getDerivedStateFromError、リカバリーパターン | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) | 検討中 |
| `react-errors-hooks` | skill | Hookルール違反・ステールクロージャ・無限ループ防止 | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) | 検討中 |
| `react-errors-hydration` | skill | SSRハイドレーションミスマッチのデバッグ、React 19の改善点 | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) | 検討中 |
| `systematic-debugging` | skill | 根本原因追跡4ステップ分析 | [obra/superpowers](https://github.com/obra/superpowers) | 検討中 |

---

## 10. 状態管理

Zustand、TanStack Queryパターンガイド。

| 名前 | 種類 | 用途 | 出典 | ステータス |
|------|------|------|------|-----------|
| `zustand-state-management` | skill | 型安全なグローバル状態、persistミドルウェア、Next.js SSRハイドレーション | [jezweb/claude-skills](https://github.com/jezweb/claude-skills) | 検討中 |
| `react-core-state` | skill | useState vs useReducer vs Context vs Zustand vs TanStack Queryの選択基準 | [OpenAEC-Foundation/React-Claude-Skill-Package](https://github.com/OpenAEC-Foundation/React-Claude-Skill-Package) | 検討中 |
| `tanstack-query` | skill | サーバー状態管理、キャッシング、楽観的更新パターン | [Mindrally/skills](https://github.com/Mindrally/skills) | 検討中 |
| `zod-react-hook-form` | skill | Zodバリデーション + React Hook Form + Server Actions | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) | 検討中 |
| `redux-toolkit` | skill | Redux Toolkitスライス・ミドルウェアパターン | [Mindrally/skills](https://github.com/Mindrally/skills) | 検討中 |

---

## 11. SEO

メタタグ自動化、OG画像生成、sitemap管理。

| 名前 | 種類 | 用途 | 出典 | ステータス |
|------|------|------|------|-----------|
| `claude-seo` | skill | キーワードリサーチ・メタタグ・GA4/GSC統合の完全SEOワークフロー | [ivankuznetsov/claude-seo](https://github.com/ivankuznetsov/claude-seo) | 検討中 |
| `seo-metadata` | skill | 動的メタデータ、hreflang、Open Graphタグ (Next.js App Router) | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) | 検討中 |
| `sitemap-robots` | skill | sitemap・robots.txt・llms.txtの自動生成 | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) | 検討中 |
| `json-ld-schemas` | skill | Schema.org構造化データコンポーネント | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) | 検討中 |
| `seo-best-practices` | skill | 一般的な検索エンジン最適化ガイドライン | [Mindrally/skills](https://github.com/Mindrally/skills) | 検討中 |

---

## 12. デプロイ/インフラ

Vercel設定、環境変数管理。

| 名前 | 種類 | 用途 | 出典 | ステータス |
|------|------|------|------|-----------|
| `vercel-deploy-claimable` | skill | 40+フレームワークのVercel自動デプロイ、package.json自動検出、プレビューURL | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | 検討中 |
| `nextjs-app-router` | skill | Next.js App Routerパターン、Server/Clientコンポーネント、route handlers | [canatufkansu/claude-skills](https://github.com/canatufkansu/claude-skills) | 検討中 |
| `nextjs16-agent-skills` | skill | Next.js 16マイグレーション、非同期params、React 19.2、Turbopack、CVEパッチ | [gocallum/nextjs16-agent-skills](https://github.com/gocallum/nextjs16-agent-skills) | 検討中 |
| `file-guard` | hook | `.env`ファイル保護、環境変数シークレットのコミットをブロック (PreToolUse) | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) | 検討中 |
| `vercel-react-best-practices` | skill | Vercel環境でのSSRキャッシング・バンドル最適化 67ルール | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | 検討中 |

---

## キュレーション TOP 3

コミュニティで最も検証されたスキル3つです。

| スキル | カテゴリ | ローカルパス |
|--------|----------|-------------|
| `test-driven-development` | テスト | [skills/curated/test-driven-development/](../../skills/curated/test-driven-development/) |
| `git-workflow` | Git/PR | [skills/curated/git-workflow/](../../skills/curated/git-workflow/) |
| `react-ui-patterns` | エラーハンドリング / スタイル | [skills/curated/react-ui-patterns/](../../skills/curated/react-ui-patterns/) |
