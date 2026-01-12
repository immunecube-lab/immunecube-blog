import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("content");
const EXTENSIONS = new Set([".md", ".mdx"]);

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.isFile() && EXTENSIONS.has(path.extname(p))) {
      normalizeFile(p);
    }
  }
}

/**
 * Apply a transform only outside inline code spans: `...`
 * (simple split; matches your previous approach)
 */
function replaceOutsideInlineCode(line: string, transform: (s: string) => string): string {
  const parts = line.split(/(`[^`]*`)/g);
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) parts[i] = transform(parts[i]);
  }
  return parts.join("");
}

function isWhitespace(ch: string): boolean {
  return ch === " " || ch === "\t";
}

/**
 * Insert ONE space immediately BEFORE OPENING "**" only.
 * - Never insert space after "**"
 * - Never touch closing "**"
 * - Skip "***" patterns (to avoid bold+italic edge cases)
 */
function addSpaceBeforeOpeningStrong(segment: string): string {
  let out = "";
  let i = 0;
  let inStrong = false;

  while (i < segment.length) {
    // Preserve escapes: \* or \` etc.
    if (segment[i] === "\\" && i + 1 < segment.length) {
      out += segment.slice(i, i + 2);
      i += 2;
      continue;
    }

    // Detect exact "**" (but ignore "***")
    if (
      segment[i] === "*" &&
      segment[i + 1] === "*" &&
      segment[i + 2] !== "*" // not "***"
    ) {
      if (!inStrong) {
        // Opening "**"
        // Insert a space BEFORE it only if immediately preceded by non-whitespace
        // and not at the start of the segment.
        if (out.length > 0) {
          const prev = out[out.length - 1];
          if (!isWhitespace(prev)) {
            out += " ";
          }
        }
        out += "**";
        inStrong = true;
      } else {
        // Closing "**" -> do not add spaces
        out += "**";
        inStrong = false;
      }
      i += 2;
      continue;
    }

    out += segment[i];
    i += 1;
  }

  return out;
}

function normalizeFile(filePath: string) {
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
  let fenceMarker: "```" | "~~~" | null = null;

  for (; i < lines.length; i++) {
    const line = lines[i];

    const fenceMatch = line.match(/^(\s*)(```|~~~)/);
    if (fenceMatch) {
      const marker = fenceMatch[2] as "```" | "~~~";
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

    const replaced = replaceOutsideInlineCode(line, addSpaceBeforeOpeningStrong);
    if (replaced !== line) {
      lines[i] = replaced;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    console.log("fixed:", filePath);
  }
}

walk(ROOT);
console.log("Done. Inserted spaces only before opening **.");
