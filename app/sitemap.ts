import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://datacube.immunecube.com";

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function entriesFrom(contentRoot: string, urlPrefix: string) {
  return walk(contentRoot).map((fullPath) => {
    const rel = path.relative(contentRoot, fullPath).replace(/\.(md|mdx)$/, "");
    const slugPath = rel.split(path.sep).map(encodeURIComponent).join("/");
    const stat = fs.statSync(fullPath);

    return {
      url: `${SITE_URL}/${urlPrefix}/${slugPath}`,
      lastModified: stat.mtime,
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const postRoot = path.join(process.cwd(), "content", "posts");
  const docsRoot = path.join(process.cwd(), "content", "docs");

  const blogEntries = entriesFrom(postRoot, "blog");
  const docsEntries = entriesFrom(docsRoot, "docs");

  return [
    { url: SITE_URL, lastModified: new Date() },
    ...blogEntries,
    ...docsEntries,
  ];
}
