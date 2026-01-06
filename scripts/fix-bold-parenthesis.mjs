import fs from "node:fs";
import path from "node:path";

const target = process.argv[2];

if (!target) {
  console.error("Usage: node scripts/fix-bold-parenthesis.mjs <file-or-directory>");
  process.exit(1);
}

/**
 * 목표:
 * 1) **한글(영문)**을  -> **한글**(영문)을
 * 2) 한글(영문)**을    -> **한글**(영문)을
 *
 * - 괄호 안(영문)은 bold에서 제외
 * - 조사/구두점이 붙어도 자연스럽게 유지
 */
function fixContent(content) {
  let out = content;

  // 1) **KOR(ENG)**POST -> **KOR**(ENG)POST
  out = out.replace(
    /\*\*([^\n*()]*?[가-힣][^\n*()]*)\(([^()\n]+)\)\*\*([가-힣]+|[,.!:;?])?/g,
    (_m, kor, eng, post = "") => `**${String(kor).trimEnd()}**(${eng})${post}`
  );

  // 2) KOR(ENG)**POST -> **KOR**(ENG)POST
  // 앞에 별표가 이미 있으면(**) 중복 적용을 피하려고 prefix로 한 글자 보존
  out = out.replace(
    /(^|[^*])([^\n*()]*?[가-힣][^\n*()]*)\(([^()\n]+)\)\*\*([가-힣]+|[,.!:;?])?/g,
    (_m, prefix, kor, eng, post = "") =>
      `${prefix}**${String(kor).trimEnd()}**(${eng})${post}`
  );

  return out;
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  const fixed = fixContent(original);

  if (original !== fixed) {
    fs.writeFileSync(filePath, fixed, "utf8");
    console.log(`✔ fixed: ${filePath}`);
  }
}

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    // 여기 정규식은 반드시 한 줄로!
    if (/\.(tsx|mdx|md)$/.test(file)) {
      processFile(full);
    }
  }
}

const stat = fs.statSync(target);
if (stat.isDirectory()) walk(target);
else processFile(target);
