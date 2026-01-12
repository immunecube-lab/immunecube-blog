import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("content");
const EXTENSIONS = new Set([".md", ".mdx"]);

// zero-width + BOM
const ZW_CHARS = /[\u200B\u200C\u200D\uFEFF]/g;
// non-breaking space
const NBSP = /\u00A0/g;
// fullwidth asterisk
const FULLWIDTH_ASTERISK = /＊/g;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.isFile() && EXTENSIONS.has(path.extname(p))) {
      normalizeFile(p);
    }
  }
}

// Apply replacer only outside inline code spans: `...`
function replaceOutsideInlineCode(line, replacer) {
  const parts = line.split(/(`[^`]*`)/g);
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) parts[i] = replacer(parts[i]);
  }
  return parts.join("");
}

function applyFixes(text) {
  let out = text;

  // 0) Remove zero-width and BOM globally
  out = out.replace(ZW_CHARS, "");

  // 1) Normalize NBSP to regular space globally
  out = out.replace(NBSP, " ");

  // 2) Normalize fullwidth asterisk
  out = out.replace(FULLWIDTH_ASTERISK, "*");

  // 3) Strong delimiter hygiene (SAFETY-FIRST)
  //    - Only touch spaces INSIDE **...**
  //    - Never remove the normal spacing BEFORE an opening **
  //
  //    Fix:
  //      ** text**  -> **text**
  //      **text **  -> **text**
  //    Preserve:
  //      foo **bar**  (space before opening ** stays)

  // 3-1) After opening **: remove spaces immediately after ** (inside strong)
  //      "**   text" -> "**text"
  out = out.replace(/\*\*[\s\u00A0]+(?=\S)/g, "**");

  // 3-2) Before closing **: remove spaces immediately before ** (inside strong)
  //      "text   **" -> "text**"
  //      Implemented WITHOUT lookbehind for compatibility:
  //      capture the preceding visible char, then drop the spaces.
  out = out.replace(/(\S)[\s\u00A0]+(\*\*)/g, "$1$2");

  // 3-3) Controls right after closing ** (rare paste artifact)
  out = out.replace(/\*\*[\u200B\u200C\u200D\uFEFF]+/g, "**");

  // NOTE: Do NOT remove controls/spaces right before ** globally.
  // That pattern can incorrectly delete the space before an opening **.

  // 4) Optional conversions (keep your original intent)
  // 4-1) Smart-quote case: **“text”** / **‘text’** -> <strong>…</strong>
  out = out.replace(/\*\*([“‘][\s\S]+?[”’])\*\*/g, "<strong>$1</strong>");

  // 4-2) Parentheses-leading case: **( ... )** -> (<strong>...</strong>)
  out = out.replace(/\*\*\(([\s\S]*?)\)\*\*/g, "(<strong>$1</strong>)");

  return out;
}

function normalizeFile(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const lines = src.split(/\r?\n/);
  let changed = false;

  // Skip YAML frontmatter
  let i = 0;
  if (lines[0] === "---") {
    i = 1;
    while (i < lines.length && lines[i] !== "---") i++;
    if (i < lines.length && lines[i] === "---") i++;
  }

  // Skip fenced code blocks
  let inFence = false;
  let fenceMarker = null;

  for (; i < lines.length; i++) {
    const line = lines[i];

    const fenceMatch = line.match(/^(\s*)(```|~~~)/);
    if (fenceMatch) {
      const marker = fenceMatch[2];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (marker === fenceMarker) {
        inFence = false;
        fenceMarker = null;
      }
      continue;
    }
    if (inFence) continue;

    const replaced = replaceOutsideInlineCode(line, applyFixes);
    if (replaced !== line) {
      lines[i] = replaced;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    console.log("normalized:", filePath);
  }
}

walk(ROOT);
console.log("MDX normalization done.");
