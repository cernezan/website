import {defineCollection, z} from "astro:content";

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		headerImage: z.string().optional(),
		draft: z.boolean().optional(),
	}),
});

export const collections = {blog};

