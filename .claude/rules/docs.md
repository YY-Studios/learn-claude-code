---
description: 문서 파일 생성/이동/이름변경 시 따라야 하는 규칙
---

## 새 문서 파일 생성 시

새 `.md` 파일을 만들 때는 반드시 아래 순서를 따른다.

1. YAML frontmatter(`title`, `description`) 포함
2. `README.md`의 해당 섹션에 링크 추가
3. 새 디렉토리에 생성하는 경우 `.vitepress/config.js`의 `LABEL_MAP` (ko/en/ja) 에 항목 추가
4. `en/`, `ja/` 동일 경로에 파일이 있어야 하는지 확인

## 문서 파일 이동/이름변경 시

`.md` 파일을 이동하거나 이름을 변경할 때는 반드시 아래 순서를 따른다.

1. `git mv`로 파일 이동 (일반 mv 사용 금지)
2. `README.md`에서 이전 경로 링크 검색 → 새 경로로 업데이트
3. 모든 `.md` 파일에서 이전 경로 교차 링크 검색 → 새 경로로 업데이트
4. 새 디렉토리가 생겼다면 `.vitepress/config.js`의 `LABEL_MAP` (ko/en/ja) 에 항목 추가
5. `en/`, `ja/` 동일 경로 파일도 같이 이동했는지 확인

## `.claude/commands/`에 새 명령어 파일 생성 시

새 명령어 파일(`.claude/commands/*.md`)을 만들 때는 반드시 아래 순서를 따른다.

1. 파일 frontmatter에 `description` 작성 (한 줄 설명)
2. `01-getting-started/02-basic-commands.md`의 "이 프로젝트의 커스텀 명령어" 테이블에 행 추가
   - 명령어: 파일명에서 확장자 제거 후 `/` 앞에 붙임 (예: `new-doc.md` → `/new-doc`)
   - 설명: frontmatter의 `description` 값 사용
   - 여러 명령어를 한 번에 추가할 경우 각각 행을 추가한다
   - 테이블이 없으면 "이 프로젝트의 커스텀 명령어" 섹션과 테이블을 새로 만든다

---

두 경우 모두 완료 후 `pnpm build`로 빌드가 통과하는지 검증한다.
