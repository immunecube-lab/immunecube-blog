// app/sitemap.ts
import type { MetadataRoute } from "next";
import * as site from "@/.velite";

const SITE_URL = "https://datacube.immunecube.com";

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
  const prefix = `${collection}/`;
  if (s.startsWith(prefix)) s = s.slice(prefix.length);

  return s;
}

function pickLastMod(item: VeliteItem): Date | undefined {
  const v = item.updated ?? item.date;
  if (!v) return undefined;

  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function joinUrl(base: string, path: string) {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

function addEntry(
  out: MetadataRoute.Sitemap,
  url: string,
  lastModified?: Date
) {
  // 중복 방지
  if ((out as any)._seen?.has(url)) return;
  (out as any)._seen ??= new Set<string>();
  (out as any)._seen.add(url);

  out.push(lastModified ? { url, lastModified } : { url });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];

  // 허브 페이지들(크롤링/발견에 도움)
  addEntry(out, SITE_URL);
  addEntry(out, joinUrl(SITE_URL, "/docs"));
  addEntry(out, joinUrl(SITE_URL, "/blog"));

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
    .filter(Boolean) as { url: string; lastModified?: Date }[];

  for (const p of posts) addEntry(out, p.url, p.lastModified);

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
    .filter(Boolean) as { url: string; lastModified?: Date }[];

  for (const d of docs) addEntry(out, d.url, d.lastModified);

  // 내부용 seen 제거(출력에 영향 없지만 타입 깨끗하게)
  delete (out as any)._seen;

  return out;
}
