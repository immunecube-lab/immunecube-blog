// app/page.tsx
import Link from "next/link";
import { BookOpen, PenLine } from "lucide-react";
import * as site from "@/.velite";

// 홈은 정적이어도 충분합니다(velite는 빌드 시점에 생성됨).
// export const dynamic = "force-dynamic";  // ❌ 제거 권장
// export const runtime = "nodejs";         // 필요하면 유지 가능(없어도 대개 OK)

type Entry = {
  title: string;
  href: string;
  dateLabel?: string; // "YYYY.MM.DD" (없으면 표시 안 함)
  kind: "blog" | "docs";
};

const MAX_ITEMS_EACH = 5;

/* ----------------------------- utils ----------------------------- */

function normalizeSlugPart(slug: string) {
  const s = slug.startsWith("/") ? slug.slice(1) : slug;
  if (s.startsWith("docs/")) return s.slice("docs/".length);
  if (s.startsWith("posts/")) return s.slice("posts/".length);
  if (s.startsWith("blog/")) return s.slice("blog/".length);
  return s;
}

function formatYmdDot(v?: string | Date) {
  if (!v) return undefined;
  const d = v instanceof Date ? v : new Date(v);
  if (Number.isNaN(d.getTime())) return undefined;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

function getDocHref(slug: string) {
  if (!slug) return "/docs";
  if (slug.startsWith("/")) return slug;
  if (slug.startsWith("docs/")) return `/${slug}`;
  return `/docs/${slug}`;
}

function getBlogHref(slug: string) {
  // velite slug가 "posts/xxx" 형태일 수도 있으니 방어
  const s = normalizeSlugPart(slug);
  return `/blog/${encodeURIComponent(s)}`;
}

/* ----------------------------- velite types ----------------------------- */

type VelitePost = {
  slug: string;
  title: string;
  published?: boolean;
  date?: string;
  updated?: string;
};

type VeliteDoc = {
  slug: string;
  title: string;
  published?: boolean;
  date?: string;
  updated?: string;
  order?: number;
};

/* ----------------------------- page ----------------------------- */

export default function Home() {
  const posts = (((site as any).posts ?? []) as VelitePost[])
    .filter((p) => p.published !== false)
    .map((p) => {
      const label = formatYmdDot(p.updated ?? p.date);
      const dt = (p.updated ?? p.date) ? new Date(p.updated ?? p.date!) : null;
      return {
        title: p.title,
        href: getBlogHref(p.slug),
        dateLabel: label,
        _dt: dt?.getTime() ?? 0,
        kind: "blog" as const,
      };
    })
    .sort((a, b) => (b._dt ?? 0) - (a._dt ?? 0));

  const docs = (((site as any).docs ?? []) as VeliteDoc[])
    .filter((d) => d.published !== false)
    .map((d) => {
      const label = formatYmdDot(d.updated ?? d.date);
      const dt = (d.updated ?? d.date) ? new Date(d.updated ?? d.date!) : null;
      return {
        title: d.title,
        href: getDocHref(d.slug),
        dateLabel: label,
        _dt: dt?.getTime() ?? 0,
        kind: "docs" as const,
      };
    })
    // 문서는 order가 있는 경우 그것도 존중하고 싶으면 아래를 바꾸면 됩니다.
    // 여기서는 "최근 업데이트" 목적이므로 날짜 기준 정렬
    .sort((a, b) => (b._dt ?? 0) - (a._dt ?? 0));

  const blogLatest: Entry[] = posts.slice(0, MAX_ITEMS_EACH).map(({ _dt, ...x }) => x);
  const docsLatest: Entry[] = docs.slice(0, MAX_ITEMS_EACH).map(({ _dt, ...x }) => x);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* 소개 */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">immunecube</h1>

          <div className="mt-4 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
            <img
              src="/images/hero.svg"
              alt="연구와 기록을 상징하는 면역 아카이브 이미지"
              className="h-40 w-full object-contain sm:h-48 md:h-56"
              fetchPriority="high"
            />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            면역 과학 아카이브:
            <br />
            연구 논문, 공식 자료, 그리고 해설 블로그를 한 곳에서 읽고 정리합니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 transition"
            >
              블로그로 가기
            </Link>

            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition"
            >
              문서 보기
            </Link>
          </div>
        </section>

        {/* 최근 업데이트 */}
        <section className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-base font-semibold">최근 업데이트</h2>
            <p className="text-xs text-neutral-500">updated → date 기준으로 정렬됩니다.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* 블로그 */}
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-2">
                  <PenLine className="h-4 w-4 text-neutral-700" aria-hidden />
                  <div className="font-semibold">블로그</div>
                </div>
                <Link
                  href="/blog"
                  className="text-xs rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-neutral-700 hover:bg-neutral-100 transition"
                >
                  전체 보기
                </Link>
              </div>

              {blogLatest.length === 0 ? (
                <div className="px-5 pb-5 text-sm text-neutral-600">아직 블로그 글이 없습니다.</div>
              ) : (
                <ul className="divide-y divide-neutral-100">
                  {blogLatest.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-5 py-4 hover:bg-neutral-50 transition"
                        title={item.title}
                      >
                        <div className="truncate font-medium">{item.title}</div>
                        {item.dateLabel && (
                          <div className="mt-1 text-xs text-neutral-500">{item.dateLabel}</div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 문서 */}
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-neutral-700" aria-hidden />
                  <div className="font-semibold">문서</div>
                </div>
                <Link
                  href="/docs"
                  className="text-xs rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-neutral-700 hover:bg-neutral-100 transition"
                >
                  전체 보기
                </Link>
              </div>

              {docsLatest.length === 0 ? (
                <div className="px-5 pb-5 text-sm text-neutral-600">아직 문서가 없습니다.</div>
              ) : (
                <ul className="divide-y divide-neutral-100">
                  {docsLatest.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-5 py-4 hover:bg-neutral-50 transition"
                        title={item.title}
                      >
                        <div className="truncate font-medium">{item.title}</div>
                        {item.dateLabel && (
                          <div className="mt-1 text-xs text-neutral-500">{item.dateLabel}</div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
