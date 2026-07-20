"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

function resolveCategory(stories: StoryWithMeta[], search: string) {
  const categories = Array.from(
    new Set(
      stories
        .map((story) => (story.category ?? "").trim())
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b, "ko"));
  const params = new URLSearchParams(search);
  const requested = (params.get("category") ?? "").trim();
  return categories.includes(requested) ? requested : "";
}

export function StoriesBrowser({ stories }: { stories: StoryWithMeta[] }) {
  const all = sortStories(stories);
  const categories = Array.from(
    new Set(
      all
        .map((story) => (story.category ?? "").trim())
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b, "ko"));
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const syncFromLocation = () => {
      setActiveCategory(resolveCategory(stories, window.location.search));
    };

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, [stories]);

  const visible = all.filter((story) => {
    if (!activeCategory) return true;
    return (story.category ?? "").trim() === activeCategory;
  });
  const featured = visible.filter((story) => story.featured);
  const normal = visible.filter((story) => !story.featured);

  function updateCategory(category: string) {
    const safeCategory = categories.includes(category) ? category : "";
    setActiveCategory(safeCategory);

    const params = new URLSearchParams(window.location.search);
    if (safeCategory) {
      params.set("category", safeCategory);
    } else {
      params.delete("category");
    }

    const query = params.toString();
    const nextUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;
    window.history.pushState({}, "", nextUrl);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">면역이야기</h1>
      <p className="mt-3 text-base leading-7 text-neutral-600">
        노년의 건강과 면역을 매일 이야기하듯 쉽고 차분하게 설명합니다.
      </p>

      {categories.length > 0 && (
        <section className="mb-8 mt-8">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => updateCategory("")}
              className={[
                "rounded-full border px-3 py-1.5 text-sm transition",
                activeCategory === ""
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
              ].join(" ")}
            >
              전체
            </button>

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => updateCategory(category)}
                className={[
                  "rounded-full border px-3 py-1.5 text-sm transition",
                  activeCategory === category
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">추천 글</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((story) => {
              const label = pickDisplayDate(story);
              const slugPart = normalizeStorySlug(story.slug);

              return (
                <Link
                  key={story.slug}
                  href={`/stories/${encodeURIComponent(slugPart)}`}
                  prefetch={false}
                  className="block rounded-xl border p-4 hover:bg-neutral-50"
                >
                  {story.cover && (
                    <img
                      src={story.cover}
                      alt={story.title}
                      className="mb-3 h-40 w-full rounded-lg object-cover"
                    />
                  )}
                  <h3 className="text-lg font-semibold">{story.title}</h3>
                  {story.description && (
                    <p className="mt-1 text-sm text-neutral-600">
                      {story.description}
                    </p>
                  )}
                  {label && (
                    <p className="mt-1 text-xs text-neutral-400">{label}</p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className={categories.length > 0 ? "" : "mt-8"}>
        <h2 className="mb-4 text-2xl font-semibold">모든 글</h2>
        {normal.length === 0 ? (
          <p className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-neutral-500">
            새로운 면역이야기를 준비하고 있습니다.
          </p>
        ) : (
          <ul className="space-y-3">
            {normal.map((story) => {
              const label = pickDisplayDate(story);
              const slugPart = normalizeStorySlug(story.slug);

              return (
                <li key={story.slug}>
                  <Link
                    href={`/stories/${encodeURIComponent(slugPart)}`}
                    prefetch={false}
                    className="block rounded-md px-2 py-2 hover:bg-neutral-50"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-base font-semibold">{story.title}</h3>
                      {label && (
                        <span className="shrink-0 text-[11px] text-neutral-400">
                          {label}
                        </span>
                      )}
                    </div>
                    {story.description && (
                      <p className="mt-1 text-sm text-neutral-600">
                        {story.description}
                      </p>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
