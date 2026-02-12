// app/blog/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import { posts } from "@/.velite";
import { type PostWithMeta } from "./_lib";

const CATEGORY_LABELS: Record<string, string> = {
  notice: "공지사항",
  article: "기사",
};

function categoryLabel(cat: string) {
  return CATEGORY_LABELS[cat] ?? cat;
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  const all = [...(posts as PostWithMeta[])].filter((p) => p.published !== false);

  // ✅ 카테고리 목록만 생성
  const categories = Array.from(
    new Set(
      all
        .map((p) => (p.category ?? "").trim())
        .filter((v) => v.length > 0)
    )
  ).sort((a, b) => {
    const order = (x: string) => (x === "notice" ? 0 : x === "article" ? 1 : 2);
    const d = order(a) - order(b);
    return d !== 0 ? d : a.localeCompare(b, "ko");
  });

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

          {/* ✅ 카테고리만 표시 */}
          {categories.length > 0 && (
            <div className="pt-2">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                분류
              </div>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/blog?category=${encodeURIComponent(cat)}`}
                    className="block rounded-md px-2 py-1 text-neutral-800 hover:bg-neutral-100"
                  >
                    {categoryLabel(cat)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </aside>

      {/* 오른쪽 메인 영역 */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
