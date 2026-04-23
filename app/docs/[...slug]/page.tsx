// app/docs/[...slug]/page.tsx
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import * as site from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import { MetaLine } from "@/components/article-meta";
import { normalizeDocSlug } from "@/lib/docs-slug";

type Doc = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  updated?: string;
  body: any;
  published?: boolean;
  docType?: string; // "paper" | "docent"
};

const docs = (site as any).docs as Doc[] | undefined;
const drafts = (site as any).drafts as Doc[] | undefined;
const isLocalDev = process.env.NODE_ENV === "development";
const docsSource = [...(docs ?? []), ...(isLocalDev ? drafts ?? [] : [])];

function getDocBySlug(slug: string): Doc | undefined {
  if (docsSource.length === 0) return undefined;
  const normalized = normalizeDocSlug(slug);
  if (!normalized) return undefined;
  return docsSource.find((d) => normalizeDocSlug(d.slug) === normalized);
}

// ✅ async로 변경 + params를 Promise로 받고 await
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug: segs } = await params;

  if (!segs || segs.length === 0) return {};

  const rawSlug = segs.join("/");
  const canonicalSlug = normalizeDocSlug(rawSlug);
  const doc = getDocBySlug(rawSlug);
  if (!doc) return {};

  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/docs/${canonicalSlug}` },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  const seen = new Set<string>();
  return docsSource
    .filter((d) => (isLocalDev ? true : d.published !== false))
    .map((doc) => normalizeDocSlug(doc.slug))
    .filter((slug) => {
      if (!slug || seen.has(slug)) return false;
      seen.add(slug);
      return true;
    })
    .map((slug) => ({ slug: [slug] }));
}

// ✅ async로 변경 + params await
export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug: segs } = await params;

  if (!segs || segs.length === 0) notFound();

  const rawSlug = segs.join("/");
  const canonicalSlug = normalizeDocSlug(rawSlug);
  const doc = getDocBySlug(rawSlug);

  if (!doc) notFound();
  if (!isLocalDev && doc.published === false) notFound();

  if (rawSlug !== canonicalSlug) {
    permanentRedirect(`/docs/${canonicalSlug}`);
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <article>
        <header className="mb-6">
          <h1
            className={[
              "text-3xl font-bold leading-tight",
              doc.docType === "docent" ? "text-amber-700" : "",
            ].join(" ")}
          >
            {doc.title}
            {isLocalDev && doc.published === false ? (
              <span className="ml-3 align-middle rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                DRAFT
              </span>
            ) : null}
          </h1>
          <div className="mt-2 text-sm text-neutral-500">
            <MetaLine date={doc.date} updated={doc.updated} />
          </div>
          {doc.description ? (
            <p className="mt-4 mb-8 text-sm text-violet-900 leading-relaxed">
              {doc.description}
            </p>
          ) : null}
        </header>

        <section className={["prose max-w-none", doc.docType === "docent" ? "prose-docent" : ""].join(" ")}>
          <MDXContent code={doc.body} />
        </section>
      </article>
    </main>
  );
}
