"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { normalizeStorySlug, type StoryWithMeta } from "./_lib";

type SeriesGroup = {
  title: string;
  stories: StoryWithMeta[];
};

export function LeftSidebar({
  categories,
  seriesGroups,
}: {
  categories: string[];
  seriesGroups: SeriesGroup[];
}) {
  const searchParams = useSearchParams();
  const currentCategory = (searchParams.get("category") ?? "").trim();

  const [openSeries, setOpenSeries] = useState<Record<string, boolean>>({});

  const toggleSeries = (title: string) => {
    setOpenSeries((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="hidden w-60 shrink-0 border-r border-neutral-200 pr-6 text-sm md:block">
      <div className="mb-6 border-b border-neutral-100 pb-4">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-wide text-neutral-400 hover:text-neutral-700"
        >
          immunecube
        </Link>
        <h2 className="mt-1 text-lg font-bold text-neutral-900">면역이야기</h2>
        <p className="mt-1 text-xs leading-5 text-neutral-500">
          노년의 건강과 면역 이야기
        </p>
      </div>

      <nav className="space-y-6">
        {/* All stories link */}
        <div>
          <Link
            href="/stories"
            className={[
              "block rounded-lg px-2.5 py-1.5 font-medium transition",
              !currentCategory
                ? "bg-neutral-900 text-white font-semibold"
                : "text-neutral-700 hover:bg-neutral-100",
            ].join(" ")}
          >
            전체 글 보기
          </Link>
        </div>

        {/* Categories section */}
        {categories.length > 0 && (
          <div>
            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              분류
            </div>
            <div className="space-y-0.5">
              {categories.map((category) => {
                const isActive = currentCategory === category;
                return (
                  <Link
                    key={category}
                    href={`/stories?category=${encodeURIComponent(category)}`}
                    className={[
                      "block rounded-lg px-2.5 py-1.5 text-xs transition",
                      isActive
                        ? "bg-neutral-900 text-white font-semibold"
                        : "text-neutral-700 hover:bg-neutral-100",
                    ].join(" ")}
                  >
                    {category}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Series Accordion section */}
        {seriesGroups.length > 0 && (
          <div>
            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              연재 시리즈
            </div>
            <div className="space-y-1.5">
              {seriesGroups.map((group) => {
                const isOpen = !!openSeries[group.title];

                return (
                  <div
                    key={group.title}
                    className="overflow-hidden rounded-lg border border-neutral-200/80 bg-neutral-50/70"
                  >
                    <button
                      type="button"
                      onClick={() => toggleSeries(group.title)}
                      className="flex w-full items-center justify-between px-2.5 py-2 text-left text-xs font-semibold text-neutral-800 hover:bg-neutral-100"
                    >
                      <span className="line-clamp-1 flex-1 pr-1 font-medium">
                        {group.title}
                      </span>
                      <svg
                        className={`h-3.5 w-3.5 shrink-0 text-neutral-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="border-t border-neutral-200 bg-white p-2">
                        <ul className="space-y-1">
                          {group.stories.map((story) => {
                            const slugPart = normalizeStorySlug(story.slug);
                            const orderNum = story.series?.order ?? 1;

                            return (
                              <li key={story.slug}>
                                <Link
                                  href={`/stories/${encodeURIComponent(slugPart)}`}
                                  prefetch={false}
                                  className="group flex items-start gap-1.5 rounded px-1.5 py-1 text-[11px] transition hover:bg-neutral-50"
                                >
                                  <span className="shrink-0 font-bold text-emerald-700">
                                    {orderNum}화
                                  </span>
                                  <span className="line-clamp-2 text-neutral-700 group-hover:text-emerald-700">
                                    {story.title}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}
