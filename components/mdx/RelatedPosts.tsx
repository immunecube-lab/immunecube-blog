"use client";

import { POSTS_INDEX, type PostIndexItem } from "@/generated/posts-index";

type Props = {
  slugs: string[];
  heading?: string;
  max?: number; // 기본 4
  basePath?: string; // 기본 "/docs"
};

export default function RelatedPosts({
  slugs,
  heading = "관련 글",
  max = 4,
  basePath = "/docs",
}: Props) {
  if (!Array.isArray(slugs) || slugs.length === 0) return null;

  const map = new Map<string, PostIndexItem>(POSTS_INDEX.map((p) => [p.slug, p]));

  const trimmed = slugs.slice(0, max);

  const items = trimmed
    .map((s) => map.get(s))
    .filter((p): p is PostIndexItem => Boolean(p));

  if (items.length === 0) return null;

  // "/docs" + "/slug" 결합을 안전하게 처리
  const prefix = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;

  return (
    <section
      style={{
        marginTop: "2.5rem",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          padding: "0.75rem 1rem",
          backgroundColor: "#f3f4f6",
          borderBottom: "1px solid #e5e7eb",
          fontWeight: 700,
          color: "#111827",
        }}
      >
        {heading}
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: "0.75rem 1rem" }}>
        {items.map((post, i) => (
          <li
            key={post.slug}
            style={{
              padding: "0.45rem 0",
              borderTop: i === 0 ? "none" : "1px solid #f1f5f9",
            }}
          >
            <a
              href={`${prefix}/${post.slug}`}
              className="related-post-link"
              style={{
                color: "#111827",
                fontWeight: 600,
                lineHeight: 1.4,
                textDecoration: "none",
              }}
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .related-post-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}
