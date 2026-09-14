import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "static",
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
