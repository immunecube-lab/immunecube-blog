// app/docs/page.tsx
import Link from "next/link";
import * as site from "@/.velite";
import { CATEGORY_ORDER } from "./_categories";

type Doc = {
  slug: string;
  title: string;
  description?: string;
  published?: boolean;
  category?: string;
  order?: number;
};

const docs = (site as any).docs as Doc[] | undefined;

function sortDocsInCategory(items: Doc[]) {
  return [...items].sort((a, b) => {
    const ao = a.order ?? 9999;
    const bo = b.order ?? 9999;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title, "ko");
  });
}

function groupByCategory(list: Doc[]) {
  const map = new Map<string, Doc[]>();

  for (const doc of list) {
    const key = (doc.category || "기타").trim();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(doc);
  }

  const entries = Array.from(map.entries()).map(([category, items]) => {
    return [category, sortDocsInCategory(items)] as const;
  });

  entries.sort(([a], [b]) => {
    const ao = CATEGORY_ORDER[a] ?? 9999;
    const bo = CATEGORY_ORDER[b] ?? 9999;
    if (ao !== bo) return ao - bo;
    return a.localeCompare(b, "ko");
  });

  return entries;
}

function getDocHref(slug: string) {
  if (!slug) return "/docs";
  if (slug.startsWith("/")) return slug;
  if (slug.startsWith("docs/")) return `/${slug}`;
  return `/docs/${slug}`;
}

type PageProps = {
  searchParams?: Promise<{
    cat?: string;
  }>;
};

export default async function DocsPage({ searchParams }: PageProps) {
  if (!docs) {
    return (
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">글 모음</h1>
        <p className="text-sm text-neutral-500">
          docs 컬렉션이 아직 준비되지 않았습니다.
        </p>
      </main>
    );
  }

  // ✅ 핵심 수정
  const params = await searchParams;
  const selected = (params?.cat || "").trim();

  const published = docs.filter((d) => d.published !== false);
  const grouped = groupByCategory(published);

  const categories = grouped.map(([c]) => c);
  const activeCategory = categories.includes(selected)
    ? selected
    : categories[0];

  const activeItems =
    grouped.find(([c]) => c === activeCategory)?.[1] ?? [];

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex items-baseline justify-between mb-8">
        <h1 className="text-3xl font-bold">글 모음</h1>
        <div className="text-xs text-neutral-500">
          카테고리를 선택하면 오른쪽에 목록이 표시됩니다.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        {/* 왼쪽 사이드바 */}
        <aside className="md:sticky md:top-24 h-fit rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold mb-3">카테고리</div>
          <ul className="space-y-1">
            {grouped.map(([category, items]) => {
              const isActive = category === activeCategory;
              return (
                <li key={category}>
                  <Link
                    href={`/docs?cat=${encodeURIComponent(category)}`}
                    className={[
                      "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "hover:bg-neutral-50 text-neutral-800",
                    ].join(" ")}
                  >
                    <span className="truncate">{category}</span>
                    <span className="ml-2 text-xs rounded-full px-2 py-0.5 bg-neutral-100">
                      {items.length}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* 오른쪽 목록 */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{activeCategory}</h2>

          <ul className="space-y-3">
            {activeItems.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={getDocHref(doc.slug)}
                  className="text-sky-600 hover:underline font-medium"
                >
                  {doc.title}
                </Link>
                {doc.description && (
                  <p className="text-sm text-neutral-500">
                    {doc.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
