import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config

import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
    site: "https://cernezan.com",
    output: "hybrid",
    integrations: [mdx(), sitemap(), tailwind(), sitemap(), AstroPWA()],
    markdown: {
        drafts: false,
    },
    hydrateURLs: true,
});
