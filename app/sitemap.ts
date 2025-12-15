import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://datacube.immunecube.com";

function readDirToEntries(dirPath: string, urlPrefix: string) {
  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((name) => {
      const slug = name.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(dirPath, name);
      const stat = fs.statSync(fullPath);

      return {
        url: `${SITE_URL}/${urlPrefix}/${encodeURIComponent(slug)}`,
        lastModified: stat.mtime,
      };
    });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const postDir = path.join(process.cwd(), "content", "post");
  const docsDir = path.join(process.cwd(), "content", "docs");

  const blogEntries = readDirToEntries(postDir, "blog"); // ✅ /blog
  const docsEntries = readDirToEntries(docsDir, "docs"); // ✅ /docs

  return [
    { url: SITE_URL, lastModified: new Date() },
    ...blogEntries,
    ...docsEntries,
  ];
}
