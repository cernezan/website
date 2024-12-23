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
                                    .replace(/'/g, "")
                                    .replace(/ /g, "-") || "NO TITLE DEFINED"
                            }`;
                        },
                    },
                },
                defaultItem: () => ({
                    draft: true,
                    pubDate: new Date().toISOString(),
                }),
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
                            "Bitesize",
                            "Wellbeing & Growth",
                            "Technology",
                            "Creativity",
                        ],
                        required: true,
                    },
                    {
                        type: "image",
                        name: "image",
                        label: "Cover Image",
                        required: false,
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body",
                        isBody: true,
                    },
                    {
                        type: "boolean",
                        name: "draft",
                        label: "Draft",
                        required: false,
                    },
                ],
            },
        ],
    },
});
