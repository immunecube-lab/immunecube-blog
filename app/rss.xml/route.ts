// app/rss.xml/route.ts
import { NextResponse } from "next/server";
import * as site from "@/.velite";

const SITE_URL = "https://immunecube.com";
const FEED_URL = `${SITE_URL}/rss.xml`;
const TITLE = "ImmuneCube";
const DESCRIPTION = "Latest updates from ImmuneCube docs & posts.";

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

function toDate(v: unknown): Date | null {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(String(v));
  return Number.isNaN(d.getTime()) ? null : d;
}

function pickLastMod(item: VeliteItem): Date {
  return toDate(item.updated) ?? toDate(item.date) ?? new Date(0);
}

function normalizeCollectionSlug(slug: string, collection: "docs" | "posts") {
  let s = (slug ?? "").trim();
  if (!s) return "";
  if (s.startsWith("/")) s = s.slice(1);

  const prefixes =
    collection === "posts" ? ["posts/", "blog/"] : ["docs/"];
  for (const prefix of prefixes) {
    if (s.startsWith(prefix)) {
      s = s.slice(prefix.length);
      break;
    }
  }
  return s;
}

type FeedItem = {
  title: string;
  url: string;
  description?: string;
  date: Date;
};

function buildItems(): FeedItem[] {
  const docs = (((site as any).docs ?? []) as VeliteItem[])
    .filter((d) => d?.slug && d.published !== false)
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

  const posts = (((site as any).posts ?? []) as VeliteItem[])
    .filter((p) => p?.slug && p.published !== false)
    .map((p) => {
      const s = normalizeCollectionSlug(p.slug, "posts");
      if (!s) return null;
      return {
        title: p.title ?? s,
        url: `${SITE_URL}/blog/${s}`,
        description: p.description,
        date: pickLastMod(p),
      } satisfies FeedItem;
    })
    .filter(Boolean) as FeedItem[];

  return [...docs, ...posts]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 50);
}

export function GET() {
  const items = buildItems();
  const lastModified = items[0]?.date ?? new Date();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(TITLE)}</title>
    <link>${esc(SITE_URL)}</link>
    <description>${esc(DESCRIPTION)}</description>
    <language>ko</language>
    <lastBuildDate>${lastModified.toUTCString()}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${esc(
      FEED_URL
    )}" rel="self" type="application/rss+xml" />
${items
  .map(
    (it) => `    <item>
      <title>${esc(it.title)}</title>
      <link>${esc(it.url)}</link>
      <guid isPermaLink="true">${esc(it.url)}</guid>
      <pubDate>${it.date.toUTCString()}</pubDate>
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

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Last-Modified": lastModified.toUTCString(),
      // 정적 배포 + CDN 기준으로 적당히 공격적 캐시(원하면 조절)
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
