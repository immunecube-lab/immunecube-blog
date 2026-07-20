import type { ReactNode } from "react";
import Link from "next/link";
import { STORIES_INDEX } from "@/generated/content-index";
import { type StoryWithMeta } from "./_lib";

export default function StoriesLayout({ children }: { children: ReactNode }) {
  const all = [...(STORIES_INDEX as StoryWithMeta[])].filter(
    (story) => story.published !== false,
  );
  const categories = Array.from(
    new Set(
      all
        .map((story) => (story.category ?? "").trim())
        .filter((value) => value.length > 0),
    ),
  ).sort((a, b) => a.localeCompare(b, "ko"));

  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-4 py-8 sm:px-6 sm:py-10">
      <aside className="hidden w-56 shrink-0 border-r pr-6 text-sm md:block">
        <div className="mb-6">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
          >
            immunecube
          </Link>
          <h2 className="mt-1 text-lg font-bold">면역이야기</h2>
          <p className="mt-1 text-xs leading-5 text-neutral-500">
            노년의 건강과 면역을 누구나 이해할 수 있도록 쉽게 풀어씁니다.
          </p>
        </div>

        <nav className="mb-6 space-y-1">
          <Link
            href="/stories"
            className="block rounded-md px-2 py-1 text-neutral-800 hover:bg-neutral-100"
          >
            전체 글
          </Link>

          {categories.length > 0 && (
            <div className="pt-2">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                분류
              </div>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/stories?category=${encodeURIComponent(category)}`}
                    className="block rounded-md px-2 py-1 text-neutral-800 hover:bg-neutral-100"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
