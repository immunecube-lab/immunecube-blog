// app/docs/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as site from "@/.velite";
import { MDXContent } from "@/components/mdx-content";

// Velite docs 타입 선언
type Doc = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  body: any;
  published?: boolean;
};

const docs = (site as any).docs as Doc[] | undefined;

function getDoc(slug: string): Doc | undefined {
  if (!docs) return undefined;
  return docs.find((d) => d.slug === slug);
}

// ---- Static Params ----
export function generateStaticParams() {
  if (!docs) return [];
  return docs.map((doc) => ({ slug: doc.slug }));
}

// ---- Metadata ----
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;      // ★ 반드시 await 필요
  const doc = getDoc(slug);

  if (!doc) return {};
  return {
    title: `${doc.title} | Docs`,
    description: doc.description,
  };
}

// ---- Page Component ----
export default async function DocDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;      // ★ 여기서도 반드시 await 필요
  const doc = getDoc(slug);

  if (!doc) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{doc.title}</h1>

      {doc.description && (
        <p className="text-gray-500 mb-4">{doc.description}</p>
      )}

      <article
        className="
          prose prose-slate dark:prose-invert max-w-none
          prose-h2:text-sky-500
          prose-h3:text-sky-400
        "
      >
        <MDXContent code={doc.body} />
      </article>
    </div>
  );
}
