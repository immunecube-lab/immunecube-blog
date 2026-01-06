import fg from "fast-glob";
import fs from "node:fs";

const FILES = [
  "content/docs/**/*.mdx",
  "!**/node_modules/**",
  "!**/.next/**",
  "!**/dist/**",
];

function fix(content: string) {
  // 케이스 1: 줄에 '/'만 있고 다음 줄에 doi, 그 다음 줄에 '/>'
  //   /
  //   doi="..."
  //   />
  const re1 = /\n\s*\/\s*\n(\s*)doi="([^"]+)"\s*\n\s*\/>\s*/g;

  // 케이스 2: 같은 줄에서 '/\n doi="..."' 형태로 남아있는 경우
  const re2 = /\/\s*\n(\s*)doi="([^"]+)"\s*\n\s*\/>\s*/g;

  let changed = false;

  let next = content.replace(re1, (_m, indent, doi) => {
    changed = true;
    return `\n${indent}doi="${doi}"\n/>`;
  });

  next = next.replace(re2, (_m, indent, doi) => {
    changed = true;
    return `\n${indent}doi="${doi}"\n/>`;
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
