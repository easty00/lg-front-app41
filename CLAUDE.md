# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 프로젝트 개요

Next.js App Router 학습용 프로젝트입니다. 커밋 메시지는 한국어로 씁니다 (예: `study: 11/4 로그아웃과 카트 페이지`, `fix: ...`). 코드 주석과 사용자에게 보이는 메시지도 대부분 한국어이며, 진행 중인 플레이스홀더 페이지가 섞여 있습니다.

스택: Next.js 16.4 (Turbopack), React 19.3, TypeScript (strict), Tailwind CSS v4, shadcn/ui (Base UI 기반), NextAuth v4, Prisma 6 + MongoDB, Zod 4. 테스트 프레임워크는 없습니다.

## 명령어

```bash
npm run dev     # 개발 서버 (http://localhost:3000)
npm run build   # 프로덕션 빌드 (타입 체크 포함)
npm run start   # 프로덕션 빌드 실행
npm run lint    # ESLint 9 flat config (eslint-config-next core-web-vitals + typescript)

npx prisma generate   # 클라이언트 재생성 (npm install 시 postinstall로도 실행됨)
npx prisma db push    # 스키마를 DB에 반영 (MongoDB라 마이그레이션 파일 없음)
```

환경 변수는 `.env`, `.env.local`에 있습니다 (git 제외): `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `KAKAO_CLIENT_ID/SECRET`, `GOOGLE_CLIENT_ID/SECRET`.

## Next.js 버전 주의사항

AGENTS.md대로 이 버전은 예전 학습 데이터와 다릅니다. API를 쓰기 전에 `node_modules/next/dist/docs/`를 확인하세요. 이 프로젝트에서 이미 쓰고 있는 차이점은 다음과 같습니다.

- `next.config.ts`에서 `cacheComponents`, `partialPrefetching`, `experimental.agentFeedback`을 켰습니다. 그래서 `cookies()`, `searchParams`, `params` 같은 동적 데이터를 읽는 컴포넌트는 `<Suspense>` 안에 있어야 합니다. 서버 전용 동적 함수는 먼저 `await connection()`을 호출합니다 (`lib/readAccessToken.ts`, `actions/draft.ts` 참고).
- `middleware.ts` 대신 루트의 `proxy.ts`를 사용합니다 (`proxy` 함수 export).
- 레이아웃 props는 전역 헬퍼 `LayoutProps<"/route">`로 타입을 지정할 수 있습니다 (`app/layout.tsx`). 생성된 라우트 타입은 `.next/types`, `.next/dev/types`에 있습니다.
- Tailwind v4는 PostCSS가 아니라 `next.config.ts`의 Turbopack CSS 규칙(`@tailwindcss/turbopack` 로더)으로 연결됩니다. 테마 토큰은 `app/globals.css`에 있고 `tailwind.config.js`는 없습니다.
- 외부 이미지는 `next.config.ts`의 `images.remotePatterns`에 호스트를 등록해야 합니다.

## 아키텍처

### 라우팅

- 경로 별칭 `@/*`는 저장소 루트를 가리킵니다.
- `(main)`은 `Header`가 있는 레이아웃을 쓰는 라우트 그룹입니다: `/`, `/cart`, `/feed`, `/blog/[blogId]`, `/product/[...productCategoryName]`.
- `(auth)`에는 `/login`, `/signup`이 있습니다.
- `page.tsx`는 얇게 유지합니다. `<Suspense>`로 감싸고 `app/component/templates/`의 컴포넌트에 `params`/`searchParams` Promise를 그대로 넘기면, 템플릿이 그 안에서 `await`합니다 (`feed/page.tsx`, `FeedContent.tsx` 참고).
- `page.tsx`, `layout.tsx`는 default export가 필수입니다. 빈 파일은 `.next/**/validator.ts`에서 타입 오류로 나타납니다. `.next/`는 전부 생성물이므로, 라우트 타입이 오래되었다면 삭제하고 `npm run dev`를 다시 실행하세요.

### 컴포넌트

- `app/component/`는 아토믹 디자인 구조입니다: `atoms` → `molecules` → `organisms` → `templates`. `providers/`에는 인증 컨텍스트가 있습니다. `page.tsx`가 없어 라우트가 되지 않습니다.
- `components/ui/`는 shadcn 컴포넌트입니다 (`components.json`, style `base-nova`). 아이콘은 lucide입니다.
- `app/component/layout/Header.tsx`는 빈 파일입니다. 실제 헤더는 `app/component/templates/Header.tsx`입니다.

### 데이터 계층

요청 흐름은 `route handler / server action / NextAuth` → `service/userService.ts` → `lib/prisma.ts`(싱글턴) → MongoDB입니다.

- DB 접근과 비즈니스 규칙은 `userService`에 모읍니다. 비밀번호는 여기서 scrypt로 해시합니다. 실패는 예외 대신 `{ ok: false, status, message }`로 돌려주고, 호출하는 쪽에서 응답으로 바꿉니다.
- Route handler 응답 형식은 `{ success, message?, data? }`입니다.
- 검증 스키마는 `schema/`에 있고 클라이언트와 서버가 함께 씁니다.

### 인증

`lib/authOptions.ts`의 NextAuth 설정(JWT 세션, 2시간)에 Credentials, Kakao, Google 제공자가 있습니다.

- **로그인 판단 기준은 JWT 안의 `accessToken` 유무입니다.** `proxy.ts`도 이 값을 봅니다. Credentials 로그인의 `accessToken`은 `userService.login`이 만드는 임의 문자열입니다.
- 접근 제어 목록은 `config/initial.ts`에 있습니다. `authUrlList`(`/cart`, `/order`)는 로그인이 필요하고, `withoutAuthUrlList`(`/login`, `/signup`)는 로그인하면 튕겨 나갑니다. 경로는 정확히 일치해야 하므로 하위 경로는 보호되지 않습니다. `/order` 페이지는 아직 없습니다.
- `proxy.ts`의 matcher는 `/api`를 제외합니다. 따라서 API 라우트는 proxy로 보호되지 않습니다.
- 로그인 후 이동 경로는 항상 `safeCallbackPath()`를 거칩니다 (오픈 리다이렉트 방지).
- 클라이언트는 `next-auth/react`의 `useSession`이 아니라 `useAuth()`로 로그인 상태를 읽습니다. 루트 레이아웃의 `AuthShell`(서버)이 `getServerSession`으로 세션을 읽어 `AuthProvider`에 넘깁니다. `signIn`, `signOut`은 `next-auth/react`를 그대로 씁니다.
- `LoginForm`의 입력 필드 이름은 `userId`지만 `email`로 전달되고, `userService.login`은 이메일로 조회합니다. 즉 현재는 아이디가 아니라 이메일을 입력해야 로그인됩니다.
- 세션/JWT에 필드를 추가하면 `types/next-auth.d.ts`도 함께 수정합니다.

### 회원가입 (4단계)

클라이언트 상태가 아니라 **서버 액션 + httpOnly 쿠키**로 동작합니다 (`/signup?step=N`).

- `actions/userActions.ts`: 단계별 서버 액션입니다. 입력을 검증하고 쿠키에 저장한 뒤 `redirect`합니다.
- `actions/draft.ts`: 쿠키 초안(`signup-draft`)과 오류(`signup-errors`)를 읽고 씁니다. 동기 헬퍼도 export하기 때문에 `"use server"` 파일로 만들면 안 됩니다.
- `furthestSignupStep()`이 초안 기준으로 도달 가능한 최대 단계를 계산합니다. 페이지와 액션 모두 이 값으로 단계 건너뛰기를 막습니다.
- 서버 액션에서 `try/catch`를 쓸 때는 `catch` 첫 줄에 `unstable_rethrow(error)`를 호출합니다. `redirect` 같은 Next.js 내부 제어 흐름을 삼키지 않기 위해서입니다.
- `app/component/templates/SignupFlow.tsx`는 이전 컨텍스트 방식의 잔재로, 현재 아무 곳에서도 쓰이지 않습니다.
