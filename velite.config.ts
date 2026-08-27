// velite.config.ts
import { defineConfig, s } from "velite";

export default defineConfig({
  root: "content",

  collections: {
    posts: {
      name: "Post",
      pattern: "posts/**/*.mdx",
      schema: s.object({
        title: s.string(),
        description: s.string().optional(),
        date: s.isodate(),
        updated: s.isodate().optional(),
        slug: s.slug("posts"),
        status: s.string().optional(),
        published: s.boolean().default(true),
        body: s.mdx(),
        tags: s.array(s.string()).optional(),
        category: s.string().optional(),
        cover: s.string().optional(),
        featured: s.boolean().default(false),
        series: s
          .object({
            title: s.string(),
            order: s.number(),
            total: s.number().optional(),
          })
          .optional(),
      }),
    },

    stories: {
      name: "Story",
      pattern: "stories/**/*.mdx",
      schema: s.object({
        title: s.string(),
        description: s.string().optional(),
        date: s.isodate(),
        updated: s.isodate().optional(),
        slug: s.slug("stories"),
        status: s.string().optional(),
        published: s.boolean().default(true),
        body: s.mdx(),
        tags: s.array(s.string()).optional(),
        category: s.string().optional(),
        cover: s.string().optional(),
        featured: s.boolean().default(false),
        series: s
          .object({
            title: s.string(),
            order: s.number(),
            total: s.number().optional(),
          })
          .optional(),
      }),
    },

    docs: {
      name: "Doc",
      pattern: "docs/**/*.mdx",
      schema: s.object({
        title: s.string(),
        description: s.string().optional(),
        date: s.isodate().optional(),
        updated: s.isodate().optional(),
        slug: s.slug("docs"),
        status: s.string().optional(),
        published: s.boolean().default(true),
        body: s.mdx(),
        tags: s.array(s.string()).optional(),
        category: s.string().optional(),
        section: s.string().optional(),
        docType: s.string().optional(),
        order: s.number().optional(),
        cover: s.string().optional(),
        featured: s.boolean().default(false),
        series: s
          .object({
            title: s.string(),
            order: s.number(),
            total: s.number().optional(),
          })
          .optional(),
      }),
    },

    drafts: {
      name: "DraftDoc",
      pattern: "draft/**/*.mdx",
      schema: s.object({
        title: s.string(),
        description: s.string().optional(),
        date: s.isodate().optional(),
        updated: s.isodate().optional(),
        slug: s.slug("docs"),
        status: s.string().optional(),
        published: s.boolean().default(false),
        body: s.mdx(),
        tags: s.array(s.string()).optional(),
        category: s.string().optional(),
        section: s.string().optional(),
        docType: s.string().optional(),
        order: s.number().optional(),
        cover: s.string().optional(),
        featured: s.boolean().default(false),
        series: s
          .object({
            title: s.string(),
            order: s.number(),
            total: s.number().optional(),
          })
          .optional(),
      }),
    },
  },
});
