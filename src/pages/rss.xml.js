import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION } from "../consts";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { prepareTitle } from "../utils";
const parser = new MarkdownIt();

export async function GET(context) {
    let blog = await getCollection("blog");
    blog = blog.filter((post) => !post.data.draft);
    return rss({
        stylesheet: "/rss/styles.xsl",
        title: "Žan Černe's Blog",
        description: SITE_DESCRIPTION,
        site: context.site,
        items: blog.map((post) => ({
            title: prepareTitle(post.data.title, "", post.body, true, true),
            pubDate: post.data.pubDate,
            description: post.body.slice(0, 140) + "...",
            customData: post.data.customData,
            content:
                sanitizeHtml(parser.render(post.body)) +
                `<p><small>Images may be present in this article. View them by opening the article in a browser.</small></p>
                <p><small><a href="https://cernezan.com/blog/${post.slug}">Open in browser.</a></small></p>`,
            // Compute RSS link from post `slug`
            // This example assumes all posts are rendered as `/blog/[slug]` routes
            link: `/blog/${post.slug}/`,
        })),
    });
}
