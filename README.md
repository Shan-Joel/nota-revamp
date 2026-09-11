# nōta — Astro site

Astro rebuild of the nōta homepage. Every text, image and video on the page comes from the Strapi
CMS in [`cms`](cms); this project holds only the layout, styles and GSAP animations.

## Running locally

1. Start Strapi from `cms`:

   ```bash
   npm run develop
   ```

   The API runs at http://localhost:1337 and the admin panel at http://localhost:1337/admin.
   On an empty database, Strapi seeds itself on first start: it uploads the media in
   `cms/data/uploads` and publishes the homepage.

2. Start this site:

   ```bash
   npm install
   npm run dev
   ```

   Open http://localhost:4321. In dev, a page refresh shows the latest published Strapi content.

`STRAPI_URL` (server-only) tells Astro where Strapi runs. Dev defaults to `http://localhost:1337`;
production builds read it from `.env.production`.

## How content flows

- `src/lib/strapi.ts` fetches the published **Homepage** single type through Strapi's public,
  read-only API and maps it into the `HomepageContent` shape.
- `src/content/homepage.ts` defines that shape. `getHomepageContent()` is the only entry point
  pages use; components receive their slice of it as props.
- The site builds to static files, so it only shows newly published content after a rebuild.
- Media: local dev stores uploads in `cms/public/uploads`; production stores them on Cloudinary.

The hero's scroll animation cuts the pen out of its photo with an outline traced from the studio
pen render (`PenFrame.astro`). Replacing the hero image with a different shot breaks that cutout.

## Deployment

| Piece | Where | Notes |
| --- | --- | --- |
| Strapi | Railway service `nota-revamp` (root `/cms`) | Redeploys only when `cms/` changes; sleeps when idle |
| Database | Railway Postgres | Linked through `DATABASE_URL=${{Postgres.DATABASE_URL}}` |
| Media | Cloudinary, folder `nota` | Production-only upload provider (`cms/config/env/production`) |
| Site | Vercel, repo root | Static build; reads `STRAPI_URL` from `.env.production` |

Publishing or unpublishing the Homepage in Strapi calls the Vercel deploy hook stored in Railway's
`VERCEL_DEPLOY_HOOK_URL`, which rebuilds the live site (`cms/src/index.ts`).

Railway variables for the Strapi service: `NODE_ENV`, `DATABASE_CLIENT`, `DATABASE_URL`,
`DATABASE_POOL_MIN`, `PUBLIC_URL`, `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`,
`VERCEL_DEPLOY_HOOK_URL`, and Strapi's secrets (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`,
`JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`).

## Commands

```bash
npm run dev        # start the dev server
npm run build      # type-check and build for production (needs Strapi reachable)
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
- `cms/` — the Strapi project (content model, seed, production config)
