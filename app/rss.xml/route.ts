// app/rss.xml/route.ts
import { NextResponse } from "next/server";
import {
  BLOG_INDEX,
  DOCS_INDEX,
  STORIES_INDEX,
} from "@/generated/content-index";
import { getContentDate, isPublished, normalizeCollectionSlug } from "@/lib/content-policy";
import { buildSiteUrl } from "@/lib/site-url";

const SITE_URL = buildSiteUrl("");
const FEED_URL = `${SITE_URL}/rss.xml`;
const TITLE = "ImmuneCube";
const DESCRIPTION = "Latest updates from ImmuneCube stories, docs, and notices.";

export const dynamic = "force-static"; // 정적 빌드 기반이면 이게 안전
// export const revalidate = 3600; // (선택) ISR 쓰면 1시간 캐시

type VeliteItem = {
  slug: string;
  title?: string;
  description?: string;
  published?: boolean;
  date?: string | Date;
  updated?: string | Date;
};

function esc(s: string) {
  return (s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function pickLastMod(item: VeliteItem): Date | undefined {
  return getContentDate(item) ?? undefined;
}

type FeedItem = {
  title: string;
  url: string;
  description?: string;
  date?: Date;
};

function buildItems(): FeedItem[] {
  const docItems = (DOCS_INDEX satisfies VeliteItem[])
    .filter((d) => d?.slug && isPublished(d))
    .map((d) => {
      const s = normalizeCollectionSlug(d.slug, "docs");
      if (!s) return null;
      return {
        title: d.title ?? s,
        url: `${SITE_URL}/docs/${s}`,
        description: d.description,
        date: pickLastMod(d),
      } satisfies FeedItem;
    })
    .filter(Boolean) as FeedItem[];

  const postItems = (BLOG_INDEX satisfies VeliteItem[])
    .filter((p) => p?.slug && isPublished(p))
    .map((p) => {
      const s = normalizeCollectionSlug(p.slug, "blog");
      if (!s) return null;
      return {
        title: p.title ?? s,
        url: `${SITE_URL}/blog/${s}`,
        description: p.description,
        date: pickLastMod(p),
      } satisfies FeedItem;
    })
    .filter(Boolean) as FeedItem[];

  const storyItems = (STORIES_INDEX satisfies VeliteItem[])
    .filter((story) => story?.slug && isPublished(story))
    .map((story) => {
      const slug = normalizeCollectionSlug(story.slug, "stories");
      if (!slug) return null;
      return {
        title: story.title ?? slug,
        url: `${SITE_URL}/stories/${slug}`,
        description: story.description,
        date: pickLastMod(story),
      } satisfies FeedItem;
    })
    .filter(Boolean) as FeedItem[];

  return [...docItems, ...postItems, ...storyItems]
    .sort(
      (a, b) =>
        (b.date?.getTime() ?? Number.NEGATIVE_INFINITY) -
        (a.date?.getTime() ?? Number.NEGATIVE_INFINITY),
    )
    .slice(0, 50);
}

export function GET() {
  const items = buildItems();
  const lastModified = items.find((item) => item.date)?.date;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(TITLE)}</title>
    <link>${esc(SITE_URL)}</link>
    <description>${esc(DESCRIPTION)}</description>
    <language>ko</language>
${lastModified ? `    <lastBuildDate>${lastModified.toUTCString()}</lastBuildDate>` : ""}
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${esc(
      FEED_URL
    )}" rel="self" type="application/rss+xml" />
${items
  .map(
    (it) => `    <item>
      <title>${esc(it.title)}</title>
      <link>${esc(it.url)}</link>
      <guid isPermaLink="true">${esc(it.url)}</guid>
${it.date ? `      <pubDate>${it.date.toUTCString()}</pubDate>` : ""}
      ${
        it.description
          ? `<description>${esc(it.description)}</description>`
          : ""
      }
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  const headers: Record<string, string> = {
    "Content-Type": "application/rss+xml; charset=utf-8",
    // 정적 배포 + CDN 기준으로 적당히 공격적 캐시(원하면 조절)
    "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  };
  if (lastModified) headers["Last-Modified"] = lastModified.toUTCString();

  return new NextResponse(xml, { headers });
}
