import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const DEFAULT_INPUT = "E:\\홈페이지용 사진";
const DEFAULT_OUTPUT = path.join("public", "images", "person");
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function readArg(name, fallback) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : fallback;
}

function normalizeBaseName(filename) {
  const parsed = path.parse(filename);
  return parsed.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const inputDir = path.resolve(readArg("input", DEFAULT_INPUT));
const outputDir = path.resolve(readArg("output", DEFAULT_OUTPUT));
const size = Number.parseInt(readArg("size", "800"), 10);
const quality = Number.parseInt(readArg("quality", "80"), 10);
const dryRun = process.argv.includes("--dry-run");

if (!Number.isFinite(size) || size <= 0) {
  throw new Error("--size must be a positive number.");
}

if (!Number.isFinite(quality) || quality < 1 || quality > 100) {
  throw new Error("--quality must be between 1 and 100.");
}

const entries = await fs.readdir(inputDir, { withFileTypes: true });
const files = entries
  .filter((entry) => entry.isFile())
  .filter((entry) => SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()));

if (!dryRun) {
  await fs.mkdir(outputDir, { recursive: true });
}

let converted = 0;
let inputBytes = 0;
let outputBytes = 0;

for (const file of files) {
  const source = path.join(inputDir, file.name);
  const outputName = `${normalizeBaseName(file.name)}.webp`;
  const target = path.join(outputDir, outputName);
  const sourceStat = await fs.stat(source);
  inputBytes += sourceStat.size;

  if (dryRun) {
    console.log(`${file.name} -> ${outputName}`);
    continue;
  }

  await sharp(source)
    .resize(size, size, {
      fit: "cover",
      position: "attention",
      withoutEnlargement: true,
    })
    .webp({ quality, effort: 4 })
    .toFile(target);

  const targetStat = await fs.stat(target);
  outputBytes += targetStat.size;
  converted += 1;
  console.log(`${file.name} -> ${outputName} (${formatBytes(sourceStat.size)} -> ${formatBytes(targetStat.size)})`);
}

if (dryRun) {
  console.log(`Dry run: ${files.length} image(s) would be converted.`);
} else {
  console.log(`Converted ${converted} image(s) to ${outputDir}.`);
  console.log(`Total size: ${formatBytes(inputBytes)} -> ${formatBytes(outputBytes)}.`);
}
