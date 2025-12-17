// scripts/normalize-published.mjs
// Normalize `published` for MDX frontmatter under:
// - content/docs, content/posts  => published must be true
// - content/draft               => published must be false
//
// Usage:
//   node scripts/normalize-published.mjs --dry
//   node scripts/normalize-published.mjs
//
// Notes:
// - Only targets *.mdx
// - If no frontmatter, it creates one.
// - If frontmatter exists but no published, it inserts it.

import fs from "node:fs";
import path from "node:path";

const TARGETS = [
  { root: "content/docs", forcedPublished: true },
  { root: "content/posts", forcedPublished: true },
  { root: "content/draft", forcedPublished: false },
];

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

function ensureFrontmatter(raw, forcedPublishedBool) {
  const forcedLine = `published: ${forcedPublishedBool ? "true" : "false"}`;

  // Match YAML frontmatter at top: ---\n...\n---\n
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!fmMatch) {
    // No frontmatter: create minimal frontmatter.
    const cleaned = raw.replace(/^\uFEFF?/, "");
    const newRaw = `---\n${forcedLine}\n---\n\n${cleaned}`;
    return { changed: true, reason: "added_frontmatter", content: newRaw };
  }

  const fm = fmMatch[1];
  const bodyStartIdx = fmMatch[0].length;
  const body = raw.slice(bodyStartIdx);

  const lines = fm.split(/\r?\n/);

  const pubIdx = lines.findIndex((l) => /^published\s*:/.test(l));

  if (pubIdx !== -1) {
    // Force override any existing published value to forcedLine.
    const before = lines[pubIdx];
    if (before.trim() !== forcedLine) {
      lines[pubIdx] = forcedLine;
      const rebuilt = `---\n${lines.join("\n")}\n---\n${body.startsWith("\n") ? body.slice(1) : body}`;
      return { changed: true, reason: "forced_published", content: rebuilt };
    }
    return { changed: false, reason: "no_change", content: raw };
  }

  // No published key: insert in a sensible place
  const idxStatus = lines.findIndex((l) => /^status\s*:/.test(l));
  const idxTags = lines.findIndex((l) => /^tags\s*:/.test(l));

  let insertAt = lines.length; // default end
  if (idxStatus !== -1) insertAt = idxStatus + 1;
  else if (idxTags !== -1) insertAt = idxTags + 1;

  lines.splice(insertAt, 0, forcedLine);

  const rebuilt = `---\n${lines.join("\n")}\n---\n${body.startsWith("\n") ? body.slice(1) : body}`;
  return { changed: true, reason: "inserted_published", content: rebuilt };
}

function main() {
  let scanned = 0;
  let changed = 0;
  const changedFiles = [];

  for (const t of TARGETS) {
    const files = walk(t.root);
    for (const f of files) {
      scanned++;
      const raw = fs.readFileSync(f, "utf8");
      const res = ensureFrontmatter(raw, t.forcedPublished);
      if (res.changed) {
        changed++;
        changedFiles.push({ f, reason: res.reason, forced: t.forcedPublished });
        if (!DRY) fs.writeFileSync(f, res.content, "utf8");
      }
    }
  }

  console.log(`Scanned: ${scanned} file(s)`);
  console.log(`Changed: ${changed} file(s)${DRY ? " (dry-run)" : ""}`);

  if (changedFiles.length) {
    console.log("\nChanged files:");
    for (const x of changedFiles) {
      console.log(
        `- ${x.reason} (published => ${x.forced ? "true" : "false"}): ${x.f}`
      );
    }
  }
}

main();
