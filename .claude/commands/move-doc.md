---
description: 문서 파일을 이동하고 모든 관련 링크를 자동으로 업데이트한다
---

## `/move-doc` 사용법

```
/move-doc [원본경로] [대상경로]
```

예시: `/move-doc 04-claude-control/hooks.md 05-claude-extend/hooks.md`

---

## 실행 순서

**$ARGUMENTS** 에서 원본경로와 대상경로를 파싱한다. (공백 구분, 첫 번째가 원본, 두 번째가 대상)

1. **파일 이동**
   - `git mv [원본경로] [대상경로]`
   - `en/[원본경로]`가 존재하면 `git mv en/[원본경로] en/[대상경로]`
   - `ja/[원본경로]`가 존재하면 `git mv ja/[원본경로] ja/[대상경로]`

2. **README.md 링크 업데이트**
   - `README.md`에서 원본경로를 검색해 대상경로로 전부 치환

3. **교차 링크 업데이트**
   - 모든 `.md` 파일에서 원본경로 문자열을 검색해 대상경로로 치환
   - `en/`, `ja/` 포함

4. **config.js 확인**
   - 대상경로의 디렉토리가 새로 생성된 것이라면 `.vitepress/config.js`의 `LABEL_MAP` (ko/en/ja) 에 해당 폴더명 항목 추가

5. **빌드 검증**
   - `pnpm build` 실행
   - 오류가 있으면 원인을 찾아 수정 후 재시도
