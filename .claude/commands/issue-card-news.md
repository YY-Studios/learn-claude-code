---
description: 이번 주 커뮤니티·유튜브·업데이트 이슈를 가져와 카드뉴스 HTML을 index.md에 업데이트한다
---

## `/issue-card-news` 사용법

```
/issue-card-news
```

인수 없이 실행하면 `YY-Studios/learn-claude-code` 레포에서 아래 3가지 레이블의 최신 이슈를 각 1개씩 가져와 카드뉴스를 생성하고, `index.md`의 `## 📰 이번 주 Claude Code` 섹션을 덮어씁니다.

---

## 실행 순서

### 1. 이슈 수집

아래 명령어로 각 레이블의 최신 이슈 본문을 가져온다.

```bash
gh issue list --repo YY-Studios/learn-claude-code --label claude-code-update --limit 1 --json number,title,body
gh issue list --repo YY-Studios/learn-claude-code --label community-update --limit 1 --json number,title,body
gh issue list --repo YY-Studios/learn-claude-code --label youtube-update --limit 1 --json number,title,body
```

### 2. 내용 요약

각 이슈 본문에서 핵심 내용을 3~5줄로 요약한다.

- **업데이트**: 새 버전 번호, 주요 변경사항
- **커뮤니티**: 주목받은 토픽을 1~2문장으로 풀어 설명하고, 출처 URL을 링크로 표시한다. 같은 주제의 포스트가 여러 개면 **최대 2개** 링크까지 병기한다.
- **유튜브**: 영상 제목은 반드시 **한국어**로 풀어서 쓴다 (원제 직역이 아닌 내용 설명 중심). 각 영상에 URL 링크를 포함한다.

### 3. 카드뉴스 HTML 생성

Update · Community · YouTube 3개 섹션을 **단일 카드**로 생성한다.

**HTML 템플릿 기준:**

- 단일 카드, 최대 너비 600px
- 배경/텍스트: VitePress CSS 변수 사용 (`var(--vp-c-bg)`, `var(--vp-c-text-1)` 등) → 라이트/다크 모드 자동 대응
- 포인트 컬러: 브랜드 그린 `#34a853`
- 유튜브 영상은 `<a href>` 링크로 연결 (`target="_blank" rel="noopener"`)

```html
<div
  style="border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden; margin: 16px 0; max-width: 600px;"
>
  <div
    style="background: #34a853; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center;"
  >
    <span
      style="color: #fff; font-weight: 700; font-size: 14px; letter-spacing: -0.01em;"
      >이번 주 Claude Code</span
    >
    <span style="color: rgba(255,255,255,0.85); font-size: 12px;"
      >YYYY년 M월 N주차</span
    >
  </div>
  <div
    style="padding: 16px 20px; border-bottom: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);"
  >
    <div
      style="font-size: 10px; color: #34a853; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;"
    >
      Update
    </div>
    <div
      style="font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 6px;"
    >
      vX.X.XX 릴리즈
    </div>
    <div style="font-size: 13px; color: var(--vp-c-text-2); line-height: 1.65;">
      ✦ ...<br />
      ✦ ...<br />
      ✦ ...
    </div>
  </div>
  <div
    style="padding: 16px 20px; border-bottom: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);"
  >
    <div
      style="font-size: 10px; color: #34a853; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;"
    >
      이번주 Claude Code 관련 Community 이슈
    </div>
    <div style="font-size: 13px; color: var(--vp-c-text-2); line-height: 1.5;">
      <div style="margin-bottom: 10px;">
        🔥 <strong style="color: var(--vp-c-text-1);">핫토픽 제목</strong> —
        1~2문장 풀어쓴 설명
        <div style="margin-top: 4px;">
          <a
            href="출처URL"
            target="_blank"
            rel="noopener"
            style="font-size: 11px; color: #34a853; text-decoration: none;"
            >↗ 출처 이름</a
          >
        </div>
      </div>
      <div style="margin-bottom: 10px;">
        📉 <strong style="color: var(--vp-c-text-1);">핫토픽 제목</strong> —
        1~2문장 풀어쓴 설명 (같은 주제 링크 2개면 나란히)
        <div
          style="margin-top: 4px; display: flex; gap: 10px; flex-wrap: wrap;"
        >
          <a
            href="출처URL1"
            target="_blank"
            rel="noopener"
            style="font-size: 11px; color: #34a853; text-decoration: none;"
            >↗ 출처1</a
          >
          <a
            href="출처URL2"
            target="_blank"
            rel="noopener"
            style="font-size: 11px; color: #34a853; text-decoration: none;"
            >↗ 출처2</a
          >
        </div>
      </div>
      <div>
        🛠️ <strong style="color: var(--vp-c-text-1);">핫토픽 제목</strong> —
        1~2문장 풀어쓴 설명
        <div style="margin-top: 4px;">
          <a
            href="출처URL"
            target="_blank"
            rel="noopener"
            style="font-size: 11px; color: #34a853; text-decoration: none;"
            >↗ 출처 이름</a
          >
        </div>
      </div>
    </div>
  </div>
  <div style="padding: 16px 20px; background: var(--vp-c-bg);">
    <div
      style="font-size: 10px; color: #34a853; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px;"
    >
      이번주 Claude Code 관련 YouTube Top 3
    </div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <a
        href="https://www.youtube.com/watch?v=..."
        target="_blank"
        rel="noopener"
        style="display: flex; align-items: flex-start; gap: 8px; text-decoration: none; color: inherit;"
      >
        <span
          style="color: #34a853; font-size: 11px; flex-shrink: 0; margin-top: 2px;"
          >▶</span
        >
        <span
          style="font-size: 13px; line-height: 1.4; color: var(--vp-c-text-1);"
          >채널명 — 한국어로 풀어쓴 내용 설명
          <span style="color: var(--vp-c-text-3); font-size: 11px;"
            >XX만 뷰</span
          ></span
        >
      </a>
      <!-- 나머지 2개 동일 구조 -->
    </div>
  </div>
</div>
```

### 4. index.md 업데이트

`index.md`에서 `## 📰 이번 주 Claude Code` 섹션을 찾아, 다음 `##` 헤더 전까지의 내용을 새 카드뉴스 HTML로 교체한다.

교체 후 형식:

```markdown
## 📰 이번 주 Claude Code

<div style="border: 1px solid var(--vp-c-divider); ...">
  ...단일 카드 HTML...
</div>

> 마지막 업데이트: YYYY-MM-DD
```

### 5. 확인

`pnpm dev`를 실행해 메인 페이지에서 카드뉴스가 올바르게 렌더링되는지 확인하도록 안내한다.

---

## 주의사항

- `gh` CLI가 인증되어 있어야 합니다 (`gh auth login`)
- 해당 레이블의 이슈가 없으면 해당 카드는 "이번 주 업데이트 없음"으로 처리합니다
- 매주 실행 시 이전 카드뉴스는 덮어씌워집니다 (히스토리 없음)
