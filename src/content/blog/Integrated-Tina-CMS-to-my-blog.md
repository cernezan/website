---
title: Integrated Tina CMS to my blog
pubDate: '2023-03-04T23:00:00.000Z'
---

I know how passhonate people can get when talking about CMS - Content Management Systems. I never really took a deep dive into CMS word, because my previous projects mostly used Wordpress. This time I decided to build something more custom and have some fun with Astro so I had to pick a CMS since I quickly relized how hard it's going to be to keep my content well organized. 

### Tina CMS

I've picked Tina CMS mostly due to being one of the recommended CMS in Astro documentation. It was quite simple to integrate this CMS into Astro however it took my some time to figure out production build with Github Actions. I'm sure that if you're using something like Github Pages, Netlify or Vercel the process is prety straight forward.

While trying to figure things out I also found some small mistake in Astro docs and opened a pull request with a fix. It's one of the most satifing thing to contribute to another project, even if it's something small like  a broken link fix.

So far Tine CMS has been a good choice. I like that I own my content since everything is still stored as .md file in my Github repository. The Admin dashboard UI looks ok and I apprciate the seperate Media Manager section for my other files.

### Site Updates

I've added some small changes to the website like updated header and better article/page layout. It's not perfect but I absolutley love that I can build in public. Another thing that I noticed that I like about my website is the simplicity. I know there aren't a lot of "functionalities" implemented yet, but still I want to strive for the clean design.

Next big thing I want to implement is adding categories and images. I mean I can already add images I just want to do better optimization with some of the [Astro's \<Image/> component](https://docs.astro.build/en/guides/images/#astros-image-integration). 