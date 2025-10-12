import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      default: [],
    },
    lang: {
      type: "enum",
      options: ["en", "it", "es"],
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    url: {
      type: "string",
      resolve: (doc) => {
        const slug = doc._raw.sourceFileName.replace(/\.mdx$/, "");
        return `/${doc.lang}/blog/${slug}`;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
  },
});
