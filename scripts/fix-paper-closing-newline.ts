import fg from "fast-glob";
import fs from "node:fs";

const FILES = [
  "content/docs/**/*.mdx",
  "!**/node_modules/**",
  "!**/.next/**",
  "!**/dist/**",
];

function fix(content: string) {
  let changed = false;

  // 케이스 A: "/>##" 또는 "/> ###" 같이 바로 헤딩이 붙은 경우
  // "/>" 뒤에 줄바꿈 2개(빈 줄 포함)를 넣어 헤딩을 분리
  const reHeading = /\/>\s*(#{1,6}\s+)/g;

  const next = content.replace(reHeading, (_m, heading) => {
    changed = true;
    return `/>\n\n${heading}`;
  });

  return { next, changed };
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const files = await fg(FILES);

  let fixed = 0;

  for (const file of files) {
    const src = fs.readFileSync(file, "utf8");
    const { next, changed } = fix(src);

    if (!changed) continue;

    fixed++;
    console.log(`${dryRun ? "🟨 DRY" : "✅"} fixed: ${file}`);
    if (!dryRun) fs.writeFileSync(file, next, "utf8");
  }

  console.log(`\nDone. Fixed files: ${fixed}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
