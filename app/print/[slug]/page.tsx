// app/print/docs/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as site from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import { MetaLine } from "@/components/article-meta";

// NOTE:
// - 프린트 페이지는 SEO 대상이 아니므로, force-dynamic이 필수는 아닙니다.
// - 다만 Velite 데이터가 런타임에서 동적으로 바뀌는 운영 방식이라면 유지할 수 있습니다.
export const dynamic = "force-dynamic";

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

/**
 * 현재 라우트는 /print/docs/<slug> 형태이고,
 * velite의 doc.slug가 "imm-classic/xxx" 같은 경로형일 수 있으므로
 * 마지막 segment로 매칭합니다.
 */
function getDocByPublicSlug(publicSlug: string): Doc | undefined {
  if (!docs) return undefined;

  return docs.find((d) => {
    const last = d.slug.split("/").pop();
    return last === publicSlug;
  });
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }; // ✅ Promise 제거 (표준)
}): Metadata {
  const { slug } = params;
  const doc = getDocByPublicSlug(slug);
  if (!doc) return {};

  return {
    title: `${doc.title} (print)`,
    description: doc.description,
    alternates: {
      // ✅ 프린트는 복제본이므로 원문으로 canonical 귀속
      // (원문 라우트가 /docs/<slug> 형태라고 가정)
      canonical: `/docs/${slug}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function PrintDocPage({
  params,
}: {
  params: { slug: string }; // ✅ Promise 제거 (표준)
}) {
  const { slug } = params;
  const doc = getDocByPublicSlug(slug);

  if (!doc || doc.published === false) notFound();

  return (
    <main className="print-root">
      <article className="print-article">
        <header>
          <h1 className="print-title">{doc.title}</h1>
          <MetaLine date={doc.date} updated={doc.updated} />
          {doc.description && <p className="print-desc">{doc.description}</p>}
        </header>

        <section className="prose max-w-none">
          <MDXContent code={doc.body} />
        </section>
      </article>
    </main>
  );
}
