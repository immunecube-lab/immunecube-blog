// app/sitemap.ts
import type { MetadataRoute } from "next";
import * as site from "@/.velite";

const SITE_URL = "https://immunecube.com";

type VeliteItem = {
  slug: string;
  published?: boolean;
  date?: string | Date;
  updated?: string | Date;
};

// "docs/xxx" 또는 "/docs/xxx" 같은 형태가 들어오면 "xxx"로 정리
function normalizeCollectionSlug(slug: string, collection: "docs" | "blog") {
  let s = (slug ?? "").trim();
  if (!s) return "";

  // leading slash 제거
  if (s.startsWith("/")) s = s.slice(1);

  // collection prefix 제거(혹시 섞여 들어온 경우 방어)
  // blog 컬렉션은 posts/ 로 들어오는 케이스까지 방어(안전)
  const prefixes = collection === "blog" ? ["blog/", "posts/"] : ["docs/"];
  for (const prefix of prefixes) {
    if (s.startsWith(prefix)) {
      s = s.slice(prefix.length);
      break;
    }
  }

  return s;
}

function pickLastMod(item: VeliteItem): Date {
  const v = item.updated ?? item.date;

  const d = v instanceof Date ? v : v ? new Date(v) : null;
  if (d && !Number.isNaN(d.getTime())) return d;

  // 정적 빌드에서는 "빌드 시각"이 최소 신호(항상 lastModified를 채움)
  return new Date();
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

function addEntry(out: MetadataRoute.Sitemap, url: string, lastModified?: Date) {
  // 중복 방지
  if ((out as any)._seen?.has(url)) return;
  (out as any)._seen ??= new Set<string>();
  (out as any)._seen.add(url);

  out.push(lastModified ? { url, lastModified } : { url });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];

  const posts = (((site as any).posts ?? []) as VeliteItem[])
    .filter((p) => p?.slug && p.published !== false)
    .map((p) => {
      const s = normalizeCollectionSlug(p.slug, "blog");
      if (!s) return null;

      return {
        url: joinUrl(SITE_URL, `/blog/${s}`),
        lastModified: pickLastMod(p),
      };
    })
    .filter(Boolean) as { url: string; lastModified: Date }[];

  const docs = (((site as any).docs ?? []) as VeliteItem[])
    .filter((d) => d?.slug && d.published !== false)
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
    .filter(Boolean) as { url: string; lastModified: Date }[];

  // 허브 페이지들: "콘텐츠 최신 갱신일" 기반 lastModified로 신호 강화
  const postsLast = maxDate(posts.map((p) => p.lastModified));
  const docsLast = maxDate(docs.map((d) => d.lastModified));
  const siteLast = maxDate([postsLast, docsLast]);

  // 허브 페이지들(크롤링/발견에 도움)
  addEntry(out, SITE_URL, siteLast);
  addEntry(out, joinUrl(SITE_URL, "/docs"), docsLast);
  addEntry(out, joinUrl(SITE_URL, "/blog"), postsLast);

  for (const p of posts) addEntry(out, p.url, p.lastModified);
  for (const d of docs) addEntry(out, d.url, d.lastModified);

  // 내부용 seen 제거(출력에 영향 없지만 타입 깨끗하게)
  delete (out as any)._seen;

  return out;
}
