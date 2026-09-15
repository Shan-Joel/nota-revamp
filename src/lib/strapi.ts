import { STRAPI_URL } from "astro:env/server";
import type { HomepageContent, NavLink } from "@/content/homepage";
import type { NotFoundContent } from "@/content/not-found";

interface Media {
  url: string;
  alternativeText: string | null;
}

interface Panel {
  eyebrow: string;
  headline: string;
  paragraph: string;
}

// Shape of GET /api/homepage with POPULATE below (Strapi 5 flattened response).
interface StrapiHomepage {
  seo: { title: string; description: string; themeColor: string; ogImage: Media };
  nav: { logo: string; links: NavLink[]; cta: NavLink; ctaPrice: string };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    body: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    image: Media;
    imageAlt: string | null;
  };
  specs: { title: string; subtitle: string; groups: { title: string; items: { text: string }[] }[] };
  philosophy: { quote: string; body: string };
  whoFor: {
    video: Media;
    headlinePrefix: string;
    headlineItalic: string;
    paragraphLead: string;
    paragraphSecondary: string;
    audiences: { title: string; body: string }[];
  };
  syncScene: {
    frames: Media[];
    firstFrameAlt: string | null;
    captions: { headline: string; headlineItalic: string | null; body: string | null }[];
  };
  smartPaper: {
    headline: string;
    headlineItalic: string;
    image1: Media;
    image1Alt: string | null;
    panel1: Panel;
    panel2: Panel;
    image2: Media;
    image2Alt: string | null;
  };
  insideBox: {
    frames: Media[];
    firstFrameAlt: string | null;
    headline: string;
    headlineItalic: string;
    details: { label: string; note: string }[];
  };
  boxSet: {
    heading: string;
    headingItalic: string;
    paragraph: string;
    items: { title: string; description: string }[];
    video: Media;
    poster: Media;
  };
  order: {
    eyebrow: string;
    headline: string;
    paragraph: string;
    price: string;
    cta: NavLink;
    image: Media;
    imageAlt: string | null;
  };
  footer: {
    linksTitle: string;
    backToTop: NavLink;
    copyright: string;
    logo: string;
    credit: string;
  };
}

// Shape of GET /api/not-found-page with its two link components populated.
interface StrapiNotFoundPage {
  seoTitle: string;
  code: string;
  eyebrow: string;
  headline: string;
  headlineItalic: string;
  body: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
}

const POPULATE: Record<string, string> = {
  "populate[seo][populate]": "*",
  "populate[nav][populate]": "*",
  "populate[hero][populate]": "*",
  "populate[specs][populate][groups][populate]": "*",
  "populate[philosophy]": "true",
  "populate[whoFor][populate]": "*",
  "populate[syncScene][populate]": "*",
  "populate[smartPaper][populate]": "*",
  "populate[insideBox][populate]": "*",
  "populate[boxSet][populate]": "*",
  "populate[order][populate]": "*",
  "populate[footer][populate]": "*",
};

