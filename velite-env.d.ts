// velite-env.d.ts
declare module '@/.velite' {
  export interface ContentBase {
    title: string
    description?: string
    date?: string
    updated?: string
    slug: string
    published: boolean
    body: string
    tags?: string[]
    category?: string
    cover?: string
    featured: boolean
  }

  export interface Post {
    title: string
    description?: string
    date: string        // s.isodate() 결과 (ISO string)
    updated?: string
    slug: string
    published: boolean
    body: string        // s.mdx() 로 나온 MDX 코드 문자열
    tags?: string[]
    category?: string
    cover?: string
    featured: boolean
  }

  export interface Doc extends ContentBase {
    section?: string
    docType?: string
    order?: number
  }

  export const posts: Post[]
  export const docs: Doc[]
  export const drafts: Doc[]
}
