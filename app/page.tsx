// app/page.tsx
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { BookOpen, PenLine } from "lucide-react";
import * as site from "@/.velite";

type Entry = {
  title: string;
  href: string;
  updated: Date;
  kind: "blog" | "docs";
};

const MAX_ITEMS_EACH = 5;

/* ----------------------------- utils ----------------------------- */

// content 아래의 md/mdx를 서브폴더까지 재귀로 수집
function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

// MDX frontmatter에서 title만 가볍게 추출
function extractTitleFromFrontmatter(fileContent: string): string | null {
  const fm = fileContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!fm) return null;

  const body = fm[1];
  const m =
    body.match(/^title:\s*"(.*?)"\s*$/m) ||
    body.match(/^title:\s*'(.*?)'\s*$/m) ||
    body.match(/^title:\s*(.+?)\s*$/m);

  if (!m) return null;

  return m[1].replace(/\s+#.*$/, "").trim() || null;
}

function slugPathFromFile(contentRoot: string, fullPath: string) {
  const rel = path.relative(contentRoot, fullPath).replace(/\.(md|mdx)$/, "");
  return rel.split(path.sep).map(encodeURIComponent).join("/");
}

function formatDate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
}

function getEntriesFromDir(params: {
  contentDir: string;
  urlBase: "/blog" | "/docs";
  kind: "blog" | "docs";
}): Entry[] {
  const { contentDir, urlBase, kind } = params;
  const files = walk(contentDir);

  const entries: Entry[] = [];

  for (const fullPath of files) {
    const stat = fs.statSync(fullPath);
    const content = fs.readFileSync(fullPath, "utf8");
    const title =
      extractTitleFromFrontmatter(content) ||
      path
        .basename(fullPath)
        .replace(/\.(md|mdx)$/, "")
        .replace(/-/g, " ");

    const slugPath = slugPathFromFile(contentDir, fullPath);

    entries.push({
      title,
      href: `${urlBase}/${slugPath}`,
      updated: stat.mtime,
      kind,
    });
  }

  return entries.sort((a, b) => b.updated.getTime() - a.updated.getTime());
}

// docs 페이지와 동일한 href 규칙(혹시 slug 형태가 달라도 안전)
function getDocHref(slug: string) {
  if (!slug) return "/docs";
  if (slug.startsWith("/")) return slug;
  if (slug.startsWith("docs/")) return `/${slug}`;
  return `/docs/${slug}`;
}

/* ----------------------------- page ----------------------------- */

type VeliteDoc = {
  slug: string;
  title: string;
  published?: boolean;
  order?: number;
  // section/category를 쓰고 싶으면 여기에 추가
  // section?: string;
  // category?: string;
};

export default function Home() {
  const root = process.cwd();

  // 블로그는 기존(fs 기반) 유지
  const blogAll = getEntriesFromDir({
    contentDir: path.join(root, "content", "posts"),
    urlBase: "/blog",
    kind: "blog",
  });

  // 문서는 Velite 기반으로 링크 생성 (홈에서만 깨지던 문제 해결)
  const veliteDocs = ((site as any).docs ?? []) as VeliteDoc[];
  const docsAll: Entry[] = veliteDocs
    .filter((d) => d.published !== false)
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
    .map((d) => ({
      title: d.title,
      href: getDocHref(d.slug),
      updated: new Date(), // 홈에서 날짜 표시는 일단 생략/고정 (원하면 개선 가능)
      kind: "docs",
    }));

  const blogLatest = blogAll.slice(0, MAX_ITEMS_EACH);
  const docsLatest = docsAll.slice(0, MAX_ITEMS_EACH);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* 소개 */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">immunecube</h1>

          {/* 대표 SVG */}
          <div className="mt-4 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
            <img
              src="/images/hero.svg"
              alt="연구와 기록을 상징하는 면역 아카이브 이미지"
              className="h-40 w-full object-contain sm:h-48 md:h-56"
              fetchPriority="high"
            />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            면역을 중심으로 논문과 공식 자료를 읽고 정리하는
            블로그 & 문서 아카이브입니다.
            <br />
            자료는 문서로, 해설은 블로그로 정리합니다.
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
            <p className="text-xs text-neutral-500">
              최신 수정 기준으로 자동 정렬됩니다.
            </p>
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
                <div className="px-5 pb-5 text-sm text-neutral-600">
                  아직 블로그 글이 없습니다.
                </div>
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
                        <div className="mt-1 text-xs text-neutral-500">
                          {formatDate(item.updated)}
                        </div>
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
                <div className="px-5 pb-5 text-sm text-neutral-600">
                  아직 문서가 없습니다.
                </div>
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
                        {/* docs는 velite에 updatedAt이 없으면 날짜를 표시하지 않는 편이 안전합니다 */}
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
