// scripts/normalize-dates.mjs
//
// Normalize date fields in MDX frontmatter under ./content:
// - Remove surrounding quotes from `date:` and `updated:` when value looks like a date
// - If updated == date (after normalization), remove `updated:` line
//
// Usage:
//   node scripts/normalize-dates.mjs --dry
//   node scripts/normalize-dates.mjs
//
// Notes:
// - Only targets *.mdx
// - Only edits YAML frontmatter at the top of the file
// - Leaves other fields untouched

import fs from "node:fs";
import path from "node:path";

const ROOT = "content";
const EXT_RE = /\.mdx$/i;
const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(full));
    else if (ent.isFile() && EXT_RE.test(ent.name)) out.push(full);
  }
  return out;
}

// Remove wrapping single/double quotes, if present.
function stripOuterQuotes(s) {
  const t = s.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1);
  }
  return t;
}

// Accept YYYY-MM-DD or full ISO (YYYY-MM-DDTHH:mm:ss.sssZ) as "date-like".
function isDateLike(s) {
  const t = s.trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(t) || /^\d{4}-\d{2}-\d{2}T.*Z$/.test(t);
}

function parseKeyLine(line) {
  // matches: key: value
  const m = line.match(/^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)\s*$/);
  if (!m) return null;
  return { key: m[1], value: m[2] ?? "" };
}

function ensureNormalizedFrontmatter(raw, filePath) {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!fmMatch) return { changed: false, reason: "no_frontmatter", content: raw };

  const fm = fmMatch[1];
  const fmBlockLen = fmMatch[0].length;
  const body = raw.slice(fmBlockLen);

  const lines = fm.split(/\r?\n/);

  let dateIdx = -1;
  let updatedIdx = -1;

  // First pass: locate date/updated lines and normalize quotes if date-like
  for (let i = 0; i < lines.length; i++) {
    const parsed = parseKeyLine(lines[i]);
    if (!parsed) continue;

    if (parsed.key === "date") dateIdx = i;
    if (parsed.key === "updated") updatedIdx = i;
  }

  let dateVal;
  let updatedVal;

  // Normalize `date`
  if (dateIdx !== -1) {
    const parsed = parseKeyLine(lines[dateIdx]);
    if (parsed) {
      const v0 = parsed.value.trim();
      const v1 = stripOuterQuotes(v0);
      if (isDateLike(v1) && v1 !== v0) {
        lines[dateIdx] = `date: ${v1}`;
      }
      dateVal = isDateLike(v1) ? v1 : stripOuterQuotes(v0);
    }
  }

  // Normalize `updated`
  if (updatedIdx !== -1) {
    const parsed = parseKeyLine(lines[updatedIdx]);
    if (parsed) {
      const v0 = parsed.value.trim();
      const v1 = stripOuterQuotes(v0);
      if (isDateLike(v1) && v1 !== v0) {
        lines[updatedIdx] = `updated: ${v1}`;
      }
      updatedVal = isDateLike(v1) ? v1 : stripOuterQuotes(v0);
    }
  }

  // If updated == date, remove updated line
  if (dateIdx !== -1 && updatedIdx !== -1) {
    const d = (dateVal ?? "").trim();
    const u = (updatedVal ?? "").trim();

    if (d && u && d === u) {
      lines.splice(updatedIdx, 1);
      // (Optional) could also remove any now-empty trailing lines; we avoid being too aggressive.
      return {
        changed: true,
        reason: "removed_updated_equals_date",
        content: `---\n${lines.join("\n")}\n---\n${body.startsWith("\n") ? body.slice(1) : body}`,
      };
    }
  }

  // Determine if any normalization happened (quote removal without deletion)
  const rebuilt = `---\n${lines.join("\n")}\n---\n${body.startsWith("\n") ? body.slice(1) : body}`;
  const changed = rebuilt !== raw;

  return {
    changed,
    reason: changed ? "normalized_quotes" : "no_change",
    content: rebuilt,
  };
}

function main() {
  const files = walk(ROOT);
  let scanned = 0;
  let changed = 0;
  const changedFiles = [];

  for (const f of files) {
    scanned++;
    const raw = fs.readFileSync(f, "utf8");
    const res = ensureNormalizedFrontmatter(raw, f);
    if (res.changed) {
      changed++;
      changedFiles.push({ f, reason: res.reason });
      if (!DRY) fs.writeFileSync(f, res.content, "utf8");
    }
  }

  console.log(`Scanned: ${scanned} file(s)`);
  console.log(`Changed: ${changed} file(s)${DRY ? " (dry-run)" : ""}`);

  if (changedFiles.length) {
    console.log("\nChanged files:");
    for (const x of changedFiles) {
      console.log(`- ${x.reason}: ${x.f}`);
    }
  }
}

main();
