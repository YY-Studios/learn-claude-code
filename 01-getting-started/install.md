# 설치 방법

> 📖 공식 문서: [code.claude.com/docs/ko](https://code.claude.com/docs/ko/overview)

---

## 1. 요금제 선택

Claude Code를 사용하려면 **Pro 플랜 이상** 필수입니다. 무료 플랜으로는 사용이 불가합니다.

| 플랜 | 가격 | 추천 대상 |
|---|---|---|
| Pro | $20/월 | 처음 시작하는 경우 |
| Max | $100/월~ | 사용량이 많아졌을 때 |
| Teams / Enterprise | 별도 | 팀 단위 |

> 💡 프로로 시작해서 사용량에 맞게 업그레이드하는 걸 추천합니다.

---

## 2. 설치

### ✅ 권장 방법 — 네이티브 설치 (Node.js 불필요)

공식 권장 방법으로, 별도의 Node.js 설치 없이 터미널 명령어 한 줄로 설치 가능합니다. 백그라운드 자동 업데이트도 지원합니다.

**macOS / Linux**
```bash
curl -fsSL https://claude.ai/install.sh | sh
```

**Windows**
```bash
winget install Anthropic.ClaudeCode
```

> ⚠️ WinGet 설치는 자동 업데이트가 되지 않습니다. 주기적으로 `winget upgrade Anthropic.ClaudeCode`를 실행하세요.

---

### npm으로 설치하는 경우 (레거시)

> ⚠️ 공식 문서에서 npm 설치는 deprecated(더 이상 권장하지 않는) 방식으로 분류됩니다. 신규 설치라면 네이티브 설치를 먼저 고려하세요.

Node.js 환경이 이미 세팅되어 있고 npm으로 관리하고 싶다면 사용 가능합니다.

```bash
npm install -g @anthropic-ai/claude-code
```

---

## 3. Claude Code 처음 시작하기

### 방법 1 — 터미널에서 직접 실행

프로젝트 폴더로 이동한 뒤 `claude`를 입력합니다.

```bash
cd 내-프로젝트-폴더
claude
```

### 방법 2 — VS Code 확장 프로그램으로 실행

1. VS Code 확장 마켓플레이스에서 `Claude Code for VS Code` 검색 후 설치
2. 설치 완료 후 우측 상단 아이콘 클릭

> ![Claude Code VS Code 아이콘](https://github.com/user-attachments/assets/a7aff01c-562f-4086-9cd4-5745d42290af)

---

## 4. 로그인

처음 실행하면 브라우저가 자동으로 열리며 로그인을 요청합니다. claude.ai 계정으로 로그인하면 바로 사용 가능합니다.

---

> 💡 **다음 단계:** 프로젝트 루트에 `CLAUDE.md` 파일을 만드세요. → [CLAUDE.md 작성법](./claude-md.md)
