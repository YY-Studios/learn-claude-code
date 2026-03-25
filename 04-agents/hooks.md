# Hooks (자동화 엔진)

훅은 **특정 이벤트가 발생할 때 지정된 액션을 자동으로 실행해주는 엔진**입니다.  
"Claude가 파일을 수정할 때마다 자동으로 린트를 돌린다"처럼, 사람이 반복하던 후처리 작업을 자동화할 수 있습니다.

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
    ]
  }
}
```

---

## ⚠️ 주의사항

**타임아웃 필수**  
훅이 실행되는 동안 Claude는 멈추고 기다립니다. 타임아웃을 설정하지 않으면 훅이 멈출 경우 Claude도 영원히 멈춥니다.

```json
"timeout": 10  // 반드시 설정
```

**무거운 작업은 백그라운드로**  
오래 걸리는 작업은 `&`를 붙여 백그라운드에서 실행하세요.

```json
"command": "npm run test &"  // 백그라운드 실행
```

---

## 실전 활용 예시

```
파일 저장 후 자동 포맷팅     → PostToolUse + prettier
위험한 rm -rf 명령 차단      → PreToolUse + 명령어 패턴 검사
긴 작업 완료 시 슬랙 알림    → Notification + slack webhook
세션 종료 시 요약 보고서 생성 → Stop + 스크립트 실행
```

> 💡 **프롬프트보다 훅이 더 신뢰할 수 있습니다.**  
> "린트 꼭 돌려줘"라고 프롬프트로 지시하면 Claude가 잊을 수 있지만,  
> 훅은 모델 동작과 관계없이 **무조건 실행**됩니다.
