/**
 * Local asset registry. Every value is a plain string path so this file can
 * later be swapped for a fetch against Strapi's media library without
 * touching any component markup — only the values here change.
 */
export const NOTA = {
  logo: "/assets/images/logo.svg",

  // Pen, rotating sequence (scene 7)
  pen: [
    "/assets/images/pen-01.jpg",
    "/assets/images/pen-02.jpg",
    "/assets/images/pen-03.jpg",
    "/assets/images/pen-04.jpg",
    "/assets/images/pen-05.jpg",
  ],

  // Notebook, rotating sequence (scene 4)
  notebook: [
    "/assets/images/notebook-01.jpg",
    "/assets/images/notebook-02.jpg",
    "/assets/images/notebook-03.jpg",
    "/assets/images/notebook-04.jpg",
  ],

  // Tall editorial blocks
  blockNotebook: "/assets/images/block-notebook.jpg",
  blockPaper: "/assets/images/block-paper.jpg",
  blockNotes: "/assets/images/block-notes.jpg",
  blockPattern: "/assets/images/block-pattern.png",

  penUpright: "/assets/images/pen-upright.png",
  boxSet: "/assets/images/box-set.png",

  videoWriting: "/assets/videos/writing.mp4",
  videoDetails: "/assets/videos/details.mp4",

  ogImage: "/assets/images/notebook-01.jpg",
} as const;
