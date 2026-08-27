import { POSTS_INDEX, type PostIndexItem } from "@/generated/posts-index";
import styles from "./RelatedPosts.module.css";

type Props = {
  slugs: string[];
  heading?: string;
  max?: number;
  basePath?: string; // 기본 "/docs"
};

const postsBySlug = new Map<string, PostIndexItem>(
  POSTS_INDEX.map((post) => [post.slug, post]),
);

export default function RelatedPosts({
  slugs,
  heading = "관련 글",
  max = Number.POSITIVE_INFINITY,
  basePath = "/docs",
}: Props) {
  if (!Array.isArray(slugs) || slugs.length === 0) return null;

  const items = slugs
    .slice(0, max)
    .map((slug) => postsBySlug.get(slug))
    .filter((post): post is PostIndexItem => Boolean(post));

  if (items.length === 0) return null;

  // "/docs" + "/slug" 결합을 안전하게 처리
  const prefix = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;

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
              href={`${prefix}/${post.slug}`}
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
