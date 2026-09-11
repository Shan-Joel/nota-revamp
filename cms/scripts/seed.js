"use strict";

// One-off: uploads the site's media, creates the published Homepage, and allows public reads of it.
// Safe to re-run: it skips the content if a Homepage already exists.

const fs = require("node:fs");
const path = require("node:path");
const { createStrapi, compileStrapi } = require("@strapi/strapi");

const UPLOADS = path.join(__dirname, "..", "data", "uploads");
const MIME = { ".jpg": "image/jpeg", ".png": "image/png", ".mp4": "video/mp4" };

const MEDIA = {
  pen1: ["pen-01.jpg", "NŌTA smart pen in graphite against a graphite backdrop"],
  pen2: ["pen-02.jpg", "NŌTA smart pen, colour variant"],
  pen3: ["pen-03.jpg", "NŌTA smart pen in blue"],
  pen4: ["pen-04.jpg", "NŌTA smart pen, colour variant"],
  pen5: ["pen-05.jpg", "NŌTA smart pen in copper"],
  notebook1: ["notebook-01.jpg", "NŌTA smart paper notebook seen from above on a black surface"],
  notebook2: ["notebook-02.jpg", "NŌTA smart paper notebook"],
  notebook3: ["notebook-03.jpg", "NŌTA smart paper notebook"],
  notebook4: ["notebook-04.jpg", "NŌTA smart paper notebook"],
  blockNotes: ["block-notes.jpg", "An open NŌTA notebook with a handwritten checklist and red annotations"],
  blockPaper: ["block-paper.jpg", "Close view of NŌTA smart paper showing its almost invisible dot pattern"],
  boxSet: ["box-set.png", "The complete Nota One set: smart pen, smart paper notepad and charging adapter"],
  videoWriting: ["writing.mp4", "Writing by hand with the NŌTA smart pen"],
  videoDetails: ["details.mp4", "Close-up details of the NŌTA smart pen"],
};

const link = (label, href) => ({ label, href });

