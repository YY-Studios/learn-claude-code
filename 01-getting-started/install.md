# 설치 방법

## 1. 요금제 선택 및 설치

- **프로(Pro) 플랜 이상 필수:** 클로드 코드를 터미널에서 본격적인 개발 용도로 사용하려면 무료 플랜으로는 불가능하며, 반드시 월 20달러의 프로(Pro) 플랜 이상을 구독해야 합니다. 프로 플랜으로 시작해 사용량에 맞춰 점진적으로 맥스(Max) 플랜 등으로 업그레이드하는 것을 추천합니다.

- **간편한 설치:** 공식 홈페이지에서 제공하는 OS별(Mac/Windows) 명령어를 복사해 VS Code 터미널에 붙여넣기만 하면 설치가 끝납니다. 터미널에서 `claude`를 입력해 바로 실행하거나, VS Code 확장 프로그램인 'Claude Code for VS Code'를 설치해 우측 상단 아이콘을 클릭하여 사용할 수도 있습니다.



---

## 2. 터미널 기본 세팅 (처음이라면)

터미널이 익숙하지 않다면 아래 순서로 먼저 세팅해두면 편해요.

### VS Code 터미널 열기

VS Code 상단 메뉴 → `Terminal` → `New Terminal` (단축키: `` Ctrl + ` ``)

### Node.js 설치 확인

Claude Code 실행에 Node.js가 필요합니다. 터미널에 아래 명령어를 입력해 확인하세요.

```bash
node -v
```

버전 번호가 뜨면 설치된 것입니다. 안 뜨면 [nodejs.org](https://nodejs.org)에서 LTS 버전을 설치하세요.

### Claude Code 설치

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

> ![Claude Code 설치 화면](https://github.com/user-attachments/assets/a7aff01c-562f-4086-9cd4-5745d42290af)


---

## 4. 로그인

처음 실행하면 로그인을 요청합니다. claude.ai 계정으로 로그인하면 바로 사용 가능합니다.

---

> 💡 **팁:** 설치 후 처음 할 일은 프로젝트 루트에 `CLAUDE.md` 파일을 만드는 것입니다. → [CLAUDE.md 작성법](./claude-md.md) 참고