async function fetchSingleType<T>(path: string, populate: Record<string, string>): Promise<T> {
  const url = new URL(path, STRAPI_URL);
  for (const [key, value] of Object.entries(populate)) url.searchParams.set(key, value);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText} (${url.origin}${path})`);
  }
  const json = (await res.json()) as { data: T | null };
  if (!json.data) throw new Error(`Strapi has no published entry at ${path}.`);
  return json.data;
}

export const fetchHomepage = () => fetchSingleType<StrapiHomepage>("/api/homepage", POPULATE);

export const fetchNotFoundPage = () =>
  fetchSingleType<StrapiNotFoundPage>("/api/not-found-page", {
    "populate[primaryCta]": "true",
    "populate[secondaryCta]": "true",
  });

// Local uploads come back as "/uploads/..." paths; cloud providers return absolute URLs.
const mediaUrl = (media: Media) => new URL(media.url, STRAPI_URL).toString();

// Cloudinary serves an upload byte-for-byte, and these MP4s keep their index at the end, so playback waits on an
// extra range request. Its optimised delivery re-encodes to a smaller file that streams from the first bytes.
const videoUrl = (media: Media) =>
  mediaUrl(media).replace("/video/upload/", "/video/upload/f_auto:video,q_auto/");

// Page images get the same treatment: Cloudinary picks AVIF/WebP per browser and tunes quality.
// (The OG image keeps its original URL, since social crawlers expect a plain JPEG or PNG.)
const imageUrl = (media: Media) =>
  mediaUrl(media).replace("/image/upload/", "/image/upload/f_auto,q_auto/");

const link = ({ label, href }: NavLink): NavLink => ({ label, href });

const image = (media: Media, alt: string | null) => ({
  src: imageUrl(media),
  alt: alt || media.alternativeText || "",
});

// Only the first frame of a sequence is announced; the rest are decorative crossfades.
const frames = (list: Media[], firstAlt: string | null) =>
  list.map((media, i) => ({
    src: imageUrl(media),
    alt: i === 0 ? firstAlt || media.alternativeText || "" : "",
  }));

const counter = (i: number) => String(i + 1).padStart(2, "0");

export function toHomepageContent(s: StrapiHomepage): HomepageContent {
  return {
    seo: {
      title: s.seo.title,
      description: s.seo.description,
      themeColor: s.seo.themeColor,
      ogImage: mediaUrl(s.seo.ogImage),
    },
    nav: {
      logo: s.nav.logo,
      links: s.nav.links.map(link),
      cta: { ...link(s.nav.cta), price: s.nav.ctaPrice },
    },
    hero: {
      eyebrow: s.hero.eyebrow,
      headlineLine1: s.hero.headlineLine1,
      headlineLine2: s.hero.headlineLine2,
      body: s.hero.body,
      primaryCta: link(s.hero.primaryCta),
      secondaryCta: link(s.hero.secondaryCta),
      image: image(s.hero.image, s.hero.imageAlt),
    },
    specs: {
      title: s.specs.title,
      subtitle: s.specs.subtitle,
      groups: s.specs.groups.map((g) => ({ title: g.title, items: g.items.map((i) => i.text) })),
    },
    philosophy: { quote: s.philosophy.quote, body: s.philosophy.body },
    whoFor: {
      video: { src: videoUrl(s.whoFor.video) },
      headlinePrefix: s.whoFor.headlinePrefix,
      headlineItalic: s.whoFor.headlineItalic,
      paragraphs: [s.whoFor.paragraphLead, s.whoFor.paragraphSecondary],
      audiences: s.whoFor.audiences.map((a, i) => ({ n: counter(i), title: a.title, body: a.body })),
    },
    syncScene: {
      frames: frames(s.syncScene.frames, s.syncScene.firstFrameAlt),
      captions: s.syncScene.captions.map((c) => ({
        headline: c.headline,
        headlineItalic: c.headlineItalic ?? undefined,
        body: c.body ?? undefined,
      })),
    },
    smartPaper: {
      headline: s.smartPaper.headline,
      headlineItalic: s.smartPaper.headlineItalic,
      image1: image(s.smartPaper.image1, s.smartPaper.image1Alt),
      panel1: s.smartPaper.panel1,
      panel2: s.smartPaper.panel2,
      image2: image(s.smartPaper.image2, s.smartPaper.image2Alt),
    },
    insideBox: {
      frames: frames(s.insideBox.frames, s.insideBox.firstFrameAlt),
      headline: s.insideBox.headline,
      headlineItalic: s.insideBox.headlineItalic,
      details: s.insideBox.details.map(({ label, note }) => ({ label, note })),
      grid: {
        heading: s.boxSet.heading,
        headingItalic: s.boxSet.headingItalic,
        paragraph: s.boxSet.paragraph,
        items: s.boxSet.items.map(({ title, description }) => ({ title, desc: description })),
        video: { src: videoUrl(s.boxSet.video), poster: imageUrl(s.boxSet.poster) },
      },
    },
    order: {
      eyebrow: s.order.eyebrow,
      headline: s.order.headline,
      paragraph: s.order.paragraph,
      price: s.order.price,
      cta: link(s.order.cta),
      image: image(s.order.image, s.order.imageAlt),
    },
    footer: {
      linksTitle: s.footer.linksTitle,
      backToTop: link(s.footer.backToTop),
      copyright: s.footer.copyright,
      logo: s.footer.logo,
      credit: s.footer.credit,
    },
  };
}

export function toNotFoundContent(s: StrapiNotFoundPage): NotFoundContent {
  return {
    seoTitle: s.seoTitle,
    code: s.code,
    eyebrow: s.eyebrow,
    headline: s.headline,
    headlineItalic: s.headlineItalic,
    body: s.body,
    primaryCta: link(s.primaryCta),
    secondaryCta: link(s.secondaryCta),
  };
}
