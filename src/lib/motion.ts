import type { gsap as gsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export type MotionCtx = {
  gsap: typeof gsapType;
  ScrollTrigger: typeof ScrollTriggerType;
  root: HTMLElement;
  reduced: boolean;
};

let registered = false;

/**
 * Runs a GSAP setup function scoped to `root`. Astro pages are full
 * document loads (no component unmount to clean up after), so unlike the
 * original React `useGsap` hook this never needs `gsap.context()`/revert —
 * it just imports GSAP, registers ScrollTrigger once, and runs `setup`.
 */
export async function initGsap(
  root: HTMLElement | null,
  setup: (ctx: MotionCtx) => void,
) {
  if (!root) return;

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  setup({ gsap, ScrollTrigger, root, reduced });
}

/** Wraps every character of an element's text in spans, ready to stagger. */
export function splitChars(el: HTMLElement): HTMLElement[] {
  if (el.dataset["split"] === "done") {
    return Array.from(el.querySelectorAll<HTMLElement>("[data-char]"));
  }
  const source = el.textContent ?? "";
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
      outer.style.overflow = "hidden";
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
  const source = el.textContent ?? "";
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
