import fg from "fast-glob";
import fs from "node:fs";

const FILES = [
  "content/docs/**/*.mdx",
  "!**/node_modules/**",
  "!**/.next/**",
  "!**/dist/**",
];

function fixOne(content: string) {
  const m = content.match(/<Paper[\s\S]*?\/>/m);
  if (!m || m.index == null) return { next: content, changed: false };

  const block = m[0];
  const start = m.index;
  const end = start + block.length;

  // 블록 뒤의 다음 문자를 보고 줄바꿈이 없으면 넣어준다
  // (공백/탭이 끼어 있어도 "줄바꿈이 먼저 오지 않으면" 문제이므로 공백/탭은 제거)
  const after = content.slice(end);

  // 이미 바로 줄바꿈으로 시작하면 OK
  if (after.startsWith("\r\n") || after.startsWith("\n") || after.startsWith("\r")) {
    return { next: content, changed: false };
  }

  // 줄바꿈 없이 공백/탭 후 텍스트가 이어지는 경우가 많아서
  // 선행 공백/탭은 제거하고, 빈 줄 1개 포함해 분리
  const afterTrimmed = after.replace(/^[ \t]+/, "");
  const next = content.slice(0, end) + "\n\n" + afterTrimmed;

  return { next, changed: true };
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const files = await fg(FILES);

  let fixed = 0;

  for (const file of files) {
    const src = fs.readFileSync(file, "utf8");
    const { next, changed } = fixOne(src);

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
