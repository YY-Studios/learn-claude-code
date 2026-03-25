# 프론트엔드 상태 관리 및 훅 생성 패턴

`@supabase/ssr` 패키지를 사용하지 않고 수동으로 로직을 구현하는 환경에서, 프론트엔드 훅 생성을 Claude에게 지시할 때 사용하는 효과적인 프롬프트 패턴입니다.

## 💡 Prompt Template
> "Supabase 클라이언트를 사용하여 데이터를 패칭하는 커스텀 훅을 작성해 줘.
> 
> **[기술 스택 및 제약 조건]**
> - React, TypeScript 환경
> - 상태 관리는 Zustand, 비동기 데이터 패칭 및 캐싱은 TanStack Query(React Query) 사용
> - `@supabase/ssr` 패키지는 절대 사용하지 않고, 수동으로 Supabase 클라이언트를 초기화하여 로직을 구현할 것.
> - FSD(Feature-Sliced Design) 아키텍처를 따르므로, 해당 훅은 `features/{도메인}/api/` 경로에 위치해야 함.
> - 에러 발생 시 처리 로직을 포함하고, 로딩 상태(isLoading)를 명확히 반환할 것."