const content = (m) => ({
  seo: {
    title: "NŌTA — Smart Pen for Real Thinking",
    description:
      "Nota One is a smart writing system: a precision fountain pen, smart paper, and real-time sync that turns handwriting into searchable, structured notes.",
    themeColor: "#1a1a19",
    ogImage: m.notebook1,
  },
  nav: {
    logo: "NŌTA",
    links: [
      link("Specifications", "#specifications"),
      link("Who it's for", "#who"),
      link("About", "#about"),
      link("Inside the box", "#inside"),
    ],
    cta: link("Nota One", "#order"),
    ctaPrice: "$300",
  },
  hero: {
    eyebrow: "Nota One — Writing infrastructure",
    headlineLine1: "Smart pen",
    headlineLine2: "for real thinking",
    body: "A precision smart pen, intelligent paper and real-time sync. Write the way you always have — keep everything.",
    primaryCta: link("Reserve Nota One", "#order"),
    secondaryCta: link("Specifications", "#specifications"),
    image: m.pen1,
    imageAlt:
      "The NŌTA smart pen, a machined aluminium fountain pen, floating against a graphite backdrop",
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
    ].map((group) => ({ ...group, items: group.items.map((text) => ({ text })) })),
  },
  philosophy: {
    quote: "Some thoughts need time, space, and a physical trace to exist.",
    body: "Writing by hand creates focus, presence, and a deeper connection with ideas. This tool is built around that simple truth.",
  },
  whoFor: {
    video: m.videoWriting,
    headlinePrefix: "Made for people who",
    headlineItalic: "think on paper",
    paragraphLead:
      "It keeps handwriting natural and focused, letting you write the way you always have — without distractions or screens getting in the way.",
    paragraphSecondary:
      "Everything you write syncs to the app, where your notes are organized, searchable, and ready to work with AI when you need more clarity or structure.",
    audiences: [
      {
        title: "Students & Learners",
        body: "Handwritten notes stay personal and intuitive, but become searchable, organized, and easy to study. Lectures, ideas, and revisions are captured as they are — then supported by AI summaries, text recognition, and quick navigation when it matters most.",
      },
      {
        title: "Creators, Designers & Architects",
        body: "Sketches, diagrams, concepts, and fragments of ideas belong on paper. This tool makes sure they don't disappear. Everything drawn or written is safely stored, easy to revisit, and ready to evolve into something bigger — without interrupting the creative flow.",
      },
      {
        title: "Managers & Product Thinkers",
        body: "Meetings start on paper and end with structure. Notes turn into clear summaries, tasks, and follow-ups. The pen captures everything quietly, while the app helps organize decisions without pulling attention away from the room.",
      },
    ],
  },
  syncScene: {
    frames: [m.notebook1, m.notebook2, m.notebook3, m.notebook4],
    firstFrameAlt: "NŌTA smart paper notebook seen from above on a black surface",
    captions: [
      { headline: "Everything you write is synced to your phone in real time" },
      {
        headline: "Your notes. Already there.",
        body: "Every note is instantly transferred to your device and safely stored in your personal space.",
      },
      { headline: "No delays. No glitches.", headlineItalic: "No random effects." },
      {
        headline: "AI-powered structure",
        body: "Handwriting is processed in real time and enriched quietly in the background — text, structure and context, organized while you keep writing.",
      },
    ],
  },
  smartPaper: {
    headline: "Looks like paper.",
    headlineItalic: "Works like a system.",
    image1: m.blockNotes,
    image1Alt: "An open NŌTA notebook with a handwritten checklist and red annotations",
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
    image2: m.blockPaper,
    image2Alt: "Close view of NŌTA smart paper showing its almost invisible dot pattern",
  },
  insideBox: {
    frames: [m.pen1, m.pen2, m.pen3, m.pen4, m.pen5],
    firstFrameAlt: "The NŌTA smart pen rotating, showing its aluminium body and nib",
    headline: "Inside",
    headlineItalic: "the box",
    details: [
      { label: "Flush-fit precision cap", note: "Refined colors. Personal expression." },
      { label: "Durable metal nib", note: "Low-profile control button." },
      { label: "Aluminum body", note: "USB-C charging, Bluetooth, 8h of active use." },
    ],
  },
  boxSet: {
    heading: "A complete,",
    headingItalic: "ready-to-use set",
    paragraph:
      "Smart pen, smart-paper notepad, charging cable, and instructions — carefully packaged for a hassle-free start.",
    items: [
      {
        title: "The NŌTA Smart Pen",
        description: "Aluminum body, USB-C charging, physical control button, Bluetooth.",
      },
      {
        title: "Smart Paper Notepad",
        description: "Nearly invisible coordinate pattern on natural, uncoated paper.",
      },
      {
        title: "Charging Adapter",
        description: "Compact USB-C adapter with stable output and minimal heat.",
      },
      { title: "Instructions", description: "A short guide to pairing, writing, and syncing." },
    ],
    video: m.videoDetails,
    poster: m.boxSet,
  },
  order: {
    eyebrow: "Order",
    headline: "Nota One",
    paragraph:
      "Smart pen, smart-paper notepad, charging adapter and instructions. Shipping with the first production run.",
    price: "$300",
    cta: link("Get early access", "#stay-ahead"),
    image: m.boxSet,
    imageAlt: "The complete Nota One set: smart pen, smart paper notepad and charging adapter",
  },
  footer: {
    linksTitle: "Explore",
    backToTop: link("Back to top", "#top"),
    copyright: "© 2026 Nōta Team",
    logo: "NŌTA",
    credit: "Designed by Alice & UPROCK Studio",
  },
});

async function upload(strapi, [fileName, alternativeText]) {
  const filepath = path.join(UPLOADS, fileName);
  const result = await strapi
    .plugin("upload")
    .service("upload")
    .upload({
      data: { fileInfo: { name: fileName, alternativeText, caption: "" } },
      files: {
        filepath,
        originalFilename: fileName,
        mimetype: MIME[path.extname(fileName)],
        size: fs.statSync(filepath).size,
      },
    });
  return (Array.isArray(result) ? result[0] : result).id;
}

async function allowPublicRead(strapi) {
  const role = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });
  const permissions = strapi.db.query("plugin::users-permissions.permission");
  const action = "api::homepage.homepage.find";
  if (!(await permissions.findOne({ where: { action, role: role.id } }))) {
    await permissions.create({ data: { action, role: role.id } });
  }
}

async function seed(strapi) {
  const homepage = strapi.documents("api::homepage.homepage");
  if (await homepage.findFirst()) {
    console.log("Homepage already exists; skipping content.");
  } else {
    const ids = {};
    for (const [key, entry] of Object.entries(MEDIA)) {
      ids[key] = await upload(strapi, entry);
      console.log(`Uploaded ${entry[0]}`);
    }
    await homepage.create({ data: content(ids), status: "published" });
    console.log("Created and published the Homepage.");
  }
  await allowPublicRead(strapi);
  console.log("Public role can read the Homepage.");
}

async function main() {
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = "error";
  try {
    await seed(app);
  } finally {
    await app.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
