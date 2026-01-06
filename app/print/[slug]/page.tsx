// app/print/docs/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as site from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import { MetaLine } from "@/components/article-meta";

export const dynamic = "force-dynamic"; // ⭐ 핵심

type Doc = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  updated?: string;
  body: any;
  published?: boolean;
};

const docs = (site as any).docs as Doc[] | undefined;

function getDocByPublicSlug(slug: string): Doc | undefined {
  if (!docs) return undefined;

  return docs.find((d) => {
    const last = d.slug.split("/").pop();
    return last === slug;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocByPublicSlug(slug);
  if (!doc) return {};

  return {
    title: `${doc.title} (print)`,
    robots: { index: false, follow: false },
  };
}

export default async function PrintDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocByPublicSlug(slug);

  if (!doc || doc.published === false) notFound();

  return (
    <main className="print-root">
      <article className="print-article">
        <header>
          <h1 className="print-title">{doc.title}</h1>
          <MetaLine date={doc.date} updated={doc.updated} />
          {doc.description && (
            <p className="print-desc">{doc.description}</p>
          )}
        </header>

        <section className="prose max-w-none">
          <MDXContent code={doc.body} />
        </section>
      </article>
    </main>
  );
}
