import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const collections = [
  ["docs", "DOCS_INDEX", "docs.json"],
  ["stories", "STORIES_INDEX", "stories.json"],
  ["blog", "BLOG_INDEX", "posts.json"],
];

function normalizeFinalPath(slug, collection) {
  let value = String(slug ?? "").trim().replace(/^\/+|\/+$/g, "");
  const prefixes = collection === "blog" ? ["blog/", "posts/"] : [`${collection}/`];
  const prefix = prefixes.find((candidate) => value.startsWith(candidate));
  if (prefix) value = value.slice(prefix.length);

  const parts = value.split("/").filter(Boolean);
  const normalized = collection === "docs" ? (parts.at(-1) ?? "") : parts.join("/");
  return normalized ? `/${collection}/${normalized}` : `/${collection}`;
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

const generatedSource = await fs.readFile(path.join(ROOT, "generated", "content-index.ts"), "utf8");
const errors = [];
const allVeliteUrls = [];
const allGeneratedUrls = [];

for (const [collection, exportName, jsonFile] of collections) {
  const source = await fs.readFile(path.join(ROOT, ".velite", jsonFile), "utf8");
  const veliteItems = JSON.parse(source);
  const match = generatedSource.match(new RegExp(`export const ${exportName}[^=]*= \\[([\\s\\S]*?)\\n\\]`));
  if (!match) {
    errors.push(`${exportName}: generated export를 찾지 못했습니다.`);
    continue;
  }

  const generatedSlugs = [...match[1].matchAll(/\bslug:\s*"([^"]+)"/g)].map((item) => item[1]);
  const veliteUrls = veliteItems.map((item) => normalizeFinalPath(item.slug, collection));
  const generatedUrls = generatedSlugs.map((slug) => normalizeFinalPath(slug, collection));
  allVeliteUrls.push(...veliteUrls);
  allGeneratedUrls.push(...generatedUrls);

  const veliteDuplicates = findDuplicates(veliteUrls);
  const generatedDuplicates = findDuplicates(generatedUrls);
  if (veliteDuplicates.length) {
    errors.push(`${collection}: 동일한 최종 URL 충돌: ${veliteDuplicates.join(", ")}`);
  }
  if (generatedDuplicates.length) {
    errors.push(`${collection}: generated index 최종 URL 충돌: ${generatedDuplicates.join(", ")}`);
  }

  const generatedSet = new Set(generatedUrls);
  const veliteSet = new Set(veliteUrls);
  const missing = [...veliteSet].filter((url) => !generatedSet.has(url));
  const stale = [...generatedSet].filter((url) => !veliteSet.has(url));
  if (missing.length) errors.push(`${collection}: index 누락 ${missing.length}개 (${missing.slice(0, 5).join(", ")})`);
  if (stale.length) errors.push(`${collection}: stale index ${stale.length}개 (${stale.slice(0, 5).join(", ")})`);
}

const crossCollectionVeliteDuplicates = findDuplicates(allVeliteUrls);
const crossCollectionGeneratedDuplicates = findDuplicates(allGeneratedUrls);
if (crossCollectionVeliteDuplicates.length) {
  errors.push(`collection 간 최종 URL 충돌: ${crossCollectionVeliteDuplicates.join(", ")}`);
}
if (crossCollectionGeneratedDuplicates.length) {
  errors.push(`generated collection 간 최종 URL 충돌: ${crossCollectionGeneratedDuplicates.join(", ")}`);
}

if (errors.length) {
  console.error("[content index] 검증 실패\n");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("[content index] Velite 출력과 생성 인덱스의 최종 URL이 일치합니다.");
