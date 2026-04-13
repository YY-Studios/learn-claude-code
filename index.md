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
    <span style="color: rgba(255,255,255,0.85); font-size: 12px;">2026년 4월 2주차</span>
  </div>
  <div style="padding: 16px 20px; border-bottom: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);">
    <div style="font-size: 10px; color: #34a853; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Update</div>
    <div style="font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 6px;">v2.1.101 릴리즈</div>
    <div style="font-size: 13px; color: var(--vp-c-text-2); line-height: 1.65;">
      ✦ <code style="font-size:12px; background: var(--vp-code-bg); color: #34a853; border-radius: 4px; padding: 1px 5px;">/team-onboarding</code> 명령어 신규 추가<br>
      ✦ OS CA 인증서 스토어 신뢰 기본 옵션 추가 · 원격 세션 자동 클라우드 환경 생성<br>
      ✦ POSIX <code style="font-size:12px; background: var(--vp-code-bg); color: #34a853; border-radius: 4px; padding: 1px 5px;">which</code> 대체 명령어 주입 취약점 보안 수정
    </div>
  </div>
  <div style="padding: 16px 20px; border-bottom: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);">
    <div style="font-size: 10px; color: #34a853; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">이번주 Claude Code 관련 Community 이슈</div>
    <div style="font-size: 13px; color: var(--vp-c-text-2); line-height: 1.5;">
      <div style="margin-bottom: 10px;">
        🔥 <strong style="color: var(--vp-c-text-1);">AMD AI 디렉터 "업데이트 후 더 멍청해졌다"</strong> — 최근 업데이트 이후 Claude Code가 눈에 띄게 느리고 게을러졌다는 AMD AI 디렉터 발언이 업계 주목을 받으며 성능 저하 논란 점화
        <div style="margin-top: 4px;">
          <a href="https://www.theregister.com/2026/04/06/anthropic_claude_code_dumber_lazier_amd_ai_director/" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ The Register</a>
        </div>
      </div>
      <div style="margin-bottom: 10px;">
        📉 <strong style="color: var(--vp-c-text-1);">서비스 장애 & 불투명한 사용량 제한</strong> — API 키 만료·OAuth 타임아웃·500 에러로 서비스가 다운됐으나 공식 상태 페이지에 아무런 공지 없어 불만 확산. 사용량 제한도 측정 기준이 불명확하다는 불만 동시에 제기
        <div style="margin-top: 4px; display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="https://news.ycombinator.com/item?id=47662112" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ HN 장애 스레드</a>
          <a href="https://news.ycombinator.com/item?id=47668813" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ HN 제한 스레드</a>
        </div>
      </div>
      <div>
        🛠️ <strong style="color: var(--vp-c-text-1);">Claude 대안 탐색 활발</strong> — 성능 불만이 쌓이며 Opencode·Zed+OpenRouter 등 대체 도구로 전환하는 사용자 후기가 커뮤니티에서 큰 관심을 받음
        <div style="margin-top: 4px; display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="https://news.ycombinator.com/item?id=47666811" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ HN 대안 토론</a>
          <a href="https://braw.dev/blog/2026-04-06-reallocating-100-month-claude-spend/" target="_blank" rel="noopener" style="font-size: 11px; color: #34a853; text-decoration: none;">↗ Zed 전환 후기</a>
        </div>
      </div>
    </div>
  </div>
  <div style="padding: 16px 20px; background: var(--vp-c-bg);">
    <div style="font-size: 10px; color: #34a853; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px;">이번주 Claude Code 관련 YouTube Top 3</div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <a href="https://www.youtube.com/watch?v=EAaRzLjQiAU" target="_blank" rel="noopener" style="display: flex; align-items: flex-start; gap: 8px; text-decoration: none; color: inherit;">
        <span style="color: #34a853; font-size: 11px; flex-shrink: 0; margin-top: 2px;">▶</span>
        <span style="font-size: 13px; line-height: 1.4; color: var(--vp-c-text-1);">Asmongold TV — AI가 자신의 소스 코드를 직접 유출해버린 사건의 전말 <span style="color: var(--vp-c-text-3); font-size: 11px;">82만 뷰</span></span>
      </a>
      <a href="https://www.youtube.com/watch?v=G4VyivO2jbE" target="_blank" rel="noopener" style="display: flex; align-items: flex-start; gap: 8px; text-decoration: none; color: inherit;">
        <span style="color: #34a853; font-size: 11px; flex-shrink: 0; margin-top: 2px;">▶</span>
        <span style="font-size: 13px; line-height: 1.4; color: var(--vp-c-text-1);">코딩애플 — 클로드코드 소스코드 유출 사건 4분 30초 핵심 요약 <span style="color: var(--vp-c-text-3); font-size: 11px;">22만 뷰</span></span>
      </a>
      <a href="https://www.youtube.com/watch?v=sboNwYmH3AY" target="_blank" rel="noopener" style="display: flex; align-items: flex-start; gap: 8px; text-decoration: none; color: inherit;">
        <span style="color: #34a853; font-size: 11px; flex-shrink: 0; margin-top: 2px;">▶</span>
        <span style="font-size: 13px; line-height: 1.4; color: var(--vp-c-text-1);">Nate Herk | AI Automation — Andrej Karpathy가 공개한 Claude Code 생산성 10배 높이는 설정법 <span style="color: var(--vp-c-text-3); font-size: 11px;">21만 뷰</span></span>
      </a>
    </div>
  </div>
</div>

> 마지막 업데이트: 2026-04-13
