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
  },
});
