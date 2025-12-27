// app/page.tsx
import Link from "next/link";
import { BookOpen, Bell, Compass } from "lucide-react";
import * as site from "@/.velite";

type Entry = {
  title: string;
  href: string;
  dateLabel?: string;
  kind: "blog" | "docs";
};

const MAX_DOC_ITEMS = 10;
const MAX_BLOG_ITEMS = 3;

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
};

/* ----------------------------- page ----------------------------- */

export default function Home() {
  const posts = (((site as any).posts ?? []) as VelitePost[])
    .filter((p) => p.published !== false)
    .map((p) => {
      const raw = p.updated ?? p.date;
      const label = formatYmdDot(raw);
      const dt = raw ? new Date(raw) : null;
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
      const raw = d.updated ?? d.date;
      const label = formatYmdDot(raw);
      const dt = raw ? new Date(raw) : null;
      return {
        title: d.title,
        href: getDocHref(d.slug),
        dateLabel: label,
        _dt: dt?.getTime() ?? 0,
        kind: "docs" as const,
      };
    })
    .sort((a, b) => (b._dt ?? 0) - (a._dt ?? 0));

  const docsLatest: Entry[] = docs.slice(0, MAX_DOC_ITEMS).map(({ _dt, ...x }) => x);
  const blogLatest: Entry[] = posts.slice(0, MAX_BLOG_ITEMS).map(({ _dt, ...x }) => x);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* 1) Hero / 정의 */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">immunecube</h1>

          <div className="mt-4 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
            <img
              src="/images/hero.svg"
              alt="면역학 지식 정리를 상징하는 이미지"
              className="h-40 w-full object-contain sm:h-48 md:h-56"
              fetchPriority="high"
            />
          </div>

          <p className="mt-5 text-lg font-semibold leading-snug text-neutral-900">
            어려운 면역학을, 이해할 수 있게 정리합니다.
          </p>

          {/* ★ 수정 1: 설명 축소 */}
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            면역학은 복잡하고 전문적인 학문입니다.
            <br />
            이곳은 그 복잡함을 쉽게 풀어 설명하여 일반인들도 이해할 수 있도록 도와주는 공간입니다.
          </p>

          {/* ★ 수정 2: CTA 하나만 유지 */}
          <div className="mt-6">
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
            >
              객관적 자료 보기 (Docs)
            </Link>
          </div>
        </section>

        {/* 2) 시작 안내 */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-neutral-700" aria-hidden />
            <h2 className="text-base font-semibold">어디서부터 보면 좋을까요?</h2>
          </div>

          {/* ★ 수정 3: 설명 1줄로 축소 */}
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            처음 방문하셨다면 문서(Docs)의{" "}
            <Link
              href="/docs/guide"
              className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-700"
            >
              안내 문서
            </Link>
            부터 읽어보시는 것이 좋습니다.
          </p>

          {/* ★ 수정 4: 카드 2개만 유지 */}
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Link
              href="/docs"
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 hover:bg-neutral-100 transition"
            >
              <div className="text-sm font-semibold text-neutral-900">면역학 고전</div>
              <div className="mt-1 text-xs leading-relaxed text-neutral-600">
                중요한 실험과 개념을 역사적 맥락에서 정리합니다.
              </div>
            </Link>

            <Link
              href="/docs"
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 hover:bg-neutral-100 transition"
            >
              <div className="text-sm font-semibold text-neutral-900">질병과 과학의 역사</div>
              <div className="mt-1 text-xs leading-relaxed text-neutral-600">
                질병이 이해되어 온 과정과 과학의 변화를 다룹니다.
              </div>
            </Link>
          </div>
        </section>

        {/* 3) 최근 문서 */}
        <section className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-base font-semibold">최근에 정리한 문서</h2>
            <Link
              href="/docs"
              className="text-xs rounded-full border border-neutral-200 bg-white px-3 py-1 text-neutral-700 hover:bg-neutral-100 transition"
            >
              문서 전체 보기
            </Link>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            {docsLatest.length === 0 ? (
              <div className="px-5 py-5 text-sm text-neutral-600">아직 문서가 없습니다.</div>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {docsLatest.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-5 py-4 hover:bg-neutral-50 transition"
                      title={item.title}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="truncate font-medium">{item.title}</div>
                        {item.dateLabel && (
                          <div className="shrink-0 text-xs text-neutral-500">
                            {item.dateLabel}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* 4) Blog: 공지 / 운영 (★ 수정 5: 제목 톤 다운) */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-neutral-700" aria-hidden />
              <h2 className="text-base font-semibold">사이트 공지</h2>
            </div>
            <Link
              href="/blog"
              className="text-xs rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-neutral-700 hover:bg-neutral-100 transition"
            >
              전체 보기
            </Link>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            블로그에는 사이트 운영과 공지 사항을 게시합니다.
          </p>

          {blogLatest.length === 0 ? (
            <div className="mt-3 text-sm text-neutral-600">아직 공지 글이 없습니다.</div>
          ) : (
            <ul className="mt-3 space-y-2">
              {blogLatest.map((item) => (
                <li
                  key={item.href}
                  className="rounded-xl border border-neutral-200 bg-neutral-50"
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-3 hover:bg-neutral-100 transition"
                    title={item.title}
                  >
                    <div className="truncate text-sm font-medium">{item.title}</div>
                    {item.dateLabel && (
                      <div className="mt-1 text-xs text-neutral-500">
                        {item.dateLabel}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
