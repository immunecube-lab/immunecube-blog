// app/docs/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as site from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import { MetaLine } from "@/components/article-meta";

type Doc = {
  slug: string;
  title: string;
  description?: string;
  date?: string; // 발행일 (Velite s.isodate() → ISO string)
  updated?: string; // 최종 수정일 (Velite s.isodate() → ISO string)
  body: any;
  published?: boolean;
};

const docs = (site as any).docs as Doc[] | undefined;

function getDoc(slug: string): Doc | undefined {
  if (!docs) return undefined;
  return docs.find((d) => d.slug === slug);
}


// ISO 문자열(예: 2025-12-17T00:00:00.000Z)에서 YYYY-MM-DD만 추출
function ymd(v?: string) {
  if (!v) return undefined;
  return v.length >= 10 ? v.slice(0, 10) : v;
}

export function generateStaticParams() {
  if (!docs) return [];
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);

  if (!doc) return {};

  const url = `/docs/${doc.slug}`; // 상대경로(절대 URL로 바꾸면 더 좋음)

  return {
    title: `${doc.title} | 글 모음`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      url,
      type: "article",
      // Next 버전/타입에 따라 아래 필드는 허용되지 않을 수 있어 생략합니다.
      // publishedTime: doc.date,
      // modifiedTime: doc.updated ?? doc.date,
    },
  };
}


export default async function DocDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);

  if (!doc) notFound();

  const dateYmd = ymd(doc.date);
  const updatedYmd = ymd(doc.updated);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">{doc.title}</h1>

      {/* ✅ 날짜 표시 (시간 없이 YYYY-MM-DD만) */}
      <MetaLine date={doc.date} updated={doc.updated} />

      {doc.description && (
        <p className="text-teal-600 mb-6">{doc.description}</p>
      )}

      <article
        className="
          prose prose-slate dark:prose-invert max-w-none
          prose-h2:text-sky-500
          prose-h3:text-sky-400
        "
      >
        {/* ✅ MDXContent가 meta를 지원하는 경우(통합 버전) */}
        <MDXContent
          code={doc.body}          
        />
      </article>
    </div>
  );
}
