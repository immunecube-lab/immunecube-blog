import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

const AUDIT_FILE = "./audit-broken-bold.json";

// ✅ 네 MDX가 있는 루트 폴더로 맞추기 (예: "content", "src/content", "docs" 등)
const CONTENT_GLOBS = [
  "content/**/*.{md,mdx}",
  "src/content/**/*.{md,mdx}",
  "docs/**/*.{md,mdx}",
];

function toB(token) {
  // token: "**텍스트**"
  const inner = token.slice(2, -2);
  return `<b>${inner}</b>`;
}

async function main() {
  if (!fs.existsSync(AUDIT_FILE)) {
    throw new Error(`Audit file not found: ${AUDIT_FILE}`);
  }

  const audit = JSON.parse(fs.readFileSync(AUDIT_FILE, "utf-8"));
  if (!Array.isArray(audit)) throw new Error("Audit JSON must be an array.");

  // 1) slug -> occurrences 맵
  const targets = new Map();
  for (const item of audit) {
    if (!item?.slug || !Array.isArray(item.occurrences) || item.occurrences.length === 0) continue;
    targets.set(item.slug, Array.from(new Set(item.occurrences)));
  }

  if (targets.size === 0) {
    console.log("No targets. (Nothing to fix)");
    return;
  }

  // 2) 프로젝트 내 md/mdx 스캔해서 slug -> file 매핑
  const files = await fg(CONTENT_GLOBS, { dot: true });
  const slugToFile = new Map();

  for (const f of files) {
    const raw = fs.readFileSync(f, "utf-8");
    const fm = matter(raw).data || {};
    const slug = fm.slug;
    if (typeof slug === "string" && targets.has(slug)) {
      slugToFile.set(slug, f);
    }
  }

  // 3) 실제 치환
  let changedFiles = 0;
  for (const [slug, tokens] of targets.entries()) {
    const file = slugToFile.get(slug);
    if (!file) {
      console.log(`MISS: slug=${slug} (mdx file not found via frontmatter slug)`);
      continue;
    }

    const raw = fs.readFileSync(file, "utf-8");
    const parsed = matter(raw);

    let body = parsed.content;
    let changed = false;

    for (const token of tokens) {
      if (typeof token !== "string" || !token.startsWith("**") || !token.endsWith("**")) continue;

      if (body.includes(token)) {
        body = body.split(token).join(toB(token));
        changed = true;
      }
    }

    if (changed) {
      // 백업(선택이지만 안전)
      fs.writeFileSync(file + ".bak", raw, "utf-8");

      const out = matter.stringify(body, parsed.data);
      fs.writeFileSync(file, out, "utf-8");

      changedFiles++;
      console.log(`FIXED: ${slug} -> ${file}`);
    } else {
      console.log(`NOCHANGE: ${slug} -> ${file} (tokens not found in body)`);
    }
  }

  console.log(`Done. Changed files: ${changedFiles}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
