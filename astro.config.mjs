import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "static",
  // One small stylesheet: inlining it saves a render-blocking round trip on mobile.
  build: { inlineStylesheets: "always" },
  experimental: {
    // Self-hosts the fonts at build time with preloads and size-matched fallbacks, replacing the
    // render-blocking Google Fonts stylesheet. latin-ext carries the macron in "nōta".
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Instrument Serif",
        cssVariable: "--font-instrument-serif",
        weights: [400],
        styles: ["normal", "italic"],
        subsets: ["latin", "latin-ext"],
        fallbacks: ["serif"],
      },
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter",
        weights: [400, 500, 600],
        styles: ["normal"],
        subsets: ["latin", "latin-ext"],
        fallbacks: ["sans-serif"],
      },
    ],
  },
  env: {
    schema: {
      STRAPI_URL: envField.string({
        context: "server",
        access: "public",
        default: "http://localhost:1337",
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
    // Strapi lives in cms/ and rewrites files there while running; keep Astro's dev watcher out of it.
    server: { watch: { ignored: ["**/cms/**"] } },
    // Pre-bundle the animation libraries at startup; lazy discovery re-optimizes mid-session and 504s open pages.
    optimizeDeps: { include: ["gsap", "gsap/ScrollTrigger", "gsap/MotionPathPlugin", "lenis"] },
  },
});
