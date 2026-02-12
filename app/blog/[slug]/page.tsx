// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import { MetaLine } from "@/components/article-meta";
import { normalizePostSlug } from "../_lib";

function getSiteUrl() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  return SITE_URL || "";
}

function buildCanonical(slugPart: string) {
  const siteUrl = getSiteUrl();
  return siteUrl ? `${siteUrl}/blog/${slugPart}` : `/blog/${slugPart}`;
}

function getPost(slug: string) {
  const normalized = normalizePostSlug(slug);

  // ✅ 폴더가 바뀌어도 URL은 마지막 세그먼트만 기준으로 매칭
  const matches = posts.filter(
    (p) => normalizePostSlug(p.slug) === normalized
  );

  // ✅ (선택) slug 중복을 빠르게 드러내기: 중복이면 첫 글을 쓰되, 원인 파악이 쉬워짐
  // 운영에서도 에러를 내고 싶지 않다면 아래 console.warn만 유지하세요.
  if (matches.length > 1) {
    console.warn(
      `[blog] Duplicate slug detected: "${normalized}" (${matches.length} matches)`
    );
  }

  return matches[0];
}

// ISO 문자열(예: 2025-12-17T00:00:00.000Z)에서 YYYY-MM-DD만 추출
function ymd(v?: string) {
  if (!v) return undefined;
  return v.length >= 10 ? v.slice(0, 10) : v;
}

// JSON-LD에는 ISO 8601이 더 적합합니다(시간이 없어도 됨: YYYY-MM-DD 허용).
function isoDate(v?: string) {
  if (!v) return undefined;
  return v;
}

export function generateStaticParams() {
  return posts
    .filter((p) => p.published !== false)
    .map((post) => ({ slug: normalizePostSlug(post.slug) }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);

  if (!post) return {};

  const slugPart = normalizePostSlug(post.slug);
  const canonical = buildCanonical(slugPart);

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
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

  // JSON-LD용 날짜: modified가 없으면 published로 대체
  const datePublished = isoDate(dateRaw) ?? dateYmd;
  const dateModified = isoDate(updatedRaw) ?? datePublished;

  const slugPart = normalizePostSlug(post.slug);
  const canonicalUrl = buildCanonical(slugPart);

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
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>

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
        <MDXContent code={post.body} />
      </article>
    </div>
  );
}
