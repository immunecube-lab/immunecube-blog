// app/blog/layout.tsx
import type { ReactNode } from 'react'
import Link from 'next/link'
import { posts } from '@/.velite'
import type { Post } from '@/.velite'

type PostWithMeta = Post & {
  featured?: boolean
  cover?: string
  tags?: string[]
  category?: string
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  // 최근 글 10개 정도만 사이드바에 노출
  const recent = [...(posts as PostWithMeta[])]
    .filter(p => p.published !== false)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10)

  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10">
      {/* 왼쪽 사이드바 */}
      <aside className="hidden w-56 shrink-0 border-r pr-6 text-sm md:block">
        <div className="mb-6">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
          >
            immunecube
          </Link>
          <h2 className="mt-1 text-lg font-bold">블로그</h2>
          <p className="mt-1 text-xs text-neutral-500">
            생활면역, 연구 노트, 개발 기록을 정리합니다.
          </p>
        </div>

        <nav className="mb-6 space-y-1">
          <Link
            href="/blog"
            className="block rounded-md px-2 py-1 text-neutral-800 hover:bg-neutral-100"
          >
            전체 글
          </Link>
          {/* 나중에 카테고리 생기면 여기 추가 */}
        </nav>

        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            최근 글
          </h3>
          <ul className="space-y-1">
            {recent.map(post => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded px-2 py-1 text-[13px] text-neutral-700 hover:bg-neutral-100"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* 오른쪽 메인 영역 */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
