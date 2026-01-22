// scripts/pdf-one.mjs
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const DOC_PATH = process.env.DOC_PATH || "/docs"; // 예: /docs/imm-classic/von-behring...
const OUT_DIR = process.env.OUT_DIR || "./pdf";

function safeFileName(str) {
  return str.replace(/[\/\\?%*:|"<>]/g, "-").trim();
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const url = `${BASE_URL}${DOC_PATH}`;
  const fileName = safeFileName(DOC_PATH.replace(/^\/+/, "")) + ".pdf";
  const outPath = path.join(OUT_DIR, fileName);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // PDF는 "print" 미디어 기준으로 렌더하는 게 보통 더 깔끔합니다.
  await page.emulateMedia({ media: "print" });

  await page.goto(url, { waitUntil: "networkidle" });

  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "12mm", right: "12mm", bottom: "14mm", left: "12mm" },
  });

  await browser.close();
  console.log("Saved:", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
