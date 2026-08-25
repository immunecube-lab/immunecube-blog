import fg from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";
import sharp from "sharp";

const STORIES_DIR = path.join(process.cwd(), "content", "stories");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const RECOMMENDED_WIDTH = 1280;
const RECOMMENDED_HEIGHT = 720;
const MAX_BYTES = 300 * 1024;
const REQUIRED_EXTENSION = ".webp";

const storyFiles = await fg("**/*.mdx", { cwd: STORIES_DIR });
const errors = [];

for (const file of storyFiles) {
  const sourcePath = path.join(STORIES_DIR, file);
  const source = await fs.readFile(sourcePath, "utf8");
  const { data } = matter(source);
  const cover = typeof data.cover === "string" ? data.cover.trim() : "";

  if (!cover) {
    continue;
  }

  if (!cover.startsWith("/images/stories/")) {
    errors.push(`${file}: cover는 /images/stories/ 아래의 절대 경로여야 합니다.`);
    continue;
  }

  const extension = path.extname(cover).toLowerCase();
  if (extension !== REQUIRED_EXTENSION) {
    errors.push(`${file}: cover 형식은 WebP여야 합니다.`);
  }

  const imagePath = path.resolve(PUBLIC_DIR, `.${cover}`);
  if (!imagePath.startsWith(`${PUBLIC_DIR}${path.sep}`)) {
    errors.push(`${file}: 올바르지 않은 cover 경로입니다.`);
    continue;
  }

  try {
    const [stats, metadata] = await Promise.all([
      fs.stat(imagePath),
      sharp(imagePath).metadata(),
    ]);

    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;
    const isSixteenByNine = width > 0 && height > 0 && width * 9 === height * 16;

    if (!isSixteenByNine) {
      errors.push(
        `${file}: cover 비율은 16:9여야 합니다. ` +
          `(권장 ${RECOMMENDED_WIDTH}x${RECOMMENDED_HEIGHT}px, 현재 ${width || "?"}x${height || "?"})`,
      );
    }

    if (stats.size > MAX_BYTES) {
      errors.push(
        `${file}: cover가 300KB를 초과합니다. (현재 ${Math.ceil(stats.size / 1024)}KB)`,
      );
    }
  } catch {
    errors.push(`${file}: cover 파일을 찾거나 읽을 수 없습니다: ${cover}`);
  }
}

if (errors.length > 0) {
  console.error("[story covers] 검증 실패\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`[story covers] ${storyFiles.length}개 면역이야기 검증 완료`);
