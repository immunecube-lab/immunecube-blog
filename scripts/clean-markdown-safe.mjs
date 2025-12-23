// scripts/clean-markdown-safe.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENTS_DIR = path.join(ROOT, "content");
const FILE_RE = /\.(md|mdx)$/i;

// hr로 간주할 패턴(공백 허용): ---  ***  ___
const HR_RE = /^\s{0,3}(-{3,}|\*{3,}|_{3,})\s*$/;

// 리스트/인용/표/들여쓰기코드 등 “빈 줄 변화에 민감한” 줄 감지
function isSensitiveLine(line) {
  const s = line;

  // blockquote
  if (/^\s{0,3}>\s?/.test(s)) return true;

  // list item (-, *, +, 1.)
  if (/^\s{0,3}([-*+])\s+/.test(s)) return true;
  if (/^\s{0,3}\d+\.\s+/.test(s)) return true;

  // table row (아주 단순 감지: | 로 시작)
  if (/^\s*\|/.test(s)) return true;

  // indented code block (4 spaces or tab)
  if (/^\s{4,}\S/.test(s)) return true;
  if (/^\t+\S/.test(s)) return true;

  return false;
}

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;

  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (e.isFile() && FILE_RE.test(e.name)) out.push(full);
  }
  return out;
}

function splitFrontmatter(raw) {
  if (!raw.startsWith("---\n")) return { fm: "", body: raw };

  const end = raw.indexOf("\n---", 4);
  if (end === -1) return { fm: "", body: raw };

  const fm = raw.slice(0, end + 4); // "\n---" 포함
  const body = raw.slice(end + 4);
  return { fm, body };
}

function normalizeBodySafe(body) {
  const lines = body.replace(/\r\n/g, "\n").split("\n");

  // 1) 코드 펜스(```/~~~) 내부는 그대로 통과시키기 위해 토글
  let inFence = false;

  // 2) hr 삭제 이후 “바로 이어지는 빈 줄”을 먹기 위한 플래그
  let eatFollowingBlanks = false;

  // 3) 1차로 hr만 제거하면서 라인 스트림 구성
  const stage1 = [];
  for (const line of lines) {
    const fence = line.match(/^(\s*)(```+|~~~+)\s*/);
    if (fence) {
      inFence = !inFence;
      stage1.push(line);
      eatFollowingBlanks = false;
      continue;
    }

    if (!inFence) {
      // hr 제거
      if (HR_RE.test(line)) {
        // 직전이 빈 줄이면 하나 제거(주변 공백 정리)
        while (stage1.length && stage1[stage1.length - 1].trim() === "") {
          stage1.pop();
        }
        eatFollowingBlanks = true;
        continue;
      }

      // hr 다음의 과도한 빈 줄 제거(첫 빈 줄까지는 “문단 분리”로 허용할 수도 있으나,
      // 안전하게 hr 제거 후에는 빈 줄을 0으로 두고 다음 컨텐츠가 나오면 규칙에 따라 1줄만 허용)
      if (eatFollowingBlanks && line.trim() === "") {
        continue;
      }
      eatFollowingBlanks = false;
    }

    stage1.push(line);
  }

  // 4) 이제 “빈 줄 런(연속 빈 줄)”을 분석해서,
  //    - 민감 구간 사이의 빈 줄은 유지(원문 그대로)
  //    - 일반 문단 사이 빈 줄은 1줄로 축약
  const out = [];
  inFence = false;

  // 헬퍼: i 위치에서 이전/다음 nonblank 라인 찾기
  const prevNonBlankIndex = (i) => {
    for (let k = i; k >= 0; k--) if (stage1[k].trim() !== "") return k;
    return -1;
  };
  const nextNonBlankIndex = (i) => {
    for (let k = i; k < stage1.length; k++) if (stage1[k].trim() !== "") return k;
    return -1;
  };

  for (let i = 0; i < stage1.length; i++) {
    const line = stage1[i];

    const fence = line.match(/^(\s*)(```+|~~~+)\s*/);
    if (fence) {
      inFence = !inFence;
      out.push(line);
      continue;
    }

    if (inFence) {
      out.push(line);
      continue;
    }

    // 빈 줄 런 처리
    if (line.trim() === "") {
      // 런의 끝까지 찾기
      let j = i;
      while (j < stage1.length && stage1[j].trim() === "") j++;

      const p = prevNonBlankIndex(i - 1);
      const n = nextNonBlankIndex(j);

      const prevLine = p >= 0 ? stage1[p] : "";
      const nextLine = n >= 0 ? stage1[n] : "";

      const sensitiveAround =
        (p >= 0 && isSensitiveLine(prevLine)) ||
        (n >= 0 && isSensitiveLine(nextLine));

      if (sensitiveAround) {
        // 안전 우선: 민감 구간 근처의 빈 줄은 원문 그대로 유지
        for (let k = i; k < j; k++) out.push("");
      } else {
        // 일반 구간: 빈 줄은 정확히 1줄만
        out.push("");
      }

      i = j - 1;
      continue;
    }

    out.push(line);
  }

  // 5) 파일 앞뒤의 불필요한 빈 줄 제거
  while (out.length && out[0].trim() === "") out.shift();
  while (out.length && out[out.length - 1].trim() === "") out.pop();

  return out.join("\n");
}

function main() {
  const files = walk(CONTENTS_DIR);
  let updated = 0;

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
    const { fm, body } = splitFrontmatter(raw);

    const cleanedBody = normalizeBodySafe(body);

    // frontmatter 뒤에는 관례적으로 빈 줄 1개 두고 본문 시작
    const next =
      fm
        ? fm + "\n" + (cleanedBody ? cleanedBody + "\n" : "")
        : (cleanedBody ? cleanedBody + "\n" : "");

    if (next !== raw) {
      fs.writeFileSync(file, next, "utf8");
      updated += 1;
      console.log(`[UPDATED] ${path.relative(ROOT, file)}`);
    }
  }

  console.log(`Done. Updated ${updated} file(s).`);
}

main();
