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
  max = 5,
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
      className="related-posts not-prose"
    >
      <div className="related-posts-heading">
        {heading}
      </div>

      <ul className="related-posts-list">
        {items.map((post, i) => (
          <li
            key={post.slug}
            className={i === 0 ? "" : "with-divider"}
          >
            <a
              href={`${prefix}/${post.slug}`}
              className="related-post-link"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .related-posts {
          margin-top: 2.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          background: #ffffff;
        }

        .related-posts-heading {
          padding: 0.75rem 1rem;
          background: #f3f4f6;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 700;
          color: #111827;
        }

        .related-posts-list {
          list-style: none;
          margin: 0;
          padding: 0.75rem 1rem;
        }

        .related-posts-list li {
          padding: 0.45rem 0;
        }

        .related-posts-list li.with-divider {
          border-top: 1px solid #f1f5f9;
        }

        .related-post-link {
          color: #111827;
          font-weight: 600;
          line-height: 1.4;
          text-decoration: none;
        }

        .related-post-link:hover {
          text-decoration: underline;
        }

        @media (prefers-color-scheme: dark) {
          .related-posts {
            border-color: #374151;
            background: #111827;
          }

          .related-posts-heading {
            background: #1f2937;
            border-bottom-color: #374151;
            color: #f9fafb;
          }

          .related-posts-list li.with-divider {
            border-top-color: #374151;
          }

          .related-post-link {
            color: #f3f4f6;
          }
        }
      `}</style>
    </section>
  );
}
