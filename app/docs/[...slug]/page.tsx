// app/docs/[...slug]/page.tsx
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { MDXContent } from "@/components/mdx-content";
import { MetaLine } from "@/components/article-meta";
import { ReadingProgress } from "@/components/ReadingProgress";
import { normalizeDocSlug } from "@/lib/docs-slug";
import { LEGACY_DOC_BASENAME_TO_SLUG } from "@/lib/legacy-doc-slugs";
import { DOCS_INDEX, DRAFT_DOCS_INDEX } from "@/generated/content-index";

type Doc = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  updated?: string;
  body: string;
  published?: boolean;
  docType?: string; // "paper" | "docent"
};

const isLocalDev = process.env.NODE_ENV === "development";

async function getDocsSource(): Promise<Doc[]> {
  const source = await import("@/.velite");
  return [...source.docs, ...(isLocalDev ? source.drafts : [])] as Doc[];
}

async function getDocBySlug(slug: string): Promise<Doc | undefined> {
  const docsSource = await getDocsSource();
  if (docsSource.length === 0) return undefined;
  const normalized = normalizeDocSlug(slug);
  if (!normalized) return undefined;
  return docsSource.find((d) => normalizeDocSlug(d.slug) === normalized);
}

function getCanonicalFromLegacySlug(slug: string): string | undefined {
  const normalized = normalizeDocSlug(slug);
  return LEGACY_DOC_BASENAME_TO_SLUG[normalized];
}

function getLegacyDocSlugs(): string[] {
  return [
    ...Object.keys(LEGACY_DOC_BASENAME_TO_SLUG),
    ...Object.values(LEGACY_DOC_BASENAME_TO_SLUG),
  ];
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
  const doc = await getDocBySlug(rawSlug);
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
  const source = [...DOCS_INDEX, ...(isLocalDev ? DRAFT_DOCS_INDEX : [])];
  const veliteSlugs = source
    .filter((d) => d.published !== false)
    .map((doc) => normalizeDocSlug(doc.slug));

  return [...veliteSlugs, ...getLegacyDocSlugs()]
    .filter((slug) => {
      if (!slug || seen.has(slug)) return false;
      seen.add(slug);
      return true;
    })
    .map((slug) => ({ slug: slug.split("/") }));
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
  const doc = await getDocBySlug(rawSlug);

  if (!doc) {
    const legacyCanonical = getCanonicalFromLegacySlug(rawSlug);
    if (legacyCanonical) permanentRedirect(`/docs/${legacyCanonical}`);
    notFound();
  }
  if (!isLocalDev && doc.published === false) notFound();

  if (rawSlug !== canonicalSlug) {
    permanentRedirect(`/docs/${canonicalSlug}`);
  }

  return (
    <>
      <ReadingProgress />
      <main className="mx-auto max-w-3xl px-4 py-7 sm:py-10">
        <article>
          <header className="mb-5 sm:mb-6">
            <h1
              className={[
                "text-2xl font-bold leading-tight sm:text-3xl",
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
              <p className="mt-4 mb-8 text-sm text-violet-900 leading-relaxed dark:text-violet-200">
                {doc.description}
              </p>
            ) : null}
          </header>

          <section className={["prose prose-sm max-w-none dark:prose-invert sm:prose", doc.docType === "docent" ? "prose-docent" : ""].join(" ")}>
            <MDXContent code={doc.body} />
          </section>
        </article>
      </main>
    </>
  );
}
