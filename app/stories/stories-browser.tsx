"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatYmdDot } from "@/components/utils/date";
import { normalizeStorySlug, type StoryWithMeta } from "./_lib";

function pickDisplayDate(story: StoryWithMeta) {
  return formatYmdDot(story.updated ?? story.date);
}

function sortStories(stories: StoryWithMeta[]) {
  return [...stories].sort((a, b) => {
    const at = new Date(a.updated ?? a.date ?? 0).getTime();
    const bt = new Date(b.updated ?? b.date ?? 0).getTime();
    return bt - at;
  });
}

export function StoriesBrowser({ stories }: { stories: StoryWithMeta[] }) {
  const searchParams = useSearchParams();

  const all = sortStories(stories);
  const categories = Array.from(
    new Set(
      all
        .map((story) => (story.category ?? "").trim())
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b, "ko"));

  const requestedCategory = (searchParams.get("category") ?? "").trim();
  const activeCategory = categories.includes(requestedCategory)
    ? requestedCategory
    : "";

  const visible = all.filter((story) => {
    if (!activeCategory) return true;
    return (story.category ?? "").trim() === activeCategory;
  });

  const featured = visible.filter((story) => story.featured);
  const normal = visible.filter((story) => !story.featured);

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="mb-8 border-b border-neutral-200 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            {activeCategory ? activeCategory : "면역이야기"}
          </h1>
          {activeCategory && (
            <Link
              href="/stories"
              className="text-xs font-medium text-neutral-500 hover:text-neutral-900"
            >
              전체 글 보기 →
            </Link>
          )}
        </div>
        <p className="mt-2 text-base leading-7 text-neutral-600">
          {activeCategory
            ? `'${activeCategory}' 분류에 등록된 이야기 모음입니다.`
            : "노년의 건강과 면역을 매일 이야기하듯 쉽고 차분하게 설명합니다."}
        </p>
      </div>

      {/* Main Content Stream */}
      <div className="space-y-10">
        {/* Featured stories */}
        {featured.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-bold text-neutral-900">
              추천 이야기
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {featured.map((story) => {
                const label = pickDisplayDate(story);
                const slugPart = normalizeStorySlug(story.slug);

                return (
                  <Link
                    key={story.slug}
                    href={`/stories/${encodeURIComponent(slugPart)}`}
                    prefetch={false}
                    className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 shadow-xs transition hover:border-neutral-400 hover:shadow-md"
                  >
                    <div>
                      {story.cover && (
                        <Image
                          src={story.cover}
                          alt={story.title}
                          width={640}
                          height={360}
                          className="mb-4 h-44 w-full rounded-lg object-cover"
                        />
                      )}
                      {story.category && (
                        <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-600">
                          {story.category}
                        </span>
                      )}
                      <h3 className="mt-2 text-lg font-bold text-neutral-900 group-hover:text-emerald-700">
                        {story.title}
                      </h3>
                      {story.description && (
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                          {story.description}
                        </p>
                      )}
                    </div>
                    {label && (
                      <p className="mt-4 text-xs text-neutral-400">{label}</p>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Normal stories list */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-neutral-900">
            {activeCategory ? `'${activeCategory}' 관련 글` : "모든 이야기"}
          </h2>
          {normal.length === 0 ? (
            <p className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
              해당 분류에 속한 이야기가 없습니다.
            </p>
          ) : (
            <div className="space-y-3">
              {normal.map((story) => {
                const label = pickDisplayDate(story);
                const slugPart = normalizeStorySlug(story.slug);

                return (
                  <Link
                    key={story.slug}
                    href={`/stories/${encodeURIComponent(slugPart)}`}
                    prefetch={false}
                    className="group block rounded-xl border border-neutral-200 bg-white p-4 shadow-xs transition hover:border-neutral-400 hover:bg-neutral-50/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {story.category && (
                            <span className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
                              {story.category}
                            </span>
                          )}
                          {story.series && (
                            <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                              {story.series.title} #{story.series.order}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1.5 text-base font-semibold text-neutral-900 group-hover:text-emerald-700">
                          {story.title}
                        </h3>
                        {story.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
                            {story.description}
                          </p>
                        )}
                      </div>
                      {label && (
                        <span className="shrink-0 text-xs text-neutral-400">
                          {label}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
