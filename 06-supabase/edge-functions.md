# Supabase Edge Function 생성 패턴

Claude Code로 Supabase Edge Function을 생성할 때, **Deno 런타임 환경**과 **배포 방식**을 명확히 명시하지 않으면 Node.js 스타일로 작성해버립니다. 제약 조건을 프롬프트에 명시하는 것이 핵심입니다.

---

## Edge Function이란?

Supabase Edge Function은 **Deno 런타임** 위에서 실행되는 서버리스 함수입니다. Node.js와 다른 점이 있습니다.

| | Node.js | Supabase Edge Function (Deno) |
|---|---|---|
| import 방식 | `require()` 또는 ESM | ESM만 사용 (`import`) |
| 패키지 | npm | URL import 또는 npm: prefix |
| Supabase 클라이언트 | `@supabase/supabase-js` | `npm:@supabase/supabase-js` |
| 환경 변수 | `process.env` | `Deno.env.get()` |

---

## 📋 Prompt Template — 기본 Edge Function 생성

```
Supabase Edge Function을 작성해줘.

[기능 설명]
- [여기에 기능 설명]

[기술 스택 및 제약 조건]
- Deno 런타임 환경 (Node.js가 아님)
- import는 ESM 방식만 사용
- Supabase 클라이언트: npm:@supabase/supabase-js
- 환경 변수 접근: Deno.env.get('변수명')
- 파일 위치: supabase/functions/[함수명]/index.ts
- CORS 헤더 포함 (OPTIONS 메서드 처리)
- 에러 응답은 항상 JSON 형태로 반환

[반환 형식]
- 성공: { data: ..., error: null }
- 실패: { data: null, error: "에러 메시지" }
```

---

## 📋 Prompt Template — OpenAI 연동 Edge Function (타이핑룸 기준)

```
OpenAI API를 호출하는 Supabase Edge Function을 작성해줘.

[기능 설명]
- [여기에 기능 설명]

[기술 스택 및 제약 조건]
- Deno 런타임, ESM import
- OpenAI 클라이언트: npm:openai
- OpenAI API 키: Deno.env.get('OPENAI_API_KEY')
- Supabase 클라이언트: npm:@supabase/supabase-js
- 인증: Authorization 헤더의 JWT를 Supabase로 검증
- 파일 위치: supabase/functions/[함수명]/index.ts
- 스트리밍 응답이 필요하면 ReadableStream 사용
```

---

## ✅ 좋은 예시 vs ❌ 나쁜 예시

**❌ 나쁜 예시 — Deno 환경 명시 없음**
```
"유저 ID를 받아서 문장을 생성하는 Edge Function 만들어줘."
```
→ Claude가 `process.env`, `require()`, Node.js 스타일로 작성해서 배포 시 오류 발생

**✅ 좋은 예시 — 환경 명시**
```
"Deno 런타임 기반 Supabase Edge Function을 작성해줘.
- 요청 body에서 userId를 받아서 users 테이블에서 정보 조회
- Supabase 클라이언트: npm:@supabase/supabase-js
- 환경 변수: Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
- 파일 위치: supabase/functions/get-user/index.ts"
```

---

## CORS 처리 (필수 보일러플레이트)

Claude에게 CORS를 포함하라고 하면 아래 구조로 작성해줍니다. 프리플라이트 요청(OPTIONS)을 놓치는 경우가 많으므로 반드시 명시하세요.

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // OPTIONS 요청 처리 (CORS preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // 실제 로직
  // ...
})
```

---

## 배포 & 테스트

```bash
# 로컬 테스트
supabase functions serve [함수명] --env-file .env.local

# 배포
supabase functions deploy [함수명]

# 로그 확인
supabase functions logs [함수명]
```

Claude Code에게 테스트까지 맡기려면:

```
"방금 만든 Edge Function을 로컬에서 테스트하는 curl 명령어도 같이 작성해줘."
```

---

## CLAUDE.md에 공통 규칙 등록하기

```markdown
## Supabase Edge Function 규칙
- 런타임: Deno (Node.js가 아님)
- import: ESM 방식, npm: prefix 사용 (예: npm:@supabase/supabase-js)
- 환경 변수: Deno.env.get() 사용 (process.env 금지)
- 파일 위치: supabase/functions/[함수명]/index.ts
- 모든 함수에 CORS 처리 포함 (OPTIONS 메서드)
- 응답 형식: { data: ..., error: ... }
```

→ 프론트엔드 훅 패턴은 [frontend-hooks.md](./frontend-hooks.md) 참고
