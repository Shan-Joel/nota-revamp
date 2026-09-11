# nōta — Astro rebuild

Pixel-for-pixel Astro port of the nōta homepage (originally a TanStack Start/React app in the
parent folder). Design, layout, copy, assets, and GSAP scroll animations are unchanged — only
the framework changed.

## Why Astro here

- **No React shipped.** The original GSAP code never actually depended on React state — it drove
  the DOM directly via refs/`querySelector`. Each section here is a `.astro` component with a
  `<script>` tag that does the same GSAP/ScrollTrigger setup, scoped to that component's own root
  element.
- **Content is separated from markup.** `src/content/homepage.ts` holds every string and media
  reference for the page behind `getHomepageContent()`. Components receive their copy as props
  rather than hardcoding it. When this project is wired up to Strapi, that function's body becomes
  a `fetch` call — the templates don't change.
- **Assets are self-hosted.** All images/video were downloaded from the original site's CDN into
  `public/assets/` so this project doesn't depend on that CDN staying up. `src/lib/assets.ts` is
  the single place that maps asset keys to paths — swap it to Strapi media URLs later.

## Commands

All commands are run from this directory (`astro-app/`), using Bun:

```bash
bun install       # install dependencies
bun run dev        # start the dev server
bun run build       # type-check and build for production
bun run preview     # preview the production build
```

## Structure

- `src/pages/index.astro` — assembles the 11 homepage sections
- `src/components/*.astro` — one file per section (Hero, Specs, SyncScene, InsideBox, etc.)
- `src/layouts/Layout.astro` — `<html>`/`<head>` shell, fonts, global stylesheet, SEO meta
- `src/content/homepage.ts` — all page copy, typed
- `src/lib/assets.ts` — local asset path registry
- `src/lib/motion.ts` — shared GSAP helpers (`initGsap`, `splitChars`, `splitWords`)
- `src/styles/global.css` — Tailwind v4 theme + design tokens, copied from the original project
