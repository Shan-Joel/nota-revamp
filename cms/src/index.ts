import type { Core } from '@strapi/strapi';
import { seedContent } from './seed';

const SITE_CONTENT = new Set(['api::homepage.homepage', 'api::not-found-page.not-found-page']);

// The site is static: it only shows newly published content after Vercel rebuilds it.
async function triggerSiteRebuild(strapi: Core.Strapi) {
  const url = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!url) return;
  try {
    const res = await fetch(url, { method: 'POST' });
    strapi.log.info(`[rebuild] Vercel deploy hook responded ${res.status}`);
  } catch (error) {
    strapi.log.error(`[rebuild] Vercel deploy hook failed: ${(error as Error).message}`);
  }
}

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(async (context, next) => {
      const result = await next();
      if (
        SITE_CONTENT.has(context.uid) &&
        (context.action === 'publish' || context.action === 'unpublish')
      ) {
        void triggerSiteRebuild(strapi);
      }
      return result;
    });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Content seeded on a fresh deploy isn't on the live site until it rebuilds.
    if (await seedContent(strapi)) void triggerSiteRebuild(strapi);
  },
};
