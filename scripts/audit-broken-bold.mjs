import fs from "node:fs";
import { chromium } from "playwright";

const BASE_URL = "http://localhost:3000";
const OUT_FILE = "./audit-broken-bold.json";

async function main() {
  // 문서 목록
  const res = await fetch(`${BASE_URL}/api/docs`);
  if (!res.ok) throw new Error(`Failed /api/docs: ${res.status}`);
  const docs = await res.json();

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // PDF/인쇄 기준과 동일
  await page.emulateMedia({ media: "print" });

  const results = [];

  for (let i = 0; i < docs.length; i++) {
    const { slug, title } = docs[i];
    const url = `${BASE_URL}/docs/${slug}`;

    const r = await page.goto(url, { waitUntil: "networkidle" });
    if (!r || r.status() >= 400) continue;

const hits = await page.evaluate(() => {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (["SCRIPT", "STYLE", "CODE", "PRE"].includes(p.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  // ✅ "**...**" 토큰만 뽑기
  const tokens = new Set();
  const re = /\*\*([^*]+?)\*\*/g;

  let n;
  while ((n = walker.nextNode())) {
    const text = n.nodeValue || "";
    let m;
    while ((m = re.exec(text)) !== null) {
      tokens.add(m[0]); // 예: "**텍스트**"
    }
  }

  return Array.from(tokens);
});


    if (hits.length > 0) {
      results.push({
        slug,
        title,
        url,
        occurrences: hits,
      });

      console.log(`FOUND: ${slug} (${hits.length})`);
    }
  }

  await browser.close();

  fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2), "utf-8");
  console.log(`Done. ${results.length} documents affected.`);
  console.log(`Report saved to ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
