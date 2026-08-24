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

// These stories predate the cover-image policy. Remove an entry after adding its cover.
const LEGACY_STORIES_WITHOUT_COVERS = new Set([
  "4s-cholesterol-debate-turning-point.mdx",
  "after-4s-how-low-ldl.mdx",
  "alcoholic-nonalcoholic-fatty-liver-history.mdx",
  "alzheimer-inflammation-lps-glymphatic-history.mdx",
  "atkins-taubes-nusi-kevin-hall.mdx",
  "cancer-cachexia-lps-inflammation-history.mdx",
  "cancer-tumor-microenvironment-inflammation-history.mdx",
  "cholesterol-hypothesis-1913-1984-debate.mdx",
  "chronic-low-grade-inflammation-history.mdx",
  "copd-lps-innate-immunity-history.mdx",
  "heart-failure-lps-gut-heart-axis-history.mdx",
  "immunity-aging-inflammation-recovery.mdx",
  "kidney-lps-gut-kidney-axis-history.mdx",
  "ldl-receptor-statin-emergence.mdx",
  "ldl-to-plaque-rupture-lps-cardiovascular-history.mdx",
  "lps-chronic-inflammation-mechanisms-history.mdx",
  "madonna-kim-taewon-sepsis-endotoxin.mdx",
  "modern-food-environment-breaks-body-weight-defense.mdx",
  "obesity-diabetes-metaflammation-history.mdx",
  "sarcopenia-frailty-inflammation-lps-history.mdx",
  "cholesterol-misinterpretation-lbc1936.mdx",
  "ldl-not-important-myth.mdx",
  "lipid-hypothesis-subjective-validation.mdx",
  "pre-drug-lifestyle-immunity.mdx",
  "statin-anti-inflammatory-mechanism.mdx",
  "why-cholesterol-should-be-controlled.mdx",
  "why-ros-became-bad-molecule.mdx",
  "ros-is-a-signal-redox-homeostasis.mdx",
  "animal-cell-culture-biopharmaceutical-history.mdx",
]);

const storyFiles = await fg("**/*.mdx", { cwd: STORIES_DIR });
const errors = [];

for (const file of storyFiles) {
  const sourcePath = path.join(STORIES_DIR, file);
  const fileName = path.basename(file);
  const source = await fs.readFile(sourcePath, "utf8");
  const { data } = matter(source);
  const cover = typeof data.cover === "string" ? data.cover.trim() : "";

  if (!cover) {
    if (!LEGACY_STORIES_WITHOUT_COVERS.has(fileName) && !LEGACY_STORIES_WITHOUT_COVERS.has(file)) {
      errors.push(`${file}: frontmatter에 cover가 없습니다.`);
    }
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
