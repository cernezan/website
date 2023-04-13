import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION } from '../consts';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();	

export async function get(context) {
	let blog = await getCollection('blog');
	blog = blog.filter((post) => !post.data.draft);
	return rss({
		title: "Žan Černe's Blog",
		description: SITE_DESCRIPTION,
		site: context.site,
		items: blog.map((post) => ({
			title: post.data.title || '',
			pubDate: post.data.pubDate,
			description: post.data.description,
			customData: post.data.customData,
			content: sanitizeHtml(parser.render(post.body)),
			// Compute RSS link from post `slug`
			// This example assumes all posts are rendered as `/blog/[slug]` routes
			link: `/blog/${post.slug}/`,
		})),
	});
}