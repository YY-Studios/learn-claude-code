---
description: 새 문서 파일을 생성하고 README와 config를 자동으로 업데이트한다
---

## `/new-doc` 사용법

```
/new-doc [경로] [제목]
```

예시: `/new-doc 05-claude-extend/find-skills.md "스킬 찾는 법"`

---

## 실행 순서

**$ARGUMENTS** 에서 경로와 제목을 파싱한다.

1. **파일 생성**
   - 지정 경로에 `.md` 파일 생성
   - frontmatter (`title`, `description`) 포함
   - H1 헤더로 시작

2. **README.md 업데이트**
   - 해당 섹션을 찾아 새 파일 링크 추가
   - 없는 섹션이면 새 섹션 추가

3. **config.js 확인**
   - 새 디렉토리에 생성하는 경우 `.vitepress/config.js`의 `LABEL_MAP` (ko/en/ja) 에 항목 추가

4. **en/, ja/ 확인**
   - 동일 경로에 영어/일본어 파일이 있으면 stub 파일 생성 여부를 물어본다

5. **빌드 검증**
   - `pnpm build` 실행
   - 오류가 있으면 원인을 찾아 수정 후 재시도
