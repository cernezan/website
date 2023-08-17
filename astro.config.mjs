import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
// import image from "@astrojs/image";

// https://astro.build/config

import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
    site: "https://cernezan.com",
    integrations: [mdx(), sitemap(), tailwind(), sitemap(), AstroPWA()],
    markdown: {
        drafts: false,
    },
    experimental: {
        assets: true,
    },
    hydrateURLs: true,
    compressHTML: true,
});
