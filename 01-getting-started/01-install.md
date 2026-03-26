# 설치 방법

> 📖 공식 문서: [code.claude.com/docs/ko](https://code.claude.com/docs/ko/overview)

---

## 1. 요금제 선택

Claude Code를 사용하려면 **Pro 플랜 이상** 필수입니다. 무료 플랜으로는 사용이 불가합니다.

| 플랜 | 가격 | 추천 대상 |
|---|---|---|
| Pro | $20/월 | 처음 시작하는 경우 |
| Max 5× | $100/월 | 사용량이 늘었을 때 (Pro 대비 5배 한도) |
| Max 20× | $200/월 | 헤비 유저 / 장시간 에이전트 실행 |
| Teams | $30/인/월 (최소 5인) | 팀 단위, 공유 컨텍스트 필요 시 |
| Enterprise | 별도 문의 | 대규모 조직 |

> 💡 Pro로 시작해서 `/context`로 토큰 사용량을 모니터링하다가 한도를 자주 넘기면 Max로 업그레이드하는 걸 추천합니다.

---

## 2. 설치

### ✅ 권장 방법 — 네이티브 설치

공식 권장 방법입니다. 별도의 Node.js 설치 없이 터미널 명령어 한 줄로 설치 가능하며, 백그라운드 자동 업데이트를 지원합니다.

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

Node.js 18+ 환경이 이미 세팅되어 있고 npm으로 관리하고 싶다면 사용 가능합니다.

```bash
npm install -g @anthropic-ai/claude-code
```

**설치 확인:**
```bash
claude --version
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

> ⚠️ **반드시 프로젝트 루트 디렉토리에서 실행하세요.** 하위 폴더(예: `/apps/api`)에서 실행하면 프로젝트 전체 구조를 읽지 못해 엉뚱한 파일을 생성하거나 찾지 못하는 문제가 발생합니다.

---

## 4. 로그인

처음 실행하면 브라우저가 자동으로 열리며 로그인을 요청합니다. claude.ai 계정으로 로그인하면 바로 사용 가능합니다.

---

## 5. 업데이트

```bash
# 네이티브 설치 (자동 업데이트됨, 수동으로 확인하려면)
claude update

# npm 설치의 경우
npm update -g @anthropic-ai/claude-code

# Windows winget
winget upgrade Anthropic.ClaudeCode
```

---

> 💡 **다음 단계:** 설치 중 문제가 생겼다면 → [트러블슈팅](./04-troubleshooting.md)  
> 정상 설치됐다면 → [CLAUDE.md 작성법](./03-claude-md.md)으로 넘어가세요.
