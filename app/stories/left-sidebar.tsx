"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();

  // Mobile menu toggle state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Extract current story slug if on /stories/[slug]
  const isStoriesHome = pathname === "/stories" || pathname === "/stories/";
  const currentSlugPart =
    pathname.startsWith("/stories/") && !isStoriesHome
      ? normalizeStorySlug(pathname.replace(/^\/stories\//, ""))
      : "";

  // Find active story in series groups
  let activeSeriesTitle = "";
  let activeStoryCategory = "";

  if (currentSlugPart) {
    for (const group of seriesGroups) {
      const found = group.stories.find(
        (s) => normalizeStorySlug(s.slug) === currentSlugPart
      );
      if (found) {
        activeSeriesTitle = group.title;
        activeStoryCategory = found.category ?? "";
        break;
      }
    }
  }

  const queryCategory = (searchParams?.get("category") ?? "").trim();
  const currentCategory = isStoriesHome
    ? queryCategory
    : activeStoryCategory || queryCategory;

  const routeKey = `${pathname}?${searchParams?.toString() ?? ""}`;
  const [seriesState, setSeriesState] = useState<{
    routeKey: string;
    overrides: Record<string, boolean>;
  }>({ routeKey, overrides: {} });
  const seriesOverrides = seriesState.routeKey === routeKey ? seriesState.overrides : {};

  // Route changes immediately discard stale overrides; the active series opens by default.
  const isSeriesOpen = (title: string) =>
    seriesOverrides[title] ?? title === activeSeriesTitle;

  const toggleSeries = (title: string) => {
    setSeriesState({
      routeKey,
      overrides: {
        ...seriesOverrides,
        [title]: !isSeriesOpen(title),
      },
    });
  };

  const navContent = (
    <nav className="space-y-6">
      {/* All stories link */}
      <div>
        <Link
          href="/stories"
          prefetch={false}
          onClick={() => setMobileOpen(false)}
          className={[
            "block rounded-lg px-3 py-2 text-xs md:text-sm font-medium transition",
            isStoriesHome && !queryCategory
              ? "bg-neutral-900 text-white font-semibold shadow-xs dark:bg-neutral-100 dark:text-neutral-900"
              : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
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
              const isActive = isStoriesHome
                ? queryCategory === category
                : currentCategory === category;
              return (
                <Link
                  key={category}
                  href={`/stories?category=${encodeURIComponent(category)}`}
                  prefetch={false}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "block rounded-lg px-2.5 py-1.5 text-xs transition",
                    isActive
                      ? "bg-neutral-900 text-white font-semibold dark:bg-neutral-100 dark:text-neutral-900"
                      : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
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
              const isOpen = isSeriesOpen(group.title);
              const isGroupActive = activeSeriesTitle === group.title;

              return (
                <div
                  key={group.title}
                  className={[
                    "overflow-hidden rounded-lg border transition",
                    isGroupActive
                      ? "border-emerald-300 bg-emerald-50/30 dark:border-emerald-800 dark:bg-emerald-950/20"
                      : "border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800 dark:bg-neutral-900/50",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => toggleSeries(group.title)}
                    className="flex w-full items-center justify-between px-2.5 py-2 text-left text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <span className="line-clamp-1 flex-1 pr-1 font-medium">
                      {group.title}
                    </span>
                    <span className="mr-1 rounded bg-neutral-200/60 px-1.5 py-0.5 text-[10px] text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400">
                      {group.stories.length}
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
                    <div className="border-t border-neutral-200/80 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-950">
                      <ul className="space-y-1">
                        {group.stories.map((story) => {
                          const slugPart = normalizeStorySlug(story.slug);
                          const orderNum = story.series?.order ?? 1;
                          const isCurrentStory =
                            currentSlugPart === slugPart;

                          return (
                            <li key={story.slug}>
                              <Link
                                href={`/stories/${encodeURIComponent(slugPart)}`}
                                onClick={() => setMobileOpen(false)}
                                prefetch={false}
                                className={[
                                  "group flex items-start gap-1.5 rounded px-2 py-1.5 text-[11px] transition",
                                  isCurrentStory
                                    ? "bg-emerald-100/70 font-semibold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
                                    : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900",
                                ].join(" ")}
                              >
                                <span
                                  className={[
                                    "shrink-0 font-bold",
                                    isCurrentStory
                                      ? "text-emerald-700 dark:text-emerald-400"
                                      : "text-emerald-600 dark:text-emerald-500",
                                  ].join(" ")}
                                >
                                  {orderNum}화
                                </span>
                                <span className="line-clamp-2 min-w-0 flex-1">
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
  );

  return (
    <>
      {/* Mobile Toggle Bar (visible on small screens) */}
      <div className="block md:hidden mb-4 print:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs font-semibold text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
        >
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {activeSeriesTitle
              ? `시리즈: ${activeSeriesTitle}`
              : currentCategory
              ? `분류: ${currentCategory}`
              : "면역이야기 메뉴 & 시리즈 목록"}
          </span>
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${
              mobileOpen ? "rotate-180" : ""
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

        {mobileOpen && (
          <div className="mt-2 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
            {navContent}
          </div>
        )}
      </div>

      {/* Desktop Sidebar (visible on md+ screens) */}
      <aside className="hidden w-60 shrink-0 border-r border-neutral-200 pr-6 text-sm md:block print:hidden dark:border-neutral-800">
        <div className="mb-6 border-b border-neutral-100 pb-4 dark:border-neutral-800">
          <Link
            href="/"
            prefetch={false}
            className="text-xs font-semibold uppercase tracking-wide text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            immunecube
          </Link>
          <h2 className="mt-1 text-lg font-bold text-neutral-900 dark:text-white">
            면역이야기
          </h2>
          <p className="mt-1 text-xs leading-5 text-neutral-500 dark:text-neutral-400">
            노년의 건강과 면역 이야기
          </p>
        </div>

        {navContent}
      </aside>
    </>
  );
}
