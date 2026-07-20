import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXContent } from "@/components/mdx-content";
import { MetaLine } from "@/components/article-meta";
import { buildSiteUrl } from "@/lib/site-url";
import { STORIES_INDEX } from "@/generated/content-index";
import { normalizeStorySlug } from "../_lib";

type Story = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  updated?: string;
  body: string;
  published?: boolean;
};

async function getStory(slug: string): Promise<Story | undefined> {
  const collection = (await import("@/.velite")) as unknown as {
    stories?: Story[];
  };
  const stories = collection.stories ?? [];
  const normalized = normalizeStorySlug(slug);
  const matches = stories.filter(
    (story) => normalizeStorySlug(story.slug) === normalized,
  );

  if (matches.length > 1) {
    console.warn(
      `[stories] Duplicate slug detected: "${normalized}" (${matches.length} matches)`,
    );
  }

  return matches[0] as Story | undefined;
}

function ymd(value?: string) {
  if (!value) return undefined;
  return value.length >= 10 ? value.slice(0, 10) : value;
}

export function generateStaticParams() {
  const params = STORIES_INDEX.filter(
    (story) => story.published !== false,
  ).map(
    (story) => ({ slug: normalizeStorySlug(story.slug) }),
  );

  // Next.js static export requires at least one generated value for a dynamic
  // route. The sentinel renders as 404 and is never linked or indexed.
  return params.length > 0 ? params : [{ slug: "__empty" }];
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const story = await getStory(slug);
  if (!story) return {};

  const slugPart = normalizeStorySlug(story.slug);
  const canonical = buildSiteUrl(`/stories/${slugPart}`);

  return {
    title: `${story.title} | 면역이야기`,
    description: story.description,
    authors: [{ name: "Immunecube", url: buildSiteUrl("/about") }],
    alternates: { canonical },
    openGraph: {
      title: story.title,
      description: story.description,
      url: canonical,
      type: "article",
    },
  };
}

export default async function StoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const story = await getStory(slug);
  if (!story) notFound();

  const datePublished = story.date;
  const dateModified = story.updated ?? story.date;
  const slugPart = normalizeStorySlug(story.slug);
  const canonicalUrl = buildSiteUrl(`/stories/${slugPart}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.description,
    mainEntityOfPage: canonicalUrl,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "Immunecube",
      url: buildSiteUrl("/about"),
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="mb-3 text-sm font-medium text-neutral-500">면역이야기</p>
      <h1 className="mb-2 text-3xl font-bold">{story.title}</h1>
      <MetaLine date={ymd(story.date)} updated={ymd(story.updated)} />

      {story.description && (
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          {story.description}
        </p>
      )}

      <article
        className="
          prose prose-slate dark:prose-invert max-w-none
          prose-h2:text-sky-500
          prose-h3:text-sky-400
        "
      >
        <MDXContent code={story.body} />
      </article>
    </div>
  );
}
