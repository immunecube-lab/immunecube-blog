import Link from "next/link";

import { POSTS_INDEX } from "@/generated/posts-index";

type ArticleLinkProps = {
  slug: string;
  /** @deprecated The destination is derived from the content index. */
  basePath?: "/docs" | "/stories" | "/blog";
  label?: string;
};

export function ArticleLink({
  slug,
  basePath,
  label = "관련 글",
}: ArticleLinkProps) {
  const normalized = slug ? slug.replace(/^\/+|\/+$/g, "") : "";
  const article = POSTS_INDEX.find((post) => post.slug === normalized);
  if (!article) {
    throw new Error(
      `[ArticleLink] Published content not found in POSTS_INDEX: "${slug}"`,
    );
  }

  if (basePath && basePath !== article.basePath) {
    throw new Error(
      `[ArticleLink] basePath mismatch for "${slug}": expected "${article.basePath}", received "${basePath}"`,
    );
  }

  const href = `${article.basePath}/${article.slug}`;

  return (
    <aside
      className="not-prose my-4 flex items-baseline gap-2 border-l-2 border-sky-400 pl-3 text-sm leading-6"
      aria-label={`${label}: ${article.title}`}
    >
      <span className="shrink-0 font-semibold text-sky-700 dark:text-sky-300">
        {label}
      </span>
      <Link
        href={href}
        className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-sky-700 hover:decoration-sky-500 dark:text-neutral-200 dark:decoration-neutral-600 dark:hover:text-sky-300"
      >
        {article.title}
        <span className="ml-1" aria-hidden="true">
          →
        </span>
      </Link>
    </aside>
  );
}

export default ArticleLink;
