import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("content");
const EXTENSIONS = new Set([".md", ".mdx"]);

// Characters that often break markdown parsing when copy/pasted
const ZW_CHARS = /[\u200B\u200C\u200D\uFEFF]/g; // zero-width + BOM
const NBSP = /\u00A0/g; // non-breaking space
const FULLWIDTH_ASTERISK = /＊/g; // U+FF0A

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.isFile() && EXTENSIONS.has(path.extname(p))) {
      normalizeFile(p);
    }
  }
}

function replaceOutsideInlineCode(line, replacer) {
  const parts = line.split(/(`[^`]*`)/g);
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) parts[i] = replacer(parts[i]);
  }
  return parts.join("");
}

function applyFixes(text) {
  let out = text;

  // 0) Remove zero-width and BOM characters globally (safe)
  out = out.replace(/[\u200B\u200C\u200D\uFEFF]/g, "");

  // 0-1) Normalize NBSP to regular space globally
  out = out.replace(/\u00A0/g, " ");

  // 0-2) Normalize fullwidth asterisk (rare but happens in paste)
  out = out.replace(/＊/g, "*");

  // 0-3) CRITICAL: clean garbage RIGHT NEXT TO strong delimiters (**)
  // - Remove spaces/controls between ** and the next visible char
  // - Remove spaces/controls between previous visible char and **
  //
  // Examples fixed:
  //   ** text**   -> **text**
  //   **text **   -> **text**
  //   **text** "  -> **text**"
  //   **text**\u200B" -> **text**"
  out = out
    // after opening **
    .replace(/\*\*[\s\u00A0]+/g, "**")
    // before closing **
    .replace(/[\s\u00A0]+\*\*/g, "**")
    // controls right after closing **
    .replace(/\*\*[\u200B\u200C\u200D\uFEFF]+/g, "**")
    // controls right before opening ** (rare)
    .replace(/[\u200B\u200C\u200D\uFEFF]+\*\*/g, "**");

  // 1) Smart-quote case: **“text”** / **‘text’** -> <strong>…</strong>
  out = out.replace(/\*\*([“‘][\s\S]+?[”’])\*\*/g, "<strong>$1</strong>");

  // 2) Parentheses-leading case: **( ... )** -> (<strong>...</strong>)
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
