import { POSTS_INDEX, type PostIndexItem } from "@/generated/posts-index";
import styles from "./RelatedPosts.module.css";

type Props = {
  slugs: string[];
  heading?: string;
  max?: number;
  /** @deprecated Each destination's path is derived from the content index. */
  basePath?: string;
};

const postsBySlug = new Map<string, PostIndexItem>(
  POSTS_INDEX.map((post) => [post.slug, post]),
);

export default function RelatedPosts({
  slugs,
  heading = "관련 글",
  max = Number.POSITIVE_INFINITY,
}: Props) {
  if (!Array.isArray(slugs)) {
    throw new Error("[RelatedPosts] `slugs` prop must be an array.");
  }

  if (slugs.length === 0) return null;

  const missingSlugs = slugs.filter((slug) => !postsBySlug.has(slug));
  if (missingSlugs.length > 0) {
    throw new Error(
      `[RelatedPosts] Published content not found in POSTS_INDEX: ${missingSlugs
        .map((slug) => `"${slug}"`)
        .join(", ")}`,
    );
  }

  const items = slugs
    .slice(0, max)
    .map((slug) => postsBySlug.get(slug)!);

  if (items.length === 0) return null;

  return (
    <section className={`related-posts not-prose ${styles.root}`}>
      <div className={`related-posts-heading ${styles.heading}`}>
        {heading}
      </div>

      <ul className={`related-posts-list ${styles.list}`}>
        {items.map((post, index) => (
          <li
            key={post.slug}
            className={[
              styles.item,
              index === 0 ? "" : `with-divider ${styles.itemWithDivider}`,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <a
              href={`${post.basePath}/${post.slug}`}
              className={`related-post-link ${styles.link}`}
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
