// scripts/pdf-all.mjs
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = process.env.OUT_DIR || "./pdf";
const SORT = (process.env.SORT || "none").toLowerCase(); // none | slug | updated
const ONLY = process.env.ONLY || ""; // 예: "immune" -> slug/title에 포함된 것만

function safeFileName(str) {
  return String(str).replace(/[\/\\?%*:|"<>]/g, "-").trim();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const listRes = await fetch(`${BASE_URL}/api/docs`);
  if (!listRes.ok) throw new Error(`Failed /api/docs: ${listRes.status}`);
  let items = await listRes.json();

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No docs returned from /api/docs");
  }

  // (선택) 필터
  if (ONLY) {
    const q = ONLY.toLowerCase();
    items = items.filter((d) =>
      String(d.slug || "").toLowerCase().includes(q) ||
      String(d.title || "").toLowerCase().includes(q)
    );
  }

  // (선택) 정렬
  if (SORT === "slug") {
    items.sort((a, b) => String(a.slug).localeCompare(String(b.slug)));
  } else if (SORT === "updated") {
    items.sort((a, b) => {
      const ta = Date.parse(a.updated || "") || 0;
      const tb = Date.parse(b.updated || "") || 0;
      return tb - ta; // 최신순
    });
  }

  console.log(`Docs: ${items.length}, BASE_URL=${BASE_URL}, OUT_DIR=${OUT_DIR}, SORT=${SORT}, ONLY=${ONLY || "none"}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print" });

  let ok = 0;
  let fail = 0;

  for (let i = 0; i < items.length; i++) {
    const { slug, title, updated } = items[i];
    const url = `${BASE_URL}/docs/${slug}`;

    const index = String(i + 1).padStart(3, "0");
    const nameBase = safeFileName(title || slug);
    const dateTag = updated ? String(updated).slice(0, 10) : "unknown-date";
    const outPath = path.join(OUT_DIR, `${index} - ${nameBase} (${dateTag}).pdf`);

    // 이미 있으면 스킵(재실행/중단 후 재개용)
    if (fs.existsSync(outPath)) {
      console.log(`[${index}/${items.length}] SKIP (exists) ${slug}`);
      continue;
    }

    console.log(`[${index}/${items.length}] ${url}`);

    const res = await page.goto(url, { waitUntil: "networkidle" });
    const status = res?.status();

    if (!res || status >= 400) {
      fail++;
      const shot = path.join(OUT_DIR, `${index} - ${safeFileName(slug)} - error.png`);
      await page.screenshot({ path: shot, fullPage: true });
      console.log(`  -> FAILED status=${status} final=${page.url()} (screenshot: ${shot})`);
      continue;
    }

    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "12mm", right: "12mm", bottom: "14mm", left: "12mm" },
    });

    ok++;

    // 서버/리소스 부담 줄이기(필요하면 0으로)
    await sleep(150);
  }

  await browser.close();
  console.log(`Done. OK=${ok}, FAIL=${fail}, saved to ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// set BASE_URL=http://localhost:3000
// set OUT_DIR=pdf
// node scripts/pdf-all.mjs