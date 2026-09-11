import type { NavLink } from "@/content/homepage";
import { fetchNotFoundPage, toNotFoundContent } from "@/lib/strapi";

export interface NotFoundContent {
  seoTitle: string;
  code: string;
  eyebrow: string;
  headline: string;
  headlineItalic: string;
  body: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
}

// All 404 page copy comes from the published Strapi "404 page" single type.
export async function getNotFoundContent(): Promise<NotFoundContent> {
  return toNotFoundContent(await fetchNotFoundPage());
}
