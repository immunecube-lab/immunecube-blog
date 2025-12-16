// app/sitemap.ts
import type { MetadataRoute } from "next";
import * as site from "@/.velite";

const SITE_URL = "https://datacube.immunecube.com";

type VeliteItem = {
  slug: string;
  published?: boolean;
  // velite 스키마에 updated가 있으면 그걸 쓰세요. 없으면 new Date()로 처리합니다.
  updated?: string | Date;
};

function normalizePathSlug(slug: string) {
  // slug가 "/docs/..." 같은 형태로 들어와도 안전하게 처리
  const s = slug.startsWith("/") ? slug.slice(1) : slug;
  if (s.startsWith("docs/")) return s.slice("docs/".length);
  if (s.startsWith("blog/")) return s.slice("blog/".length);
  return s;
}

function lastMod(v?: string | Date) {
  if (!v) return new Date();
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = (((site as any).posts ?? []) as VeliteItem[])
    .filter((p) => p.published !== false)
    .map((p) => ({
      url: `${SITE_URL}/blog/${encodeURIComponent(normalizePathSlug(p.slug))}`,
      lastModified: lastMod(p.updated),
    }));

  const docs = (((site as any).docs ?? []) as VeliteItem[])
    .filter((d) => d.published !== false)
    .map((d) => ({
      // ✅ 핵심: 서브폴더 경로가 아니라 "docs/slug"로 고정
      url: `${SITE_URL}/docs/${encodeURIComponent(normalizePathSlug(d.slug))}`,
      lastModified: lastMod(d.updated),
    }));

  return [{ url: SITE_URL, lastModified: new Date() }, ...posts, ...docs];
}
