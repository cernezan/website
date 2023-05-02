import { defineConfig } from "tinacms";

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
                ui: {
                    filename: {
                        // if disabled, the editor can not edit the filename
                        readonly: false,
                        // Example of using a custom slugify function
                        slugify: (values) => {
                            // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
                            return `${
                                values?.title
                                    ?.toLowerCase()
                                    .replace(/ /g, "-") || "NO TITLE DEFINED"
                            }`;
                        },
                    },
                },
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        required: false,
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
                        options: [
                            "💻 Tech",
                            "😄 Personal",
                            "📝 Article",
                            "🔗 Links",
                            "🥑 Health",
                        ],
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
