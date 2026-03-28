---
title: Collaborating with Other AIs - ChatGPT & Gemini Integration
description: Export context with /export. A collaboration pattern for getting feedback from ChatGPT or Gemini and bringing it back to Claude.
---

# Collaborating with Other AIs (Cross-AI Review)

There are times when you keep going back and forth with Claude Code and end up spinning your wheels. Instead of forcing your way through, **borrow a different AI's perspective**.

---

## When Should You Use This?

- When the same bug keeps coming back after 3 or more fixes
- When Claude seems to be heading in an increasingly complex direction
- When you're unsure about a fundamental architectural decision
- When you've fallen into a context swamp and response quality has noticeably degraded

---

## The `/export` Command

Extracts the current session's conversation history and code context to a file.

```bash
/export                    # 기본 파일로 내보내기
/export conversation.md    # 파일명 직접 지정
/export --clipboard        # 클립보드에 복사 (바로 붙여넣기 편함)
```

---

## Cross-AI Review Workflow

```
1. /export --clipboard 으로 현재 컨텍스트 복사
2. ChatGPT(o3), Gemini 2.0, Grok 등에 붙여넣기
3. 아래 프롬프트로 비평 요청
4. 힌트를 들고 Claude Code에 /clear 후 새 세션 시작
```

**Prompt to use when asking another AI:**
```
Claude Code와 이 문제를 풀고 있는데 막혔어.
Claude의 접근 방식에서 잘못된 점이 뭔지,
완전히 다른 해결책이 있는지 비평해줘.
Claude가 놓쳤을 가능성이 높은 부분을 중심으로.
```

---

## Having Two Claudes Review Each Other

One officially recommended approach is to have one Claude write the code while another Claude reviews or tests it. This eliminates blind spots by looking at the same problem from a completely different context.

```
터미널 창 1: 구현 담당 Claude Code
터미널 창 2: 리뷰 담당 Claude Code (또는 claude.ai 웹)

→ 창 1에서 작성한 코드를 창 2에 붙여넣고
  "이 코드의 문제점과 개선할 수 있는 부분을 비평해줘"
```

---

## Comparing Strengths by AI (Reference)

| AI | Good At |
|---|---|
| Claude (Opus) | Complex reasoning, architecture design, long context |
| ChatGPT (o3) | Finding bugs, mathematical reasoning, code review |
| Gemini 2.0 | Up-to-date information, multimodal, fast drafting |

> 💡 No AI is perfect. The more important the decision, the more you should have two or more AIs review it.