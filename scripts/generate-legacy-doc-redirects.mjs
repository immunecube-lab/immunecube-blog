import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content", "docs");
const OUTPUT_ROOT = path.join(ROOT, "public", "docs");
const MARKER_NAME = ".generated-immunecube-legacy-redirects";

function normalizeDocSlug(slug) {
  let s = String(slug ?? "").trim();
  if (!s) return "";
  if (s.startsWith("/")) s = s.slice(1);
  if (s.startsWith("docs/")) s = s.slice("docs/".length);

  const parts = s.split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "";
}

function toPosix(p) {
  return p.split(path.sep).join("/");
}

function buildRedirectHtml(destination) {
  const target = JSON.stringify(destination);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; url=${destination}" />
    <link rel="canonical" href="${destination}" />
    <script>
      const target = ${target};
      window.location.replace(target + window.location.search + window.location.hash);
    </script>
  </head>
  <body>
    <p>Redirecting to <a href="${destination}">${destination}</a>...</p>
  </body>
</html>
`;
}

async function ensureCleanOutputRoot() {
  const markerPath = path.join(OUTPUT_ROOT, MARKER_NAME);

  try {
    await fs.access(OUTPUT_ROOT);
  } catch {
    await fs.mkdir(OUTPUT_ROOT, { recursive: true });
    await fs.writeFile(markerPath, "generated\n", "utf8");
    return;
  }

  try {
    await fs.access(markerPath);
  } catch {
    throw new Error(
      `Refusing to overwrite ${OUTPUT_ROOT} because ${MARKER_NAME} is missing.`,
    );
  }

  await fs.rm(OUTPUT_ROOT, { recursive: true, force: true });
  await fs.mkdir(OUTPUT_ROOT, { recursive: true });
  await fs.writeFile(markerPath, "generated\n", "utf8");
}

async function main() {
  const files = await fg("**/*.mdx", { cwd: CONTENT_ROOT, absolute: true });
  const redirects = new Map();

  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const parsed = matter(raw);
    const canonicalSlug = normalizeDocSlug(parsed.data.slug);
    if (!canonicalSlug) {
      throw new Error(`Missing or invalid frontmatter slug: ${file}`);
    }

    const relativePath = toPosix(path.relative(CONTENT_ROOT, file)).replace(/\.mdx$/, "");
    const basename = path.posix.basename(relativePath);
    const canonicalPath = `/docs/${canonicalSlug}`;
    const legacyPaths = new Set([
      `/docs/${relativePath}`,
      basename !== canonicalSlug ? `/docs/${basename}` : "",
    ]);

    for (const legacyPath of legacyPaths) {
      if (!legacyPath || legacyPath === canonicalPath) continue;

      const existing = redirects.get(legacyPath);
      if (existing && existing !== canonicalPath) {
        throw new Error(
          `Conflicting redirect for ${legacyPath}: ${existing} vs ${canonicalPath}`,
        );
      }

      redirects.set(legacyPath, canonicalPath);
    }
  }

  await ensureCleanOutputRoot();

  for (const [legacyPath, canonicalPath] of redirects) {
    const relativeDir = legacyPath.replace(/^\/+/, "");
    const outputDir = path.join(ROOT, "public", ...relativeDir.split("/"));
    const outputFile = path.join(outputDir, "index.html");

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputFile, buildRedirectHtml(canonicalPath), "utf8");
  }

  console.log(`Generated ${redirects.size} legacy doc redirects.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
