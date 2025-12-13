// velite.config.ts
import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',

  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string().optional(),
        date: s.isodate(),
        slug: s.slug('posts'),
        published: s.boolean().default(true),
        body: s.mdx(),
        tags: s.array(s.string()).optional(),
        category: s.string().optional(),
        cover: s.string().optional(),
        featured: s.boolean().default(false),
      }),
    },

    docs: {
      name: 'Doc',
      pattern: 'docs/**/*.mdx', // ← 이 패턴 매우 중요
      schema: s.object({
        title: s.string(),
        description: s.string().optional(),
        date: s.isodate().optional(),  // 문서는 날짜 없을 수도 있음
        slug: s.slug('docs'),
        body: s.mdx(),
        tags: s.array(s.string()).optional(),
        category: s.string().optional(),
        cover: s.string().optional(),
        featured: s.boolean().default(false),
      }),
    },
  },
})
