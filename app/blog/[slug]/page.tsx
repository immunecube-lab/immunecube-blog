// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { posts } from '@/.velite'
import { MDXContent } from '@/components/mdx-content'

function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const post = getPost(slug)

  if (!post) return {}

  return {
    title: `${post.title} | Blog`,
    description: post.description,
  }
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const post = getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <div className="text-sm text-gray-500 mb-4">
        {new Date(post.date).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </div>

      {post.description && (
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          {post.description}
        </p>
      )}

      {/* 여기 .prose 가 Typography 플러그인 스타일을 적용하는 부분입니다 */}
      <article className="
      prose prose-slate dark:prose-invert max-w-none
      prose-h2:text-sky-500
    prose-h3:text-sky-400
    ">
        <MDXContent code={post.body} />
      </article>
    </div>
  )
}