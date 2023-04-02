import {defineConfig} from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = "main";

export default defineConfig({
	branch,
	clientId: "'clientIdHIDDEN'", // Get this from tina.io
	token: "'tokenTinaHIDDEN'", // Get this from tina.io
	build: {
		outputFolder: "admin",
		publicFolder: "public",
	},
	media: {
		tina: {
			mediaRoot: "media",
			publicFolder: "public",
		},
	},
	schema: {
		collections: [
			{
				name: "post",
				label: "Posts",
				path: "src/content/blog/",
				fields: [
					{
						type: "string",
						name: "title",
						label: "Title",
						isTitle: true,
						required: true,
					},
					{
						type: "datetime",
						name: "pubDate",
						label: "Date Posted",
						required: true,
					},
					{
						type: "string",
						name: "category",
						label: "Category",
						options: ["💻 Tech", "😄 Personal", "📝 Article", "🔗 Links"],
						required: true,
					},
					{
						type: "rich-text",
						name: "body",
						label: "Body",
						isBody: true,
					},
				],
			},
		],
	},
});

