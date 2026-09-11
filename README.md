# nōta — Astro site

Astro rebuild of the nōta homepage. Every text, image and video on the page comes from the Strapi
CMS in [`../cms`](../cms); this project holds only the layout, styles and GSAP animations.

## Running locally

1. Start Strapi from `../cms`:

   ```bash
   npm run develop
   ```

   The API runs at http://localhost:1337 and the admin panel at http://localhost:1337/admin.
   On a fresh database, run `npm run seed` there once to upload the media and publish the
   homepage.

2. Start this site:

   ```bash
   npm install
   npm run dev
   ```

   Open http://localhost:4321. In dev, a page refresh shows the latest published Strapi content.

`STRAPI_URL` (server-only, defaults to `http://localhost:1337`) tells Astro where Strapi runs. Set it
in `.env` or your build environment for anything other than local dev.

## How content flows

- `src/lib/strapi.ts` fetches the published **Homepage** single type through Strapi's public,
  read-only API and maps it into the `HomepageContent` shape.
- `src/content/homepage.ts` defines that shape. `getHomepageContent()` is the only entry point
  pages use; components receive their slice of it as props.
- The site builds to static files. After editors publish in Strapi, rebuild the site — for
  example with a Strapi webhook that calls your host's deploy hook.
- Media are served from Strapi's `/uploads`, so the built site must be able to reach Strapi (or a
  cloud upload provider).

The hero's scroll animation cuts the pen out of its photo with an outline traced from the studio
pen render (`PenFrame.astro`). Replacing the hero image with a different shot breaks that cutout.

## Commands

```bash
npm run dev        # start the dev server
npm run build      # type-check and build for production (needs Strapi running)
npm run preview    # preview the production build
```

## Structure

- `src/pages/index.astro` — assembles the homepage sections
- `src/components/*.astro` — one file per section, plus `PenFrame.astro` for the pen imagery
- `src/layouts/Layout.astro` — `<html>`/`<head>` shell, fonts, global stylesheet, SEO meta
- `src/content/homepage.ts` — the typed content shape and `getHomepageContent()`
- `src/lib/strapi.ts` — Strapi fetch and response mapping
- `src/lib/motion.ts` — shared GSAP helpers (`initGsap`, `splitChars`, `splitWords`)
- `src/styles/global.css` — Tailwind v4 theme and design tokens
