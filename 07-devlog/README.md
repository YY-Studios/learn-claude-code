# 실전 개발 사례

이 문서에서는 커스텀 키보드 타건음 및 배경 설정 웹 서비스인 **'타이핑룸(Typing Room)'**을 개발하며 Claude Code를 어떻게 실전에 적용했는지 기록합니다.

## 🎯 프로젝트 환경
* **프레임워크:** Next.js (App Router), React, TypeScript
* **아키텍처:** FSD(Feature-Sliced Design) 및 DDD-lite
* **상태 관리:** Zustand, TanStack Query
* **인프라:** 로컬 MacBook 내 Docker 환경, Supabase (수동 클라이언트 구현)

## 🛠️ 실전 트러블슈팅 및 프롬프트 사례

### 1. FSD 아키텍처 파일 자동 배치
Next.js App Router와 FSD 구조를 결합할 때, AI가 파일을 엉뚱한 폴더에 생성하는 문제가 있었습니다.
* **해결:** `CLAUDE.md`에 FSD 계층 구조(app, pages, widgets, features, entities, shared)의 명확한 정의와 Import 의존성 규칙(하위 계층만 참조 가능)을 추가했습니다.
* **결과:** "키보드 사운드 재생 버튼 컴포넌트를 만들어줘"라고 지시하면, 알아서 `features/keyboard-sound/ui/` 경로에 올바르게 파일을 생성합니다.

### 2. 음원 재생(Audio API) 로직 최적화
웹 환경에서 커스텀 타건음을 지연 없이 재생하기 위해 Web Audio API를 다루는 과정에서 Claude Code의 **Plan Mode**가 빛을 발했습니다.
* **적용:** 무작정 코드를 수정하게 두지 않고, `Shift + Tab`으로 플랜 모드에 진입한 뒤 "오디오 버퍼링 최적화 및 동시 타건 시 오버랩 처리 전략을 먼저 제시해"라고 지시했습니다. 
* AI가 제안한 AudioContext 프리로딩 구조를 리뷰한 뒤 에딧 모드로 전환하여 깔끔하게 모듈화를 완료했습니다.
