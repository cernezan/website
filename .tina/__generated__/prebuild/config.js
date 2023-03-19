import { defineConfig as e } from "tinacms";
const t = "main", l = e({
  branch: t,
  clientId: "'clientIdHIDDEN'",
  token: "'tokenTinaHIDDEN'",
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
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: !0,
            required: !0
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Date Posted",
            required: !0
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["sm", "med", "lg", "xl"],
            required: !0
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: !0
          }
        ]
      }
    ]
  }
});
export {
  l as default
};
