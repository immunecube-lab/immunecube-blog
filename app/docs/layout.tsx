// app/docs/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";
import * as site from "@/.velite";

type Doc = {
  slug: string;
  title: string;
  category?: string;
  published?: boolean;
};

const docs = (site as any).docs as Doc[] | undefined;

function DocsSidebar() {
  if (!docs) return null;

  const published = docs.filter((d) => d.published !== false);
  const grouped = new Map<string, Doc[]>();

  for (const doc of published) {
    const key = doc.category || "기타";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(doc);
  }

  const entries = Array.from(grouped.entries()).sort(([a], [b]) =>
    a.localeCompare(b, "ko")
  );

  return (
    <aside className="hidden md:block md:w-64 pr-8 border-r border-neutral-200 dark:border-neutral-800">
      <h2 className="text-sm font-semibold text-neutral-500 mb-4">
        문서 목록
      </h2>
      <nav className="space-y-6 text-sm">
        {entries.map(([category, items]) => (
          <div key={category}>
            <div className="font-semibold mb-2">{category}</div>
            <ul className="space-y-1">
              {items.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    href={`/docs/${doc.slug}`}
                    className="text-neutral-700 dark:text-neutral-300 hover:text-sky-600"
                  >
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 flex">
      <DocsSidebar />
      <div className="flex-1 md:pl-8">{children}</div>
    </div>
  );
}
