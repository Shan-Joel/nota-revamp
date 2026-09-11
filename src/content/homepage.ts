import { fetchHomepage, toHomepageContent } from "@/lib/strapi";

export interface NavLink {
  label: string;
  href: string;
}

export interface HomepageContent {
  seo: {
    title: string;
    description: string;
    themeColor: string;
    ogImage: string;
  };
  nav: {
    logo: string;
    links: NavLink[];
    cta: { label: string; price: string; href: string };
  };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    image: { src: string; alt: string };
  };
  specs: {
    title: string;
    subtitle: string;
    groups: { title: string; items: string[] }[];
  };
  philosophy: {
    quote: string;
    body: string;
  };
  whoFor: {
    video: { src: string };
    headlinePrefix: string;
    headlineItalic: string;
    paragraphs: [string, string];
    audiences: { n: string; title: string; body: string }[];
  };
  syncScene: {
    frames: { src: string; alt: string }[];
    captions: { headline: string; headlineItalic?: string; body?: string }[];
  };
  smartPaper: {
    headline: string;
    headlineItalic: string;
    image1: { src: string; alt: string };
    panel1: { eyebrow: string; headline: string; paragraph: string };
    panel2: { eyebrow: string; headline: string; paragraph: string };
    image2: { src: string; alt: string };
  };
  insideBox: {
    frames: { src: string; alt: string }[];
    headline: string;
    headlineItalic: string;
    details: { label: string; note: string }[];
    grid: {
      heading: string;
      headingItalic: string;
      paragraph: string;
      items: { title: string; desc: string }[];
      video: { src: string; poster: string };
    };
  };
  order: {
    eyebrow: string;
    headline: string;
    paragraph: string;
    price: string;
    cta: { label: string; href: string };
    image: { src: string; alt: string };
  };
  footer: {
    linksTitle: string;
    backToTop: NavLink;
    copyright: string;
    logo: string;
    credit: string;
  };
}

// All homepage copy and media come from the published Strapi "Homepage" single type.
export async function getHomepageContent(): Promise<HomepageContent> {
  return toHomepageContent(await fetchHomepage());
}
