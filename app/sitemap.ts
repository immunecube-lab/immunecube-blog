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

function normalizePathSlug(slug: string) {
  const s = slug.startsWith("/") ? slug.slice(1) : slug;
  if (s.startsWith("docs/")) return s.slice("docs/".length);
  if (s.startsWith("blog/")) return s.slice("blog/".length);
  return s;
}

// updated → date → undefined
function pickLastMod(item: VeliteItem): Date | undefined {
  const v = item.updated ?? item.date;
  if (!v) return undefined;

  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = (((site as any).posts ?? []) as VeliteItem[])
    .filter((p) => p.published !== false)
    .map((p) => {
      const lastModified = pickLastMod(p);
      return {
        url: `${SITE_URL}/blog/${encodeURIComponent(
          normalizePathSlug(p.slug)
        )}`,
        ...(lastModified ? { lastModified } : {}),
      };
    });

  const docs = (((site as any).docs ?? []) as VeliteItem[])
    .filter((d) => d.published !== false)
    .map((d) => {
      const lastModified = pickLastMod(d);
      return {
        url: `${SITE_URL}/docs/${encodeURIComponent(
          normalizePathSlug(d.slug)
        )}`,
        ...(lastModified ? { lastModified } : {}),
      };
    });

  // 홈은 의미 있는 변경 시점이 없으므로 lastModified 생략
  return [
    { url: SITE_URL },
    ...posts,
    ...docs,
  ];
}
