// app/blog/page.tsx
import Link from "next/link";
import { posts } from "@/.velite";
import type { Post } from "@/.velite";
import { formatYmdDot } from "@/components/utils/date";
import { normalizePostSlug } from "./_lib";

type PostWithMeta = Post & {
  featured?: boolean;
  cover?: string;
  tags?: string[];
  category?: string;
  updated?: string;
};

function pickDisplayDate(p: PostWithMeta) {
  return formatYmdDot((p.updated as any) ?? (p.date as any));
}

export default async function BlogPage(props: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const sp = (await props.searchParams) ?? {};
  const category = (sp.category ?? "").trim();

  const all = [...posts] as PostWithMeta[];

  const visible = all
    .filter((p) => p.published !== false)
    .filter((p) => {
      if (!category) return true; // 전체 글
      return (p.category ?? "").trim() === category;
    })
    .sort((a, b) => {
      const at = new Date((a.updated as any) ?? (a.date as any) ?? 0).getTime();
      const bt = new Date((b.updated as any) ?? (b.date as any) ?? 0).getTime();
      return bt - at;
    });

  const featured = visible.filter((p) => p.featured);
  const normal = visible.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        생활면역 & 연구 노트
      </h1>

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
                    <p className="mt-1 text-sm text-neutral-600">
                      {post.description}
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
                    <p className="mt-1 text-sm text-neutral-600">
                      {post.description}
                    </p>
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
