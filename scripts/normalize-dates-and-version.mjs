// scripts/normalize-dates-and-version.mjs
// Ensure frontmatter has `date` and `updated` (YYYY-MM-DD), remove `version`.
// Primary source of truth: git history per file.
// - date    = first commit date (oldest) for that file
// - updated = last commit date (newest) for that file
// Fallback: filesystem mtime if git is unavailable or file is untracked.
//
// Usage:
//   node scripts/normalize-dates-and-version.mjs --dry
//   node scripts/normalize-dates-and-version.mjs
//
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const TARGETS = ["content/docs", "content/posts", "content/draft"];
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

function ymdFromDate(d) {
  const yyyy = String(d.getFullYear()).padStart(4, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getFileMtimeYmd(filePath) {
  const st = fs.statSync(filePath);
  return ymdFromDate(st.mtime);
}

function safeExec(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString("utf8").trim();
  } catch {
    return null;
  }
}

// Returns { firstYmd, lastYmd } or null if unavailable.
function getGitDatesYmd(filePath) {
  // Ensure we're in a git repo
  const inside = safeExec("git rev-parse --is-inside-work-tree");
  if (inside !== "true") return null;

  // File must be tracked or have history; use --follow for renames.
  // %cI = committer date, strict ISO 8601 (e.g., 2025-12-18T10:11:12+09:00)
  const log = safeExec(`git log --follow --format=%cI -- "${filePath}"`);
  if (!log) return null;

  const lines = log.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return null;

  const newest = lines[0];
  const oldest = lines[lines.length - 1];

  // Extract YYYY-MM-DD from ISO string
  const lastYmd = newest.slice(0, 10);
  const firstYmd = oldest.slice(0, 10);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(firstYmd) || !/^\d{4}-\d{2}-\d{2}$/.test(lastYmd)) {
    return null;
  }
  return { firstYmd, lastYmd };
}

function ensureFrontmatter(raw, filePath) {
  const gitDates = getGitDatesYmd(filePath);
  const fallback = getFileMtimeYmd(filePath);

  const inferredDate = gitDates?.firstYmd ?? fallback;
  const inferredUpdated = gitDates?.lastYmd ?? fallback;

  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!fmMatch) {
    const cleaned = raw.replace(/^\uFEFF?/, "");
    const fm = `---\ndate: "${inferredDate}"\nupdated: "${inferredUpdated}"\n---\n\n`;
    return { changed: true, reason: "added_frontmatter", content: fm + cleaned };
  }

  const fm = fmMatch[1];
  const bodyStartIdx = fmMatch[0].length;
  const body = raw.slice(bodyStartIdx);

  let lines = fm.split(/\r?\n/);
  const findKeyIdx = (key) => lines.findIndex((l) => new RegExp(`^${key}\\s*:`).test(l));

  let changed = false;
  const reasons = new Set();

  // Remove version if present
  const versionIdx = findKeyIdx("version");
  if (versionIdx !== -1) {
    lines.splice(versionIdx, 1);
    changed = true;
    reasons.add("removed_version");
  }

  // Recompute indices after removal
  const dateIdx = findKeyIdx("date");
  const updatedIdx = findKeyIdx("updated");

  const idxPublished = findKeyIdx("published");
  const idxStatus = findKeyIdx("status");
  const idxTags = findKeyIdx("tags");

  const insertAtBase = (() => {
    if (idxPublished !== -1) return idxPublished + 1;
    if (idxStatus !== -1) return idxStatus + 1;
    if (idxTags !== -1) return idxTags + 1;
    return lines.length;
  })();

  // Insert date if missing
  if (dateIdx === -1) {
    lines.splice(insertAtBase, 0, `date: "${inferredDate}"`);
    changed = true;
    reasons.add("inserted_date");
  }

  // Insert updated if missing
  const updatedIdx2 = findKeyIdx("updated");
  if (updatedIdx2 === -1) {
    const dateIdx2 = findKeyIdx("date");
    const insertAt = dateIdx2 !== -1 ? dateIdx2 + 1 : insertAtBase;
    lines.splice(insertAt, 0, `updated: "${inferredUpdated}"`);
    changed = true;
    reasons.add("inserted_updated");
  } else {
    // If updated is templater token, normalize to inferredUpdated
    const cur = lines[updatedIdx2];
    const curVal = cur.split(":").slice(1).join(":").trim();
    const looksLikeTemplater = /<%[\s\S]*%>/.test(curVal);
    const isBlank = curVal === "" || curVal === '""' || curVal === "''";

    if (looksLikeTemplater || isBlank) {
      lines[updatedIdx2] = `updated: "${inferredUpdated}"`;
      changed = true;
      reasons.add("normalized_updated");
    }
  }

  const rebuilt = `---\n${lines.join("\n")}\n---\n${body.startsWith("\n") ? body.slice(1) : body}`;
  return {
    changed,
    reason: changed ? Array.from(reasons).join("+") : "no_change",
    content: changed ? rebuilt : raw,
  };
}

function main() {
  let scanned = 0;
  let changed = 0;
  const changedFiles = [];

  for (const root of TARGETS) {
    const files = walk(root);
    for (const f of files) {
      scanned++;
      const raw = fs.readFileSync(f, "utf8");
      const res = ensureFrontmatter(raw, f);
      if (res.changed) {
        changed++;
        changedFiles.push({ f, reason: res.reason });
        if (!DRY) fs.writeFileSync(f, res.content, "utf8");
      }
    }
  }

  console.log(`Scanned: ${scanned} file(s)`);
  console.log(`Changed: ${changed} file(s)${DRY ? " (dry-run)" : ""}`);

  if (changedFiles.length) {
    console.log("\nChanged files:");
    for (const x of changedFiles) console.log(`- ${x.reason}: ${x.f}`);
  }

  console.log("\nDate source priority:");
  console.log("- git log --follow (first/last commit) if available");
  console.log("- filesystem mtime fallback");
}

main();
