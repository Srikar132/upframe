# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # dev server on port 3000
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint
```

No test suite is configured.

## Architecture

Single-page marketing site for UPFRAME, built with Next.js 16.2.2 App Router, React 19, Tailwind CSS v4, and TypeScript.

### Directory layout

```
app/
  layout.tsx          # root layout — fonts, SmoothScrollProvider wrapper
  page.tsx            # homepage — async with 5 s artificial delay to hold loading.tsx
  loading.tsx         # Next.js loading UI — renders the Intro animation
  globals.css         # Tailwind v4 theme tokens + global component styles
components/
  main/               # page sections (Hero, About, OurServices, …)
  shared/             # layout/reusable pieces (Navbar, Footer, HoverText, LiquidCard, Intro, Menu)
  ui/                 # shadcn primitives (Button, Card)
providers/
  SmoothScrollProvider.tsx   # Lenis + GSAP integration, exposes useLenis() context
lib/
  utils.ts            # cn() helper (clsx + tailwind-merge)
```

### Intro / loading flow

`app/loading.tsx` (Next.js's built-in loading UI) renders `<Intro>` while `app/page.tsx` is suspended. `page.tsx` has an intentional `await setTimeout(5000)` at the top to hold the suspense boundary open long enough for the intro animation to complete. The animation runs on every mount with no external state — Next.js controls when `loading.tsx` is shown and dismissed.

### Animation stack

- **GSAP** (`gsap`, `@gsap/react`) — all motion. Use `useGSAP()` (not raw `useEffect`) for animations so cleanup is handled automatically. Register plugins at module scope before the component (e.g. `gsap.registerPlugin(ScrollTrigger)`).
- **Lenis** — smooth scrolling, driven by the GSAP ticker inside `SmoothScrollProvider`. Access the Lenis instance in client components via `useLenis()`.
- `ScrollTrigger` and `DrawSVGPlugin` are used in existing components.

### Styling

Tailwind v4 — config lives entirely in `app/globals.css` under `@theme inline { … }` and `:root { … }`. There is no `tailwind.config.js`.

**Reusable utility classes defined in `globals.css`:**
- `.common-padding` — `px-4 sm:px-6 lg:px-8`
- `.section-header` / `.header-label` — standard section heading layout with a dot-and-line prefix
- `.p-xl`, `.p-base`, `.p-sm`, `.p-xs` — body text scale
- `.liquid-card-*` — styles consumed by `LiquidCard`

**Font variables** (set on `<html>` in `layout.tsx`):
- `--font-heading` → Space Grotesk (used by `h1–h6`)
- `--font-sans` → Manrope (default body)
- `--font-cursive` → Indie Flower

**shadcn** — style `radix-lyra`, icon library `@phosphor-icons/react`. Add new components with `npx shadcn add <component>`.

### Client vs server components

`app/page.tsx` and `app/layout.tsx` are server components. Every component that uses hooks, GSAP, Lenis, or browser APIs must be marked `"use client"`. Sections under `components/main/` are currently all client components.
