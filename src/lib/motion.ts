import type { gsap as gsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export type MotionCtx = {
  gsap: typeof gsapType;
  ScrollTrigger: typeof ScrollTriggerType;
  root: HTMLElement;
  reduced: boolean;
};

type Setup = (ctx: MotionCtx) => void;

const pending: { root: HTMLElement; setup: Setup }[] = [];
let flushing: Promise<void> | undefined;

export function initGsap(root: HTMLElement | null, setup: Setup) {
  if (!root) return;
  pending.push({ root, setup });
  flushing ??= flush();
}

// ScrollTrigger computes pin spacing in creation order, so sections must be set up top-to-bottom.
async function flush() {
  const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("lenis"),
    domReady(),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced) startSmoothScroll(gsap, ScrollTrigger, Lenis);

  const batch = pending
    .splice(0)
    .sort((a, b) =>
      a.root.compareDocumentPosition(b.root) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
  for (const { root, setup } of batch) setup({ gsap, ScrollTrigger, root, reduced });

  ScrollTrigger.refresh();
  flushing = undefined;
}

// Lenis eases native scrolling; ScrollTrigger reads its position every frame so scrubbed scenes stay in sync.
function startSmoothScroll(
  gsap: typeof gsapType,
  ScrollTrigger: typeof ScrollTriggerType,
  Lenis: typeof import("lenis").default,
) {
  // Anchor targets already carry scroll-mt-20 for the fixed header, which Lenis honours.
  const lenis = new Lenis({ lerp: 0.09, anchors: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function domReady() {
  return document.readyState === "loading"
    ? new Promise<void>((resolve) =>
        document.addEventListener("DOMContentLoaded", () => resolve(), { once: true }),
      )
    : Promise.resolve();
}

/** Wraps every character of an element's text in spans, ready to stagger. */
export function splitChars(el: HTMLElement, { clipTop = true } = {}): HTMLElement[] {
  if (el.dataset["split"] === "done") {
    return Array.from(el.querySelectorAll<HTMLElement>("[data-char]"));
  }
  const source = (el.textContent ?? "").trim();
  el.textContent = "";
  const out: HTMLElement[] = [];

  source.split(/(\s+)/).forEach((chunk) => {
    if (/^\s+$/.test(chunk)) {
      el.appendChild(document.createTextNode(" "));
      return;
    }
    const word = document.createElement("span");
    word.style.display = "inline-block";
    word.style.whiteSpace = "nowrap";
    for (const ch of chunk) {
      const outer = document.createElement("span");
      outer.style.display = "inline-block";
      // Clipping only the bottom keeps diacritics above the line box (the Ō macron) visible.
      if (clipTop) outer.style.overflow = "hidden";
      else outer.style.clipPath = "inset(-1em -1em 0 -1em)";
      outer.style.verticalAlign = "top";
      const inner = document.createElement("span");
      inner.setAttribute("data-char", "");
      inner.style.display = "inline-block";
      inner.textContent = ch;
      outer.appendChild(inner);
      word.appendChild(outer);
      out.push(inner);
    }
    el.appendChild(word);
  });

  el.dataset["split"] = "done";
  return out;
}

/** Wraps every word of an element's text in spans, ready to stagger. */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset["split"] === "done") {
    return Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
  }
  const source = (el.textContent ?? "").trim();
  el.textContent = "";
  const out: HTMLElement[] = [];

  source.split(/(\s+)/).forEach((chunk) => {
    if (/^\s+$/.test(chunk)) {
      el.appendChild(document.createTextNode(" "));
      return;
    }
    const word = document.createElement("span");
    word.setAttribute("data-word", "");
    word.style.display = "inline-block";
    word.textContent = chunk;
    el.appendChild(word);
    out.push(word);
  });

  el.dataset["split"] = "done";
  return out;
}
