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
  order?: number; // category 내부 문서 정렬용
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
    const key = doc.category || "기타";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(doc);
  }

  const entries = Array.from(map.entries()).map(([category, items]) => {
    return [category, sortDocsInCategory(items)] as const;
  });

  // 카테고리 정렬: CATEGORY_ORDER → 이름(ko)
  entries.sort(([a], [b]) => {
    const ao = CATEGORY_ORDER[a] ?? 9999;
    const bo = CATEGORY_ORDER[b] ?? 9999;
    if (ao !== bo) return ao - bo;
    return a.localeCompare(b, "ko");
  });

  return entries;
}

export default function DocsPage() {
  if (!docs) {
    return (
      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">글 모음</h1>
        <p className="text-sm text-neutral-500">
          docs 컬렉션이 아직 준비되지 않았습니다. velite 빌드를 확인해 주세요.
        </p>
      </main>
    );
  }

  const published = docs.filter((d) => d.published !== false);
  const grouped = groupByCategory(published);

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">글 모음</h1>

      {grouped.map(([category, items]) => (
        <section key={category} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>

          <ul className="space-y-3">
            {items.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={`/docs/${doc.slug}`}
                  className="text-sky-600 hover:underline font-medium"
                >
                  {doc.title}
                </Link>

                {doc.description && (
                  <p className="text-sm text-neutral-500">{doc.description}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
