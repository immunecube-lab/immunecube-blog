// app/docs/[...slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as site from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import { MetaLine } from "@/components/article-meta";

type Doc = {
  slug: string; // velite slug: "imm-classic/xxx" 또는 "xxx"
  title: string;
  description?: string;
  date?: string;
  updated?: string;
  body: any;
  published?: boolean;
};

const docs = (site as any).docs as Doc[] | undefined;

function getDocByVeliteSlug(veliteSlug: string): Doc | undefined {
  if (!docs) return undefined;
  return docs.find((d) => d.slug === veliteSlug);
}

export function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Metadata {
  const veliteSlug = params.slug.join("/");
  const doc = getDocByVeliteSlug(veliteSlug);
  if (!doc) return {};

  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: `/docs/${veliteSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  if (!docs) return [];
  return docs
    .filter((d) => d.published !== false)
    .map((doc) => ({
      slug: doc.slug.split("/"), // ✅ velite slug를 그대로 segment로
    }));
}

export default function DocPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const veliteSlug = params.slug.join("/");
  const doc = getDocByVeliteSlug(veliteSlug);

  if (!doc || doc.published === false) notFound();

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <article>
        <header className="mb-6">
          <h1 className="text-3xl font-bold leading-tight">{doc.title}</h1>
          <div className="mt-2 text-sm text-neutral-500">
            <MetaLine date={doc.date} updated={doc.updated} />
          </div>
          {doc.description ? (
            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
              {doc.description}
            </p>
          ) : null}
        </header>

        <section className="prose prose-slate max-w-none">
          <MDXContent code={doc.body} />
        </section>
      </article>
    </main>
  );
}
