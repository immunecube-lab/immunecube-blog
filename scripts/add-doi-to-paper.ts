import fg from "fast-glob";
import fs from "node:fs";

type PaperMeta = {
  title: string;
  year?: number;
  journal?: string;
};

const FILES = ["docs/**/*.tsx"];
const DOI_REGEX = /doi\s*=\s*"/;

function extractPaper(content: string) {
  const m = content.match(/<Paper[\s\S]*?\/>/m);
  if (!m) return null;
  return m[0];
}

function extractMeta(block: string): PaperMeta | null {
  const title = block.match(/title\s*=\s*"([^"]+)"/)?.[1];
  if (!title) return null;

  const year = block.match(/year\s*=\s*\{(\d{4})\}/)?.[1];
  const journal = block.match(/journal\s*=\s*"([^"]+)"/)?.[1];

  return {
    title,
    year: year ? Number(year) : undefined,
    journal,
  };
}

async function lookupDOI(meta: PaperMeta): Promise<string | null> {
  const params = new URLSearchParams({
    "query.title": meta.title,
    rows: "5",
  });

  if (meta.year) {
    params.set(
      "filter",
      `from-pub-date:${meta.year}-01-01,until-pub-date:${meta.year}-12-31`
    );
  }

  const res = await fetch(
    `https://api.crossref.org/works?${params.toString()}`,
    {
      headers: {
        "User-Agent":
          "immunecube-doi-bot/1.0 (mailto:you@example.com)",
      },
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  const item = data?.message?.items?.[0];
  return item?.DOI ?? null;
}

async function main() {
  const files = await fg(FILES);

  for (const file of files) {
    const src = fs.readFileSync(file, "utf8");
    const block = extractPaper(src);
    if (!block) continue;
    if (DOI_REGEX.test(block)) continue; // 이미 DOI 있음

    const meta = extractMeta(block);
    if (!meta) continue;

    const doi = await lookupDOI(meta);
    if (!doi) continue;

    const updated = block.replace(
      />$/,
      `\n  doi="${doi}"\n/>`
    );

    fs.writeFileSync(file, src.replace(block, updated), "utf8");
    console.log(`✅ ${file} + doi=${doi}`);
  }
}

main();
