// app/blog/page.tsx
import Link from 'next/link'
import { posts } from '@/.velite'
import type { Post } from '@/.velite'

// Velite Post 타입에 내가 추가한 메타 필드만 살짝 더해줌
type PostWithMeta = Post & {
  featured?: boolean
  cover?: string
  tags?: string[]
  category?: string
}

export default function BlogPage() {
  // Velite에서 온 posts를 PostWithMeta 배열로 간주
  const all = [...posts] as PostWithMeta[]

  // published 된 글만, 최신순 정렬
  const visible = all
    .filter(p => p.published !== false) // undefined면 true로 취급
    .sort((a, b) => b.date.localeCompare(a.date))

  const featured = visible.filter(p => p.featured)
  const normal = visible.filter(p => !p.featured)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* 상단 제목 */}
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        생활면역 & 연구 노트
      </h1>

      {/* 1) featured 섹션 (있을 때만 표시) */}
      {featured.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">추천 글</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-xl border p-4 hover:bg-neutral-50"
              >
                {post.cover && (
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="mb-3 h-40 w-full rounded-lg object-cover"
                  />
                )}
                <h3 className="text-lg font-semibold">{post.title}</h3>
                {post.description && (
                  <p className="mt-1 text-sm text-neutral-600">
                    {post.description}
                  </p>
                )}
                <p className="mt-1 text-xs text-neutral-400">{post.date}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 2) 일반 리스트 섹션 */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">모든 글</h2>
        <ul className="space-y-3">
          {normal.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-md px-2 py-2 hover:bg-neutral-50"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-semibold">{post.title}</h3>
                  <span className="shrink-0 text-[11px] text-neutral-400">
                    {post.date}
                  </span>
                </div>
                {post.description && (
                  <p className="mt-1 text-sm text-neutral-600">
                    {post.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
