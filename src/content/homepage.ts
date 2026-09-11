import { NOTA } from "@/lib/assets";

/**
 * All homepage copy and media references, in one typed module.
 *
 * `getHomepageContent()` returns this data synchronously today, but is
 * declared `async` and every `.astro` page/component that consumes it
 * `await`s the call — so wiring this up to Strapi later is a matter of
 * replacing this function's body with a fetch that returns the same shape,
 * not a template rewrite. The nested arrays here (spec groups, audience
 * cards, box details) map directly onto Strapi repeatable components.
 */

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

const homepageContent: HomepageContent = {
  seo: {
    title: "NŌTA — Smart Pen for Real Thinking",
    description:
      "Nota One is a smart writing system: a precision fountain pen, smart paper, and real-time sync that turns handwriting into searchable, structured notes.",
    themeColor: "#1a1a19",
    ogImage: NOTA.ogImage,
  },
  nav: {
    logo: "NŌTA",
    links: [
      { label: "Specifications", href: "#specifications" },
      { label: "Who it's for", href: "#who" },
      { label: "About", href: "#about" },
      { label: "Inside the box", href: "#inside" },
    ],
    cta: { label: "Nota One", price: "$300", href: "#order" },
  },
  hero: {
    eyebrow: "Nota One — Writing infrastructure",
    headlineLine1: "Smart pen",
    headlineLine2: "for real thinking",
    body: "A precision smart pen, intelligent paper and real-time sync. Write the way you always have — keep everything.",
    primaryCta: { label: "Reserve Nota One", href: "#order" },
    secondaryCta: { label: "Specifications", href: "#specifications" },
    image: {
      src: NOTA.pen[0],
      alt: "The NŌTA smart pen, a machined aluminium fountain pen, floating against a graphite backdrop",
    },
  },
  specs: {
    title: "Specifications",
    subtitle: "Nota One — smart pen",
    groups: [
      {
        title: "Writing System",
        items: [
          "Fountain pen nib",
          "Natural ink flow",
          "Replaceable fountain-pen ink cartridge",
          "Designed for precise, expressive handwriting",
        ],
      },
      {
        title: "Capture Technology",
        items: [
          "High-precision optical tracking",
          "Real-time stroke capture",
          "Line-by-line accuracy",
          "Supports handwriting, diagrams, sketches",
        ],
      },
      {
        title: "Digital Continuity",
        items: [
          "Notes sync automatically",
          "Searchable over time",
          "Structured with AI support",
          "Ready when you return",
        ],
      },
    ],
  },
  philosophy: {
    quote: "Some thoughts need time, space, and a physical trace to exist.",
    body: "Writing by hand creates focus, presence, and a deeper connection with ideas. This tool is built around that simple truth.",
  },
  whoFor: {
    video: { src: NOTA.videoWriting },
    headlinePrefix: "Made for people who",
    headlineItalic: "think on paper",
    paragraphs: [
      "It keeps handwriting natural and focused, letting you write the way you always have — without distractions or screens getting in the way.",
      "Everything you write syncs to the app, where your notes are organized, searchable, and ready to work with AI when you need more clarity or structure.",
    ],
    audiences: [
      {
        n: "01",
        title: "Students & Learners",
        body: "Handwritten notes stay personal and intuitive, but become searchable, organized, and easy to study. Lectures, ideas, and revisions are captured as they are — then supported by AI summaries, text recognition, and quick navigation when it matters most.",
      },
      {
        n: "02",
        title: "Creators, Designers & Architects",
        body: "Sketches, diagrams, concepts, and fragments of ideas belong on paper. This tool makes sure they don't disappear. Everything drawn or written is safely stored, easy to revisit, and ready to evolve into something bigger — without interrupting the creative flow.",
      },
      {
        n: "03",
        title: "Managers & Product Thinkers",
        body: "Meetings start on paper and end with structure. Notes turn into clear summaries, tasks, and follow-ups. The pen captures everything quietly, while the app helps organize decisions without pulling attention away from the room.",
      },
    ],
  },
  syncScene: {
    frames: NOTA.notebook.map((src, i) => ({
      src,
      alt: i === 0 ? "NŌTA smart paper notebook seen from above on a black surface" : "",
    })),
    captions: [
      { headline: "Everything you write is synced to your phone in real time" },
      {
        headline: "Your notes. Already there.",
        body: "Every note is instantly transferred to your device and safely stored in your personal space.",
      },
      { headline: "No delays. No glitches. ", headlineItalic: "No random effects." },
      {
        headline: "AI-powered structure",
        body: "Handwriting is processed in real time and enriched quietly in the background — text, structure and context, organized while you keep writing.",
      },
    ],
  },
  smartPaper: {
    headline: "Looks like paper. ",
    headlineItalic: "Works like a system.",
    image1: {
      src: NOTA.blockNotes,
      alt: "An open NŌTA notebook with a handwritten checklist and red annotations",
    },
    panel1: {
      eyebrow: "For you, it's just a blank sheet",
      headline: "You write freely, without grids, guides, or visible markers",
      paragraph:
        "The paper feels clean and familiar, keeping your focus on ideas instead of tools. Nothing changes in how you write — only what becomes possible after.",
    },
    panel2: {
      eyebrow: "For the pen, it's a precise map",
      headline: "We use special paper with a nearly invisible pattern",
      paragraph:
        "The pattern defines exact coordinates across the page, so the pen captures every stroke with precision. For you it feels like ordinary paper. For the system it is a stable reference.",
    },
    image2: {
      src: NOTA.blockPaper,
      alt: "Close view of NŌTA smart paper showing its almost invisible dot pattern",
    },
  },
  insideBox: {
    frames: NOTA.pen.map((src, i) => ({
      src,
      alt: i === 0 ? "The NŌTA smart pen rotating, showing its aluminium body and nib" : "",
    })),
    headline: "Inside ",
    headlineItalic: "the box",
    details: [
      { label: "Flush-fit precision cap", note: "Refined colors. Personal expression." },
      { label: "Durable metal nib", note: "Low-profile control button." },
      { label: "Aluminum body", note: "USB-C charging, Bluetooth, 8h of active use." },
    ],
    grid: {
      heading: "A complete, ",
      headingItalic: "ready-to-use set",
      paragraph:
        "Smart pen, smart-paper notepad, charging cable, and instructions — carefully packaged for a hassle-free start.",
      items: [
        {
          title: "The NŌTA Smart Pen",
          desc: "Aluminum body, USB-C charging, physical control button, Bluetooth.",
        },
        {
          title: "Smart Paper Notepad",
          desc: "Nearly invisible coordinate pattern on natural, uncoated paper.",
        },
        {
          title: "Charging Adapter",
          desc: "Compact USB-C adapter with stable output and minimal heat.",
        },
        { title: "Instructions", desc: "A short guide to pairing, writing, and syncing." },
      ],
      video: { src: NOTA.videoDetails, poster: NOTA.boxSet },
    },
  },
  order: {
    eyebrow: "Order",
    headline: "Nota One",
    paragraph:
      "Smart pen, smart-paper notepad, charging adapter and instructions. Shipping with the first production run.",
    price: "$300",
    cta: { label: "Get early access", href: "#stay-ahead" },
    image: {
      src: NOTA.boxSet,
      alt: "The complete Nota One set: smart pen, smart paper notepad and charging adapter",
    },
  },
  footer: {
    linksTitle: "Explore",
    backToTop: { label: "Back to top", href: "#top" },
    copyright: "© 2026 Nōta Team",
    logo: "NŌTA",
    credit: "Designed by Alice & UPROCK Studio",
  },
};

export async function getHomepageContent(): Promise<HomepageContent> {
  return homepageContent;
}
