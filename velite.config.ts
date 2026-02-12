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
        published: s.boolean().default(true),
        body: s.mdx(),
        tags: s.array(s.string()).optional(),
        category: s.string().optional(),
        cover: s.string().optional(),
        featured: s.boolean().default(false),
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
        published: s.boolean().default(true), // ✅ docs에서도 published 필터 쓰면 추가 추천
        body: s.mdx(),
        tags: s.array(s.string()).optional(),
        category: s.string().optional(),
        section: s.string().optional(), // ✅ 추가: 이게 핵심
        order: s.number().optional(),
        cover: s.string().optional(),
        featured: s.boolean().default(false),
      }),
    },
  },
});
