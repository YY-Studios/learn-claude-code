---
title: learn claude code - Claude Code 실전 학습 가이드
description: Claude Code 설치부터 Supabase 백엔드리스 프로젝트 적용까지. 실전 프로젝트(타이핑룸)로 배우는 AI 에이전트 활용법. 입문부터 고급까지 단계별 가이드 제공.
head:
  - - meta
    - name: keywords
      content: Claude Code, Claude AI, AI 에이전트, Supabase, 백엔드리스, 개발 가이드, 한국어 튜토리얼
  - - meta
    - property: og:title
      content: learn claude code - Claude Code 실전 학습 가이드
  - - meta
    - property: og:description
      content: 설치부터 실전 프로젝트 적용까지, 단계별로 배우는 Claude Code 완전 가이드
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:url
      content: https://learn-claude-code-neon.vercel.app/
---

# learn claude code

> Claude Code 실전 학습 한국어 가이드 — 설치부터 Supabase 백엔드리스 프로젝트 적용까지

Claude Code를 처음 접하는 개발자를 위한 실전 학습 레포입니다.
실제 프로젝트(타이핑룸)를 만들면서 배운 것들을 함께 정리합니다.

🤖 Claude Code 공식 업데이트를 2일마다 감지해 이슈로 안내합니다.  
✍️ 학습하며 발견한 내용은 자유롭게 추가해 주세요. PR도 환영합니다.

## 📢 최근 업데이트

| 날짜 | 내용 |
|------|------|
| 2026.04.01 | [스킬 찾기 & 설치](./05-claude-extend/find-skills) — 외부 플랫폼에서 스킬 가져오는 법 |
| 2026.04.01 | [추천 스킬 카탈로그](./06-resources/skills) — 12개 카테고리별 스킬 모음 |

## 📰 이번 주 Claude Code

<div style="border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden; margin: 16px 0; max-width: 600px;">
  <div style="background: #34a853; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center;">
    <span style="color: #fff; font-weight: 700; font-size: 14px; letter-spacing: -0.01em;">이번 주 Claude Code</span>
    <span style="color: rgba(255,255,255,0.85); font-size: 12px;">2026년 4월 1주차</span>
  </div>
  <div style="padding: 16px 20px; border-bottom: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);">
    <div style="font-size: 10px; color: #34a853; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Update</div>
    <div style="font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 6px;">v2.1.89 릴리즈</div>
    <div style="font-size: 13px; color: var(--vp-c-text-2); line-height: 1.65;">
      ✦ <code style="font-size:12px; background: var(--vp-code-bg); color: #34a853; border-radius: 4px; padding: 1px 5px;">defer</code> 권한 결정 옵션 신규 추가<br>
      ✦ <code style="font-size:12px; background: var(--vp-code-bg); color: #34a853; border-radius: 4px; padding: 1px 5px;">CLAUDE_CODE_NO_FLICKER=1</code> 환경 변수 추가<br>
      ✦ 다양한 버그 수정 및 성능 향상 · Breaking Changes 없음
    </div>
  </div>
  <div style="padding: 16px 20px; border-bottom: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);">
    <div style="font-size: 10px; color: #34a853; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">이번주 Claude Code 관련 Community 이슈</div>
    <div style="font-size: 13px; color: var(--vp-c-text-2); line-height: 1.5;">
      <div style="margin-bottom: 10px;">
        🔥 <strong style="color: var(--vp-c-text-1);">소스 코드 NPM 유출</strong> — NPM 맵 파일을 통해 Claude Code 내부 코드가 노출, 가짜 도구·좌절 정규식·비밀 모드 등 숨겨진 구현이 공개되며 커뮤니티 폭발
        <div style="margin-top: 4px; display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="https://alex000kim.com/posts/2026-03-31-claude-code-source-leak/" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ 분석 글</a>
          <a href="https://ccunpacked.dev/" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ 시각화 가이드</a>
        </div>
      </div>
      <div style="margin-bottom: 10px;">
        📉 <strong style="color: var(--vp-c-text-1);">예상보다 빠른 사용량 제한</strong> — 사용자들이 기대보다 훨씬 빠르게 사용 한도에 도달한다고 보고, 서비스 정책에 대한 불만이 커뮤니티에서 확산
        <div style="margin-top: 4px;"><a href="https://www.theregister.com/2026/03/31/anthropic_claude_code_limits/" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ The Register</a></div>
      </div>
      <div>
        🐛 <strong style="color: var(--vp-c-text-1);">API 비용 10~20배 증가 버그</strong> — 캐시 버그 두 가지로 인해 API 비용이 사용자 모르게 10~20배 폭증할 수 있다는 PSA가 공유되며 주의 촉구
        <div style="margin-top: 4px;"><a href="https://old.reddit.com/r/ClaudeCode/comments/1s7mitf/psa_claude_code_has_two_cache_bugs_that_can" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ Reddit PSA</a></div>
      </div>
    </div>
  </div>
  <div style="padding: 16px 20px; background: var(--vp-c-bg);">
    <div style="font-size: 10px; color: #34a853; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px;">이번주 Claude Code 관련 YouTube Top 3</div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <a href="https://www.youtube.com/watch?v=GdgRpiQRsis" target="_blank" rel="noopener" style="display: flex; align-items: flex-start; gap: 8px; text-decoration: none; color: inherit;">
        <span style="color: #34a853; font-size: 11px; flex-shrink: 0; margin-top: 2px;">▶</span>
        <span style="font-size: 13px; line-height: 1.4; color: var(--vp-c-text-1);">The PrimeTime — Claude Code 소스 코드 유출 사건 분석, NPM 맵 파일로 내부 코드가 노출된 경위와 파장 <span style="color: var(--vp-c-text-3); font-size: 11px;">16만 뷰</span></span>
      </a>
    </div>
  </div>
</div>

> 마지막 업데이트: 2026-04-01
