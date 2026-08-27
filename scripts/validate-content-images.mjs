import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import fg from "fast-glob";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const MAX_RASTER_BYTES = 2 * 1024 * 1024;
const MAX_RASTER_DIMENSION = 4000;
const imagePattern = /(?:src|cover)\s*[=:]\s*["'`](.*?)["'`]/g;
const contentFiles = await fg(["content/**/*.{md,mdx}", "app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"], { unique: true });
const references = new Map();
const errors = [];
const warnings = [];

function getLocalImagePath(candidate) {
  const value = candidate.trim();
  if (!value || value.includes("${") || value.includes("{") || value.includes("}")) return null;
  if (/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(value) || /^(?:data|blob):/i.test(value)) return null;

  const pathname = value.split(/[?#]/, 1)[0];
  let decodedPathname = pathname;
  try {
    decodedPathname = decodeURIComponent(pathname);
  } catch {
    // A literal '%' can be a valid filename character. Use the raw pathname.
  }
  if (!decodedPathname.startsWith("/images/")) return null;
  return decodedPathname;
}

for (const file of contentFiles) {
  if (file.endsWith("README.md")) continue;
  const source = await fs.readFile(file, "utf8");
  for (const match of source.matchAll(imagePattern)) {
    const url = getLocalImagePath(match[1]);
    if (!url) continue;
    references.set(url, [...(references.get(url) ?? []), file]);
  }
}

for (const [url, files] of references) {
  const relative = url.replace(/^\//, "");
  const imagePath = path.resolve(PUBLIC_DIR, relative);
  if (!imagePath.startsWith(`${PUBLIC_DIR}${path.sep}`)) {
    errors.push(`${url}: public 디렉터리 밖의 경로입니다.`);
    continue;
  }

  try {
    const stats = await fs.stat(imagePath);
    const extension = path.extname(imagePath).toLowerCase();
    if (extension === ".svg") continue;
    if (stats.size > MAX_RASTER_BYTES) {
      warnings.push(`${url}: ${Math.ceil(stats.size / 1024)}KB (${files[0]})`);
    }
    const metadata = await sharp(imagePath).metadata();
    if ((metadata.width ?? 0) > MAX_RASTER_DIMENSION || (metadata.height ?? 0) > MAX_RASTER_DIMENSION) {
      warnings.push(`${url}: ${metadata.width}x${metadata.height}px (${files[0]})`);
    }
  } catch {
    errors.push(`${url}: 참조한 이미지 파일을 찾거나 읽을 수 없습니다. (${files[0]})`);
  }
}

if (warnings.length) {
  console.warn(`[content images] 최적화 권고 ${warnings.length}건`);
  warnings.slice(0, 30).forEach((warning) => console.warn(`- ${warning}`));
}
if (errors.length) {
  console.error(`[content images] 검증 실패 ${errors.length}건`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`[content images] 정적 로컬 참조 이미지 ${references.size}개 검증 완료`);
