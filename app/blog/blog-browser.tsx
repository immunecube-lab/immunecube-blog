"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatYmdDot } from "@/components/utils/date";
import { normalizePostSlug } from "./_lib";

type PostWithMeta = {
  slug: string;
  title: string;
  description?: string;
  published?: boolean;
  date?: string;
  updated?: string;
  featured?: boolean;
  cover?: string;
  tags?: string[];
  category?: string;
};

function pickDisplayDate(post: PostWithMeta) {
  return formatYmdDot(post.updated ?? post.date);
}

function sortPosts(posts: PostWithMeta[]) {
  return [...posts].sort((a, b) => {
    const at = new Date(a.updated ?? a.date ?? 0).getTime();
    const bt = new Date(b.updated ?? b.date ?? 0).getTime();
    return bt - at;
  });
}

function resolveCategory(posts: PostWithMeta[], search: string) {
  const categories = Array.from(
    new Set(
      posts
        .map((post) => (post.category ?? "").trim())
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b, "ko"));
  const params = new URLSearchParams(search);
  const requested = (params.get("category") ?? "").trim();
  return categories.includes(requested) ? requested : "";
}

export function BlogBrowser({ posts }: { posts: PostWithMeta[] }) {
  const all = sortPosts(posts);
  const categories = Array.from(
    new Set(
      all
        .map((post) => (post.category ?? "").trim())
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b, "ko"));
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const syncFromLocation = () => {
      setActiveCategory(resolveCategory(posts, window.location.search));
    };

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, [posts]);

  const visible = all.filter((post) => {
    if (!activeCategory) return true;
    return (post.category ?? "").trim() === activeCategory;
  });
  const featured = visible.filter((post) => post.featured);
  const normal = visible.filter((post) => !post.featured);

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
    const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.pushState({}, "", nextUrl);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        생활면역 & 연구 노트
      </h1>

      {categories.length > 0 && (
        <section className="mb-8">
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
            {featured.map((post) => {
              const label = pickDisplayDate(post);
              const slugPart = normalizePostSlug(post.slug);

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${encodeURIComponent(slugPart)}`}
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
                    <p className="mt-1 text-sm text-neutral-600">{post.description}</p>
                  )}
                  {label && <p className="mt-1 text-xs text-neutral-400">{label}</p>}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-2xl font-semibold">모든 글</h2>
        <ul className="space-y-3">
          {normal.map((post) => {
            const label = pickDisplayDate(post);
            const slugPart = normalizePostSlug(post.slug);

            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${encodeURIComponent(slugPart)}`}
                  className="block rounded-md px-2 py-2 hover:bg-neutral-50"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-base font-semibold">{post.title}</h3>
                    {label && (
                      <span className="shrink-0 text-[11px] text-neutral-400">
                        {label}
                      </span>
                    )}
                  </div>
                  {post.description && (
                    <p className="mt-1 text-sm text-neutral-600">{post.description}</p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
