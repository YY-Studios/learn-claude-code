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
    <span style="color: rgba(255,255,255,0.85); font-size: 12px;">2026년 3월 4주차</span>
  </div>
  <div style="padding: 16px 20px; border-bottom: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);">
    <div style="font-size: 10px; color: #34a853; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Update</div>
    <div style="font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 6px;">v2.1.88 릴리즈</div>
    <div style="font-size: 13px; color: var(--vp-c-text-2); line-height: 1.65;">
      ✦ <code style="font-size:12px; background: var(--vp-code-bg); color: #34a853; border-radius: 4px; padding: 1px 5px;">CLAUDE_CODE_NO_FLICKER</code> 환경 변수 추가<br>
      ✦ PermissionDenied 훅 신규 지원<br>
      ✦ 서브에이전트 이름 지원 · Breaking Changes 없음
    </div>
  </div>
  <div style="padding: 16px 20px; border-bottom: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);">
    <div style="font-size: 10px; color: #34a853; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Community</div>
    <div style="font-size: 13px; color: var(--vp-c-text-2); line-height: 1.5;">
      <div style="margin-bottom: 10px;">
        🔥 <strong style="color: var(--vp-c-text-1);">git reset --hard 버그</strong> — Claude Code가 10분 간격으로 원격 기준 강제 리셋을 실행해 로컬 변경사항을 삭제하는 심각한 오작동이 보고됨
        <div style="margin-top: 4px;"><a href="https://github.com/anthropics/claude-code/issues/40710" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ GitHub 이슈</a></div>
      </div>
      <div style="margin-bottom: 10px;">
        📉 <strong style="color: var(--vp-c-text-1);">사용 한도 급감 &amp; 코드 품질 저하</strong> — 단일 프롬프트만으로 5시간 한도를 소진하는 현상과 코드 생성 품질 저하가 동시에 커뮤니티에서 제기됨
        <div style="margin-top: 4px; display: flex; gap: 10px; flex-wrap: wrap;"><a href="https://news.ycombinator.com/item?id=47531697" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ 한도 이슈</a><a href="https://news.ycombinator.com/item?id=47526097" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ 품질 이슈</a></div>
      </div>
      <div>
        🛠️ <strong style="color: var(--vp-c-text-1);">오픈소스 도구 급부상</strong> — Agent Flow(액션 시각화), Rses(멀티 AI 세션 이어받기), Alumnium(최신 브라우징) 등 Claude Code 생태계 도구가 잇따라 공개됨
        <div style="margin-top: 4px;"><a href="https://github.com/patoles/agent-flow" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ Agent Flow</a></div>
      </div>
    </div>
  </div>
  <div style="padding: 16px 20px; background: var(--vp-c-bg);">
    <div style="font-size: 10px; color: #34a853; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px;">YouTube Top 3</div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <a href="https://www.youtube.com/watch?v=wfeiCZK0mNs" target="_blank" rel="noopener" style="display: flex; align-items: flex-start; gap: 8px; text-decoration: none; color: inherit;">
        <span style="color: #34a853; font-size: 11px; flex-shrink: 0; margin-top: 2px;">▶</span>
        <span style="font-size: 13px; line-height: 1.4; color: var(--vp-c-text-1);">Fireship — Anthropic이 진짜 Claude 봇을 드디어 출시했다, 게임 체인저인가 과대광고인가 <span style="color: var(--vp-c-text-3); font-size: 11px;">87만 뷰</span></span>
      </a>
      <a href="https://www.youtube.com/watch?v=WKv6VnfNeT4" target="_blank" rel="noopener" style="display: flex; align-items: flex-start; gap: 8px; text-decoration: none; color: inherit;">
        <span style="color: #34a853; font-size: 11px; flex-shrink: 0; margin-top: 2px;">▶</span>
        <span style="font-size: 13px; line-height: 1.4; color: var(--vp-c-text-1);">FatherPhi — Claude야 포켓몬 게임 만들어줘, 실수는 용납 안 해 <span style="color: var(--vp-c-text-3); font-size: 11px;">16만 뷰</span></span>
      </a>
      <a href="https://www.youtube.com/watch?v=uUGfo8QOsW0" target="_blank" rel="noopener" style="display: flex; align-items: flex-start; gap: 8px; text-decoration: none; color: inherit;">
        <span style="color: #34a853; font-size: 11px; flex-shrink: 0; margin-top: 2px;">▶</span>
        <span style="font-size: 13px; line-height: 1.4; color: var(--vp-c-text-1);">WorldofAI — Claude Mythos 5 유출, 역대 가장 강력한 모델 AGI·Codex 플러그인 포함 <span style="color: var(--vp-c-text-3); font-size: 11px;">15만 뷰</span></span>
      </a>
    </div>
  </div>
</div>

> 마지막 업데이트: 2026-04-01
