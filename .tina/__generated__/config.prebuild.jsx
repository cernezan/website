// .tina/config.ts
import { defineConfig } from "tinacms";
var branch = "main";
var config_default = defineConfig({
  branch,
  clientId: "'clientIdHIDDEN'",
  // Get this from tina.io
  token: "'tokenTinaHIDDEN'",
  // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "public"
    }
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
              return `${values?.title?.toLowerCase().replace(/ /g, "-") || "NO TITLE DEFINED"}`;
            }
          }
        },
        defaultItem: () => ({
          draft: true,
          pubDate: /* @__PURE__ */ new Date()
        }),
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: false
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Date Posted",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "\u{1F4BB} Tech",
              "\u{1F604} Personal",
              "\u{1F4DD} Article",
              "\u{1F517} Links",
              "\u{1F951} Health"
            ],
            required: true
          },
          {
            type: "image",
            name: "image",
            label: "Cover Image",
            required: false
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            required: false
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};