---
title: Integrated Tina CMS to my blog
pubDate: '2023-03-04T23:00:00.000Z'
---

I know how passionate people can get when talking about CMS - Content Management Systems. I hadn't taken a deep dive into the CMS world before, because my previous projects mostly used WordPress. This time, I decided to build something more custom, and have some fun with Astro, so I had to pick a CMS, since I quickly realized how hard it would be to keep my content well-organized.

### Tina CMS

I chose [Tina CMS](https://tina.io/), mostly due to it being one of the recommended CMS in Astro documentation. It was quite simple to integrate this CMS into Astro, though it took me some time to figure out the production build with GitHub Actions. I'm sure that if you're using something like GitHub Pages, Netlify, or Vercel, the process is pretty straightforward.

While trying to figure things out, I also found a small mistake in Astro's docs and opened a pull request with a fix. It's one of the most satisfying things to contribute to another project, even if it's something small, like a broken link fix.

So far, Tina CMS has been a good choice. I like that I own my content since everything is still stored as a .md file in my GitHub repository. The Admin dashboard UI looks okay, and I appreciate the separate Media Manager section for my other files.

### Site Updates

I've added some small changes to the website, like an updated header and a better article/page layout. It's not perfect, but I absolutely love that I can build in public. Another thing I noticed that I like about my website is the simplicity. I know there aren't many "functionalities" implemented yet, but still I want to strive for a clean design.

The next big thing I want to implement is adding categories and images. I can actually add images already; I just want to do better optimization with pre-build [Astro components](https://docs.astro.build/en/guides/images/#astros-image-integration).
