# 트러블슈팅 (설치 & 초기 세팅)

처음 Claude Code를 설치할 때 자주 마주치는 문제들과 해결법을 정리합니다.

---

## 설치 관련

### `claude: command not found`

네이티브 설치 후 `claude`를 쳤는데 명령어를 찾지 못하는 경우입니다.

```bash
# 설치 경로 확인
which claude
ls ~/.local/bin/claude   # Linux/macOS 기본 설치 경로

# PATH에 추가 (bash)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# PATH에 추가 (zsh, macOS 기본)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### npm 설치 후 권한 오류 `EACCES`

```
❌ sudo npm install -g @anthropic-ai/claude-code  ← 절대 하지 마세요
```

`sudo`로 설치하면 이후 npm 전체가 권한 꼬임 문제로 이어집니다. 올바른 해결법:

```bash
# nvm 사용 (권장)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
npm install -g @anthropic-ai/claude-code
```

### Windows에서 설치 후 실행 안 됨

```powershell
# winget 경로가 PATH에 없는 경우
$env:PATH += ";$env:LOCALAPPDATA\Microsoft\WinGet\Packages"

# PowerShell 실행 정책 문제인 경우
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 로그인 관련

### 브라우저가 자동으로 안 열림

```bash
# 수동으로 로그인 URL 출력
claude auth login --print-url
# 출력된 URL을 브라우저에 직접 붙여넣기
```

### 로그인했는데 "Not authenticated" 오류

```bash
# 로그인 상태 확인
claude auth status

# 로그아웃 후 재로그인
claude auth logout
claude auth login
```

### 회사 네트워크(VPN/프록시)에서 연결 안 됨

```bash
# 프록시 설정
export HTTPS_PROXY=http://your-proxy:port
export HTTP_PROXY=http://your-proxy:port
claude
```

---

## 실행 관련

### 하위 폴더에서 실행했더니 엉뚱한 파일을 수정함

Claude Code는 실행 위치를 루트로 인식합니다. 반드시 프로젝트 최상단에서 실행하세요.

```bash
# 잘못된 예 — /apps/api에서 실행
cd /my-project/apps/api
claude   # ← 프로젝트 전체 구조를 모름

# 올바른 예 — 프로젝트 루트에서 실행
cd /my-project
claude   # ← 전체 구조 파악 가능
```

### 응답이 중간에 멈춤 (타임아웃)

```bash
# 현재 작업 중단
ESC 1번

# 컨텍스트 상태 확인
/context

# 너무 꽉 찬 경우 압축 또는 초기화
/compact   # 핵심 요약만 남기고 압축
/clear     # 완전 초기화
```

### "Context window full" 오류

컨텍스트가 가득 찬 상태입니다. `/compact`로 압축하거나 `/clear` 후 TODO.md를 활용해 맥락을 이어가세요. → [TODO.md 활용법](../03-workflow/todo-md.md)

---

## 버전 및 업데이트

```bash
# 현재 버전 확인
claude --version

# 업데이트
claude update          # 네이티브 설치
npm update -g @anthropic-ai/claude-code   # npm 설치
```

> 💡 자동 메모리(`/memory`) 기능은 **v2.1.59 이상**에서만 지원됩니다. 버전을 먼저 확인하세요.

---

## 그래도 해결이 안 된다면

1. [공식 문서](https://code.claude.com/docs/ko/overview) 확인
2. `claude --debug` 플래그로 실행해서 로그 확인
3. `~/.claude/logs/` 디렉토리에서 최근 로그 파일 확인
