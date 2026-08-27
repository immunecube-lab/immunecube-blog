// app/sitemap.ts
import type { MetadataRoute } from "next";
import {
  BLOG_INDEX,
  DOCS_INDEX,
  STORIES_INDEX,
} from "@/generated/content-index";
import { getContentDate, isPublished, normalizeCollectionSlug } from "@/lib/content-policy";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

type VeliteItem = {
  slug: string;
  published?: boolean;
  date?: string | Date;
  updated?: string | Date;
};

// "docs/xxx" 또는 "/docs/xxx" 같은 형태가 들어오면 "xxx"로 정리
function pickLastMod(item: VeliteItem): Date | undefined {
  return getContentDate(item) ?? undefined;
}

function joinUrl(base: string, path: string) {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

function maxDate(dates: Array<Date | undefined>): Date | undefined {
  const xs = dates.filter(Boolean) as Date[];
  if (xs.length === 0) return undefined;
  return new Date(Math.max(...xs.map((d) => d.getTime())));
}

function addEntry(
  out: MetadataRoute.Sitemap,
  seen: Set<string>,
  url: string,
  lastModified?: Date,
) {
  // 중복 방지
  if (seen.has(url)) return;
  seen.add(url);

  out.push(lastModified ? { url, lastModified } : { url });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = getSiteUrl();
  const out: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const postEntries = (BLOG_INDEX satisfies VeliteItem[])
    .filter((p) => p?.slug && isPublished(p))
    .map((p) => {
      const s = normalizeCollectionSlug(p.slug, "blog");
      if (!s) return null;

      return {
        url: joinUrl(SITE_URL, `/blog/${s}`),
        lastModified: pickLastMod(p),
      };
    })
    .filter(Boolean) as { url: string; lastModified?: Date }[];

  const docEntries = (DOCS_INDEX satisfies VeliteItem[])
    .filter((d) => d?.slug && isPublished(d))
    .map((d) => {
      const s = normalizeCollectionSlug(d.slug, "docs");
      if (!s) return null;

      // ✅ 중요: s에는 "imm-classic/xxx"처럼 "/"가 포함될 수 있으므로
      // encodeURIComponent를 걸면 "%2F"가 되어 URL이 망가집니다.
      return {
        url: joinUrl(SITE_URL, `/docs/${s}`),
        lastModified: pickLastMod(d),
      };
    })
    .filter(Boolean) as { url: string; lastModified?: Date }[];

  const storyEntries = (STORIES_INDEX satisfies VeliteItem[])
    .filter((story) => story?.slug && isPublished(story))
    .map((story) => {
      const slug = normalizeCollectionSlug(story.slug, "stories");
      if (!slug) return null;

      return {
        url: joinUrl(SITE_URL, `/stories/${slug}`),
        lastModified: pickLastMod(story),
      };
    })
    .filter(Boolean) as { url: string; lastModified?: Date }[];

  // 허브 페이지들: "콘텐츠 최신 갱신일" 기반 lastModified로 신호 강화
  const postsLast = maxDate(postEntries.map((p) => p.lastModified));
  const docsLast = maxDate(docEntries.map((d) => d.lastModified));
  const storiesLast = maxDate(storyEntries.map((story) => story.lastModified));
  const siteLast = maxDate([postsLast, docsLast, storiesLast]);

  // 허브 페이지들(크롤링/발견에 도움)
  addEntry(out, seen, SITE_URL, siteLast);
  addEntry(out, seen, joinUrl(SITE_URL, "/docs"), docsLast);
  addEntry(out, seen, joinUrl(SITE_URL, "/blog"), postsLast);
  addEntry(out, seen, joinUrl(SITE_URL, "/stories"), storiesLast);
  addEntry(out, seen, joinUrl(SITE_URL, "/about"), siteLast);
  addEntry(out, seen, joinUrl(SITE_URL, "/contact"), siteLast);

  for (const p of postEntries) addEntry(out, seen, p.url, p.lastModified);
  for (const d of docEntries) addEntry(out, seen, d.url, d.lastModified);
  for (const story of storyEntries) {
    addEntry(out, seen, story.url, story.lastModified);
  }

  return out;
}
