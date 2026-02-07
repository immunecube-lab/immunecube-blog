// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import { MetaLine } from "@/components/article-meta";

function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

// ISO 문자열(예: 2025-12-17T00:00:00.000Z)에서 YYYY-MM-DD만 추출
function ymd(v?: string) {
  if (!v) return undefined;
  return v.length >= 10 ? v.slice(0, 10) : v;
}

// JSON-LD에는 ISO 8601이 더 적합합니다(시간이 없어도 됨: YYYY-MM-DD 허용).
function isoDate(v?: string) {
  if (!v) return undefined;
  // Velite s.isodate()가 이미 ISO를 주므로 그대로 사용, 없다면 YYYY-MM-DD라도 OK
  return v;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);

  if (!post) return {};

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
    },
  };
}


export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPost(slug);

  if (!post) notFound();
  
  const dateRaw = (post as any).date as string | undefined;
  const updatedRaw = (post as any).updated as string | undefined;

  const dateYmd = ymd(dateRaw);
  const updatedYmd = ymd(updatedRaw);

  // JSON-LD용 날짜: modified가 없으면 published로 대체
  const datePublished = isoDate(dateRaw) ?? dateYmd;
  const dateModified = isoDate(updatedRaw) ?? datePublished;

  // 가능하면 절대 URL을 쓰는 게 더 좋습니다. (예: https://immunecube.com)
  // 지금은 상대경로로 두되, SITE_URL 환경변수가 있으면 자동으로 절대화합니다.
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  const canonicalUrl = SITE_URL
    ? `${SITE_URL}/blog/${post.slug}`
    : `/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    mainEntityOfPage: canonicalUrl,
    datePublished,
    dateModified,
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* ✅ 검색엔진용 구조화 데이터(JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      {/* ✅ 화면용 날짜 표시(시간 없이 YYYY-MM-DD만) */}
      <MetaLine date={dateRaw} updated={updatedRaw} />

      {post.description && (
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          {post.description}
        </p>
      )}

      <article
        className="
          prose prose-slate dark:prose-invert max-w-none
          prose-h2:text-sky-500
          prose-h3:text-sky-400
        "
      >
        <MDXContent
          code={post.body}
             />
      </article>
    </div>
  );
}
