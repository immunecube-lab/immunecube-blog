import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import * as site from "@/.velite";

type Doc = {
  slug: string;         // URL에서 쓰는 slug (대부분 단일 slug)
  title?: string;
  section?: string;     // 예: "IL-2 saga"
  category?: string;
  order?: number;       // ✅ frontmatter order
  published?: boolean;
};

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function shortenTitle(title: string, max = 60) {
  const t = title.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return t.slice(0, max).trimEnd() + "…";
}

function safeFilename(name: string) {
  // Windows 금지문자 + 제어문자 제거 + 공백 정리
  const cleaned = name
    .replace(/[\u0000-\u001f]/g, "")
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, " ")
    .trim();

  // 끝에 점/공백은 Windows에서 문제될 수 있어 제거
  return cleaned.replace(/[. ]+$/g, "");
}

function getDocs(): Doc[] {
  const docs = (site as any).docs as Doc[] | undefined;
  return Array.isArray(docs) ? docs : [];
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function slugifyFolder(name: string) {
  // 폴더명은 공백이 불편하니 단순 슬러그화
  return name.trim().replace(/\s+/g, "-");
}

function padOrder(n: number, width = 4) {
  const s = String(n);
  return s.length >= width ? s : "0".repeat(width - s.length) + s;
}

async function main() {
  const args = process.argv.slice(2);
  const listOnly = args.includes("--list");

  // 사용:
  // 1) 목록 확인: npx tsx scripts/export-pdfs-by-section.ts --list
  // 2) 섹션 출력 : npx tsx scripts/export-pdfs-by-section.ts "IL-2 saga"
  const sectionArg = args.find((a) => !a.startsWith("--")) ?? "";

  const base = process.env.BASE ?? "http://localhost:3000";
  const docs = getDocs();

  if (docs.length === 0) {
    console.error("❌ site.docs가 비어 있습니다. 먼저 velite build가 되어 있는지 확인해 주세요.");
    console.error("   예: npm run velite:build  또는  npm run build");
    process.exit(1);
  }

  // 섹션/카테고리 목록 출력 모드
  if (listOnly) {
    const published = docs.filter((d) => d.published !== false);

    const sections = uniq(published.map((d) => d.section).filter(Boolean) as string[]);
    const categories = uniq(published.map((d) => d.category).filter(Boolean) as string[]);

    console.log("✅ docs count:", published.length);
    console.log("✅ sections:", sections.length ? sections : "(none)");
    console.log("✅ categories:", categories.length ? categories : "(none)");

    console.log("\n샘플 문서 10개( order / slug / section / title ):");
    for (const d of published.slice(0, 10)) {
      console.log(`- ${d.order ?? "-"} | ${d.slug} | ${d.section ?? "-"} | ${d.title ?? "-"}`);
    }
    return;
  }

  if (!sectionArg) {
    console.error('Usage: npx tsx scripts/export-pdfs-by-section.ts <section>  또는  --list');
    process.exit(1);
  }

  const published = docs.filter((d) => d.published !== false);

  // ✅ 핵심: section 기준 필터
  const targets = published.filter((d) => (d.section ?? "").trim() === sectionArg);

  if (targets.length === 0) {
    const sections = uniq(published.map((d) => d.section).filter(Boolean) as string[]);
    console.error(`❌ section="${sectionArg}"에 해당하는 문서를 찾지 못했습니다.`);
    console.error(`   가능한 section 목록: ${sections.length ? sections.join(", ") : "(없음)"}\n`);
    console.error('   먼저 아래 명령으로 실제 section 값을 확인해 주세요:');
    console.error("   npx tsx scripts/export-pdfs-by-section.ts --list");
    process.exit(1);
  }

  // ✅ order(오름차순) -> title 기준 정렬 (order가 같아도 제목으로 안정 정렬)
  const sortedTargets = [...targets].sort((a, b) => {
    const ao = a.order ?? 9999;
    const bo = b.order ?? 9999;
    if (ao !== bo) return ao - bo;
    return (a.title ?? a.slug).localeCompare((b.title ?? b.slug), "ko");
  });

  // OUTDIR을 지정하지 않으면 공백 없는 폴더명으로 자동 생성
  const defaultOutDir = path.join("pdf", slugifyFolder(sectionArg));
  const outDir = process.env.OUTDIR ?? defaultOutDir;

  ensureDir(outDir);

  console.log(`✅ 대상 문서: ${sortedTargets.length}개`);
  console.log(`✅ 출력 폴더: ${outDir}`);
  console.log(`✅ BASE: ${base}`);
  console.log(`✅ URL 패턴: ${base}/print/{slug}\n`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print" });

  for (const doc of sortedTargets) {
    const slug = doc.slug; // ✅ 당신 프로젝트는 /print/{slug} 구조
    const url = `${base}/print/${encodeURIComponent(slug)}`;

    // ✅ 파일명: 4자리 order + 짧은 제목
    const ord = doc.order ?? 9999;
    const ordStr = padOrder(ord, 4);

    const titleForName = doc.title?.trim() ? doc.title : slug;
    const shortTitle = safeFilename(shortenTitle(titleForName, 60));

    const outPath = path.join(outDir, `${ordStr}__${shortTitle}.pdf`);

    try {
      console.log(`→ [${ordStr}] ${url}`);
      await page.goto(url, { waitUntil: "networkidle" });

      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      });

      fs.writeFileSync(outPath, pdf);
      console.log(`  ✔ saved: ${outPath}`);
    } catch (e: any) {
      console.error(`  ✖ failed: ${slug}`);
      console.error(e?.message ?? e);
    }
  }

  await browser.close();
  console.log("\n🎉 done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
