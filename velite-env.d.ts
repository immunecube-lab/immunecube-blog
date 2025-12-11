// velite-env.d.ts
declare module '@/.velite' {
  export interface Post {
    title: string
    description?: string
    date: string        // s.isodate() 결과 (ISO string)
    slug: string
    published: boolean
    body: string        // s.mdx() 로 나온 MDX 코드 문자열
  }

  export const posts: Post[]
}
