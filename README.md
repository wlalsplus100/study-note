# Study Note

학습 노트 작성을 위한 웹 애플리케이션입니다. React와 TypeScript를 기반으로 구축되었으며, 마크다운 형식으로 노트를 작성하고 관리할 수 있습니다.

## 기술 스택

- **Frontend**: React 19
- **언어**: TypeScript
- **빌드 도구**: Vite
- **스타일링**: TailwindCSS
- **상태 관리**: TanStack Query (React Query)
- **라우팅**: React Router DOM
- **마크다운 렌더링**: React Markdown, React Syntax Highlighter
- **애니메이션**: Framer Motion

## 주요 기능

- 마크다운 형식의 노트 작성 및 편집
- 코드 블록 문법 하이라이팅
- 반응형 디자인
- 실시간 마크다운 프리뷰

## 프로젝트 구조

```
study-note/
├── src/
│   ├── apis/         # API 통신 관련 코드
│   ├── assets/       # 정적 리소스
│   ├── components/   # 재사용 가능한 컴포넌트
│   ├── hooks/        # 커스텀 훅
│   ├── pages/        # 페이지 컴포넌트
│   ├── types/        # TypeScript 타입 정의
│   ├── App.tsx       # 메인 애플리케이션 컴포넌트
│   ├── router.tsx    # 라우팅 설정
│   └── main.tsx      # 애플리케이션 진입점
```

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- Yarn 패키지 매니저

### 설치

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build
```

### 스크립트

- `yarn dev`: 개발 서버 실행 (Vite)
- `yarn build`: 프로덕션용 빌드 생성
- `yarn lint`: ESLint를 사용한 코드 검사
- `yarn preview`: 빌드된 프로덕션 버전 미리보기

## 개발 가이드

- ESLint를 통한 코드 품질 관리
- TypeScript를 사용한 정적 타입 검사
- 컴포넌트 기반 아키텍처
- React Query를 활용한 서버 상태 관리

## 라이선스

이 프로젝트는 비공개 프로젝트입니다.
