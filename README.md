# COMUS Docs

소비가 나눔이 되는 플랫폼 **COMUS(컴어스)**의 공식 문서 사이트입니다.

**https://comus-im.github.io/docs/**

## 구성

| 경로 | 내용 |
| --- | --- |
| `/` | 랜딩 — 플랫폼 소개와 대상별 가이드 진입점 |
| `/guide/:section/:page` | 대상별 가이드 (시작하기 · 사용자 · 입점 기업 · 후원기관/공공기관 · 파트너사 · 투자자) |
| `/design` | COMUS 디자인 시스템 (토큰 · Foundations · 컴포넌트 라이브 스펙) |
| `/brand` | 브랜드 스토리 (Manifesto · Vision · Core Values) |

## 문서 작성 방법

가이드 문서는 **데이터**(`src/content/guide-data.json`)로 정의합니다. 레이아웃·사이드바·검색·이전/다음 내비게이션은 자동으로 생성됩니다.

### 방법 1 — 사이트에서 직접 편집 (관리자 모드, 권장)

1. 사이트 우측 하단 **관리자** 버튼 → 이 저장소에 쓰기 권한이 있는 GitHub 토큰(Fine-grained PAT, `Contents: Read and write`)으로 로그인합니다.
2. **편집 모드**를 켜면 가이드 문서에서 다음이 가능합니다.
   - 제목·요약·본문 블록 인라인 편집, 블록 추가/삭제/순서 변경
   - **사진 추가** (사진 블록 → 파일 선택, 게시 시 `public/uploads/`에 자동 업로드)
   - **목차 편집** — 문서 추가/삭제/순서 변경, 대상 그룹 추가/이름 변경
3. 편집 내용은 브라우저에 초안으로 저장되며, **게시**를 누르면 GitHub에 커밋되고 1~2분 내 자동 재배포됩니다.

토큰은 브라우저(localStorage)에만 저장되고 GitHub API 외에는 전송되지 않습니다. 게시 권한은 GitHub 저장소 권한과 동일합니다.

### 방법 2 — 코드로 편집

1. `src/content/guide-data.json`에서 해당 섹션의 `pages` 배열에 페이지를 추가합니다.
2. 본문은 블록(`p`, `h2`, `callout`, `steps`, `cards`, `flow`, `table`, `quote`, `stats`, `shot`, `img`)의 배열로 씁니다. 블록 정의는 `src/content/types.ts` 참고.

디자인 토큰과 컴포넌트는 Claude Design 프로젝트(“COMUS Design System”)의 원본 값을 그대로 이식한 것입니다. 토큰 변경 시 `src/kit/tokens.ts`와 `src/styles/global.css`를 함께 수정하세요.

## 개발

```bash
npm install
npm run dev      # 로컬 개발 서버 (http://localhost:5173/docs/)
npm run build    # 프로덕션 빌드 (dist/)
```

`main` 브랜치에 push하면 GitHub Actions가 자동으로 GitHub Pages에 배포합니다.
