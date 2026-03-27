# Hooks (자동화 엔진)

훅은 **특정 이벤트가 발생할 때 지정된 액션을 자동으로 실행해주는 엔진**입니다.
"Claude가 파일을 수정할 때마다 자동으로 린트를 돌린다"처럼, 사람이 반복하던 후처리 작업을 자동화할 수 있습니다.

---
title: Claude Code Hooks - 이벤트 기반 자동화
description: git commit, 파일 저장 시 자동 실행되는 Hooks. TaskCreated, FileSaved 등 이벤트 기반 워크플로우 자동화 가이드.
---

> 💡 **프롬프트보다 훅이 더 신뢰할 수 있습니다.**
> "린트 꼭 돌려줘"라고 프롬프트로 지시하면 Claude가 잊을 수 있지만, 훅은 모델 동작과 관계없이 **무조건 실행**됩니다.

---

## 동작 흐름

```
이벤트 발생 → Matcher(조건 검사) → 커맨드(액션) 실행
```

---

## 4가지 이벤트 타입

| 이벤트 | 실행 시점 | 주요 용도 |
|---|---|---|
| **PreToolUse** | 도구 호출 직전 | 입력값 검증, 위험한 명령 차단 |
| **PostToolUse** | 도구 실행 직후 | 린트, 포맷팅 등 후처리 |
| **Notification** | Claude가 응답 대기 중 | 알림 전송, 로깅 |
| **Stop** | 에이전트 턴 종료 시 | 최종 정리, 보고서 생성 |

---

## 훅 만들기

Claude에게 자연어로 요청하면 `.claude/settings.json`에 자동으로 추가해줍니다.

```
"파일 수정 후 자동으로 eslint 실행하는 훅 만들어줘"
"작업 완료 시 맥OS 알림 소리 재생하는 훅 만들어줘"
"rm -rf 명령을 실행하기 전에 경고를 출력하는 훅 만들어줘"
```

---

## 훅 구조 예시

```json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint --fix",
            "timeout": 10
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Glass.aiff",
            "timeout": 5
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'rm -rf' && echo 'BLOCKED: rm -rf 감지' && exit 1 || exit 0",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
```

---

## ⚠️ 주의사항

**타임아웃 필수**

훅이 실행되는 동안 Claude는 멈추고 기다립니다. 타임아웃을 설정하지 않으면 훅이 멈출 경우 Claude도 영원히 멈춥니다.

```json
"timeout": 10  // 반드시 설정 (단위: 초)
```

**무거운 작업은 백그라운드로**

오래 걸리는 작업은 `&`를 붙여 백그라운드에서 실행하세요.

```json
"command": "npm run test &"  // 백그라운드 실행
```

---

## 훅 디버깅

훅이 예상대로 동작하지 않을 때 확인 방법입니다.

### 로그 확인

```bash
# 훅 실행 로그 위치
~/.claude/logs/

# 최근 로그 실시간 확인
tail -f ~/.claude/logs/$(ls -t ~/.claude/logs/ | head -1)
```

### 디버그 모드로 실행

```bash
claude --debug
```

`--debug` 플래그를 붙이면 훅 실행 여부, 매처 조건 평가 결과, 커맨드 출력 등이 상세하게 출력됩니다.

### 훅 커맨드 직접 테스트

훅에 등록하기 전에 터미널에서 직접 실행해 정상 동작을 확인하세요.

```bash
# 예: lint 훅이 제대로 작동하는지 먼저 확인
npm run lint --fix
echo "Exit code: $?"  # 0이면 성공, 1 이상이면 실패
```

> ⚠️ 훅 커맨드가 exit code 1을 반환하면 Claude가 해당 작업을 **차단(block)**합니다. `PreToolUse` 훅에서 의도치 않게 1을 반환하면 Claude가 아무 파일도 수정하지 못하는 상황이 생깁니다.

### 자주 하는 실수

| 증상 | 원인 | 해결 |
|---|---|---|
| 훅이 전혀 실행 안 됨 | `matcher` 패턴 오타 | `"matcher": ".*"`로 바꿔서 먼저 테스트 |
| Claude가 파일 수정을 거부함 | PreToolUse 훅이 exit 1 반환 | 훅 커맨드 직접 실행해서 exit code 확인 |
| 훅은 실행되는데 결과가 반영 안 됨 | 백그라운드(`&`) 실행 후 결과를 기다리지 않음 | 반드시 결과가 필요한 훅은 `&` 제거 |
| 알림 소리가 안 남 (macOS) | `afplay` 경로 문제 | `which afplay`로 경로 확인 후 절대경로 사용 |

---

## 실전 활용 예시

```
파일 저장 후 자동 포맷팅     → PostToolUse + prettier --write
위험한 rm -rf 명령 차단      → PreToolUse + 명령어 패턴 검사 후 exit 1
긴 작업 완료 시 슬랙 알림    → Notification + slack webhook curl
세션 종료 시 요약 보고서 생성 → Stop + 스크립트 실행
타입 오류 자동 확인          → PostToolUse + tsc --noEmit
```
