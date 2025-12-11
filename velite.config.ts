// velite.config.ts
import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/*.mdx',
      schema: s.object({
        // 기존 필드
        title: s.string(),
        description: s.string().optional(),
        date: s.isodate(),
        slug: s.slug('posts'),
        published: s.boolean().default(true),
        body: s.mdx(),

        // 확장 필드
        tags: s.array(s.string()).optional(),     // ["면역", "자율신경"]
        category: s.string().optional(),          // "blog" | "docs" | "note"
        cover: s.string().optional(),             // "/images/autonomic.jpg"
        featured: s.boolean().default(false),     // 메인 상단에 노출할 글
      }),
    },
  },
})
