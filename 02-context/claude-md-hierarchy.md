# CLAUDE.md 계층 구조 및 지연 로딩(Lazy Loading)

프로젝트 규모가 커질수록 루트 디렉토리의 `CLAUDE.md` 하나에 모든 API 스펙이나 DB 스키마를 넣으면, 매 세션마다 수천 토큰이 무의미하게 낭비됩니다.

## 1. 폴더별 CLAUDE.md 분리 전략
도메인이나 기능별로 폴더 내부에 별도의 `CLAUDE.md`를 작성하세요.
* `/src/features/auth/claude.md`: 인증 관련 상태 관리 및 규칙
* `/supabase/claude.md`: DB 마이그레이션 규칙 및 RLS 정책
Claude Code는 해당 폴더 내부의 파일을 수정할 때만 이 세부 규칙들을 읽어오므로 토큰 효율이 극대화됩니다.

## 2. 지연 로딩 (Lazy Loading) 기법
방대한 문서는 별도의 마크다운 파일로 빼두고, 루트 `CLAUDE.md`에는 **경로(Pointer)**만 남겨두어 필요할 때만 참조하게 만듭니다.

**루트 CLAUDE.md 작성 예시:**
> - 아키텍처 다이어그램이 필요하면 `docs/architecture.md`를 참조해.
> - 데이터베이스 스키마 정보가 필요하면 `docs/db-schema.md` 파일을 읽어봐.
