# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project context

A Next.js App Router study/practice project (commit messages are in Korean, e.g. `study: 중간저장`). It started from `create-next-app` and is being built up incrementally; expect placeholder pages and work-in-progress files.

Stack: Next.js 16.4 (Turbopack), React 19.3, TypeScript (strict), Tailwind CSS v4. No test framework is installed.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build (also type-checks)
npm run start   # serve the production build
npm run lint    # ESLint 9 flat config (eslint-config-next core-web-vitals + typescript)
```

## Next.js version caveats

Per AGENTS.md, this Next.js version differs from older training data. Check `node_modules/next/dist/docs/` (`01-app/`, `03-architecture/`, …) before using an API. Things already in use here that differ from older Next.js:

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `experimental.agentFeedback`. With Cache Components on, data fetching/dynamic APIs follow the new caching model; read the docs before adding `fetch`, `cookies()`, `headers()`, etc.
- Layouts can type props with the global `LayoutProps<"/route">` helper (see `app/layout.tsx`) instead of hand-written `{ children: React.ReactNode }`. Generated route types live in `.next/types` / `.next/dev/types`.
- Tailwind v4 is wired through a Turbopack CSS rule (`@tailwindcss/turbopack` loader in `next.config.ts`), not PostCSS. Theme tokens are declared in `app/globals.css` via `@import "tailwindcss"` and `@theme inline`; there is no `tailwind.config.js`.

## Architecture

All routing is in `app/` (App Router):

- `app/layout.tsx`: root layout (Geist fonts, globals.css). It currently renders practice headings around `{children}` on every page.
- Route groups (folders in parentheses) organize routes without adding URL segments:
  - `(main)/page.tsx` → `/` (the home page lives here, not at `app/page.tsx`)
  - `(auth)/layout.tsx` wraps `(auth)/login` → `/login` and `(auth)/signup` → `/signup`
- `about/page.tsx` → `/about`, `about/mypage/page.tsx` → `/about/mypage` (nested segment).
- `app/component/` holds shared components (e.g. `component/layout/Header.tsx`). It has no `page.tsx`, so it isn't a route.
- Path alias `@/*` maps to the repo root (e.g. `@/app/component/...`).

Every `page.tsx` / `layout.tsx` needs a default export. Next.js type-checks them through the generated `.next/dev/types/validator.ts` (dev) and `.next/types/validator.ts` (build), so an empty page file shows up as an error in `validator.ts`. `.next/` is fully generated; if it holds stale route types, delete it and restart `npm run dev`.
