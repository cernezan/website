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
            required: !1
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
            options: ["\u{1F4BB} Tech", "\u{1F604} Personal", "\u{1F4DD} Article", "\u{1F517} Links"],
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
