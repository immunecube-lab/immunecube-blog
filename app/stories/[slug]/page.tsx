import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXContent } from "@/components/mdx-content";
import { MetaLine } from "@/components/article-meta";
import { Series } from "@/components/mdx/Series";
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
  category?: string;
  cover?: string;
  series?: {
    title: string;
    order: number;
    total?: number;
  };
};

import { getVeliteStories } from "@/lib/velite-loader";

async function getStory(slug: string): Promise<Story | undefined> {
  const stories = (await getVeliteStories()) as Story[];
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
      images: story.cover ? [{ url: buildSiteUrl(story.cover) }] : undefined,
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
    image: story.cover ? buildSiteUrl(story.cover) : undefined,
    author: {
      "@type": "Organization",
      name: "Immunecube",
      url: buildSiteUrl("/about"),
    },
  };

  const seriesItems = story.series
    ? STORIES_INDEX.filter(
        (item) => item.series?.title === story.series?.title,
      ).sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0))
    : [];

  const totalParts = story.series?.total ?? seriesItems.length;
  const currentSeriesIdx = seriesItems.findIndex(
    (item) => normalizeStorySlug(item.slug) === slugPart,
  );
  const prevStory = currentSeriesIdx > 0 ? seriesItems[currentSeriesIdx - 1] : null;
  const nextStory =
    currentSeriesIdx >= 0 && currentSeriesIdx < seriesItems.length - 1
      ? seriesItems[currentSeriesIdx + 1]
      : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 print:max-w-none print:p-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex items-center justify-between text-sm font-medium text-neutral-500">
        <span>면역이야기</span>
        {story.category && (
          <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs text-sky-600 dark:bg-sky-950/50 dark:text-sky-400">
            {story.category}
          </span>
        )}
      </div>

      <h1 className="mt-2 mb-2 text-3xl font-bold">{story.title}</h1>
      <MetaLine date={ymd(story.date)} updated={ymd(story.updated)} />

      {story.series && (
        <Series
          title={story.series.title}
          part={story.series.order}
          total={totalParts}
        />
      )}

      {story.description && (
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          {story.description}
        </p>
      )}

      {story.cover && (
        <img
          src={story.cover}
          alt={`${story.title} 커버 이미지`}
          width={1600}
          height={900}
          className="mb-8 aspect-video w-full rounded-xl object-cover"
        />
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

      {/* 시리즈 연관 글 네비게이션 Box */}
      {seriesItems.length > 1 && (
        <div className="mt-12 rounded-xl border border-sky-100 bg-sky-50/50 p-6 dark:border-sky-900/40 dark:bg-sky-950/20 print:hidden">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Series — {story.series?.title}
          </div>
          <ol className="space-y-2 text-sm">
            {seriesItems.map((item) => {
              const isCurrent = normalizeStorySlug(item.slug) === slugPart;
              return (
                <li key={item.slug} className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-neutral-400">
                    {item.series?.order ?? 0}.
                  </span>
                  {isCurrent ? (
                    <span className="font-semibold text-sky-700 dark:text-sky-300">
                      {item.title} <span className="text-xs font-normal text-sky-500">(현재 글)</span>
                    </span>
                  ) : (
                    <Link
                      href={`/stories/${normalizeStorySlug(item.slug)}`}
                      className="text-neutral-700 hover:text-sky-600 dark:text-neutral-300 dark:hover:text-sky-400"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>

          {(prevStory || nextStory) && (
            <div className="mt-6 flex flex-col gap-3 border-t border-sky-100 pt-4 sm:flex-row sm:justify-between dark:border-sky-900/40">
              {prevStory ? (
                <Link
                  href={`/stories/${normalizeStorySlug(prevStory.slug)}`}
                  className="group flex flex-1 flex-col text-left"
                >
                  <span className="text-xs text-neutral-400">← 이전 시리즈 글</span>
                  <span className="text-sm font-medium text-neutral-800 group-hover:text-sky-600 dark:text-neutral-200 dark:group-hover:text-sky-400">
                    {prevStory.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextStory && (
                <Link
                  href={`/stories/${normalizeStorySlug(nextStory.slug)}`}
                  className="group flex flex-1 flex-col text-right"
                >
                  <span className="text-xs text-neutral-400">다음 시리즈 글 →</span>
                  <span className="text-sm font-medium text-neutral-800 group-hover:text-sky-600 dark:text-neutral-200 dark:group-hover:text-sky-400">
                    {nextStory.title}
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

