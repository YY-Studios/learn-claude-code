# CLAUDE.md 작성법

## 왜 필요한가?

AI 에이전트는 컨텍스트가 너무 많아지면 환각(Hallucination)을 일으키기 쉽습니다.  
`CLAUDE.md`는 매 세션마다 Claude Code가 **가장 먼저 읽는 파일**로, 프로젝트 핵심 정보만 담아두면 토큰 낭비를 막고 효율을 높일 수 있습니다.

---

## 1. /init 으로 자동 생성

프로젝트 루트에서 Claude Code를 실행한 뒤 아래 명령어를 입력하면 자동으로 `CLAUDE.md`가 생성됩니다.

```bash
/init
```

프로젝트 코드를 분석해서 기술 스택, 폴더 구조, 자주 쓰는 커맨드 등을 자동으로 채워줍니다.

> <img width="490" height="190" alt="image" src="https://github.com/user-attachments/assets/c0f75e59-bd6f-42fc-88d9-08f519aeeb5c" />

> <img width="825" height="433" alt="image" src="https://github.com/user-attachments/assets/e21e5e64-be63-49bf-bab5-0bf4d385d313" />

---

## 2. 직접 작성하는 경우

자동 생성 후 아래 항목들을 직접 보완해주면 더 좋습니다.

```markdown
# 프로젝트명

## 개요
한 줄 설명

## 기술 스택
- 프론트: Next.js
- 백엔드: Supabase
- AI: OpenAI API

## 주요 커맨드
- 개발 서버: `npm run dev`
- 배포: `...`

## 주의사항
- 절대 건드리면 안 되는 파일/폴더
- 코드 컨벤션 등
```

---

> 💡 **팁:** 세션이 길어질수록 컨텍스트가 쌓입니다. 새 작업을 시작할 때는 새 세션을 여는 습관을 들이세요.
