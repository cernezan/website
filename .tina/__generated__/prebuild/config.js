import { defineConfig as a } from "tinacms";
const i = "main", o = a({
  branch: i,
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
        ui: {
          filename: {
            readonly: !1,
            slugify: (e) => {
              var t;
              return `${((t = e == null ? void 0 : e.title) == null ? void 0 : t.toLowerCase().replace(/ /g, "-")) || "NO TITLE DEFINED"}`;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: !1
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            required: !1,
            ui: {
              defaultValue: !0
            }
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
            options: [
              "\u{1F4BB} Tech",
              "\u{1F604} Personal",
              "\u{1F4DD} Article",
              "\u{1F517} Links",
              "\u{1F951} Health"
            ],
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
  o as default
};
