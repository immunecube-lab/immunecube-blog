import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://datacube.immunecube.com";

function walkFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(full)); // ✅ 재귀
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      files.push(full);
    }
  }
  return files;
}

function toSitemapEntries(contentRoot: string, urlPrefix: string) {
  const files = walkFiles(contentRoot);

  return files.map((fullPath) => {
    // contentRoot 기준 상대경로 → URL 경로로 변환
    // 예: content/docs/a/b.mdx → a/b
    const rel = path.relative(contentRoot, fullPath);
    const noExt = rel.replace(/\.(md|mdx)$/, "");

    // Windows에서도 안전하게 URL 슬래시로
    const slugPath = noExt.split(path.sep).map(encodeURIComponent).join("/");

    const stat = fs.statSync(fullPath);

    return {
      url: `${SITE_URL}/${urlPrefix}/${slugPath}`,
      lastModified: stat.mtime,
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const postRoot = path.join(process.cwd(), "content", "post");
  const docsRoot = path.join(process.cwd(), "content", "docs");

  const blogEntries = toSitemapEntries(postRoot, "blog"); // ✅ /blog/...
  const docsEntries = toSitemapEntries(docsRoot, "docs"); // ✅ /docs/...

  return [
    { url: SITE_URL, lastModified: new Date() },
    ...blogEntries,
    ...docsEntries,
  ];
}
