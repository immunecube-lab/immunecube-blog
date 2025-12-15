// app/page.tsx
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";

type Entry = {
  title: string;
  href: string;
  updated: Date;
};

const MAX_ITEMS = 8;

// content 아래의 md/mdx를 서브폴더까지 재귀로 수집
function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

// MDX frontmatter에서 title만 가볍게 추출 (YAML 파서 없이 최소 구현)
function extractTitleFromFrontmatter(fileContent: string): string | null {
  // frontmatter 블록만 잡기
  const fm = fileContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!fm) return null;

  const body = fm[1];

  // title: "..." / '...' / bare 형태 지원 (간단)
  const m =
    body.match(/^title:\s*"(.*?)"\s*$/m) ||
    body.match(/^title:\s*'(.*?)'\s*$/m) ||
    body.match(/^title:\s*(.+?)\s*$/m);

  if (!m) return null;

  const raw = m[1].trim();
  // bare title에 주석이 붙었을 때 제거
  const cleaned = raw.replace(/\s+#.*$/, "").trim();
  return cleaned.length ? cleaned : null;
}

function slugPathFromFile(contentRoot: string, fullPath: string) {
  const rel = path.relative(contentRoot, fullPath).replace(/\.(md|mdx)$/, "");
  // windows 경로 대응
  return rel.split(path.sep).map(encodeURIComponent).join("/");
}

function getLatestEntries(): Entry[] {
  const root = process.cwd();
  const siteSources = [
    { contentDir: path.join(root, "content", "posts"), urlBase: "/blog" },
    { contentDir: path.join(root, "content", "docs"), urlBase: "/docs" },
  ];

  const entries: Entry[] = [];

  for (const { contentDir, urlBase } of siteSources) {
    const files = walk(contentDir);

    for (const fullPath of files) {
      const stat = fs.statSync(fullPath);
      const content = fs.readFileSync(fullPath, "utf8");
      const title =
        extractTitleFromFrontmatter(content) ||
        // fallback: slug를 보기 좋게
        path
          .basename(fullPath)
          .replace(/\.(md|mdx)$/, "")
          .replace(/-/g, " ");

      const slugPath = slugPathFromFile(contentDir, fullPath);
      entries.push({
        title,
        href: `${urlBase}/${slugPath}`,
        updated: stat.mtime,
      });
    }
  }

  return entries
    .sort((a, b) => b.updated.getTime() - a.updated.getTime())
    .slice(0, MAX_ITEMS);
}

export default function Home() {
  const latest = getLatestEntries();

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* 소개 */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">immunecube</h1>
          <div className="mt-4 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
            <img
              src="/images/hero.svg"
              alt="연구와 기록을 상징하는 면역 아카이브 이미지"
              className="h-40 w-full object-contain sm:h-48 md:h-56"
              loading="eager"
            />
          </div>


          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            생활면역과 저속노화, 면역 연구의 역사와 현대 면역대사를 다루는
            블로그 & 문서 사이트입니다.
            <br />
            모든 글은 논문과 공식 자료를 바탕으로 정리합니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
            >
              블로그로 가기
            </Link>

            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition"
            >
              문서 보기
            </Link>
          </div>
        </section>

        {/* 최신 글 */}
        <section className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-base font-semibold">최근 업데이트</h2>
            <p className="text-xs text-neutral-500">
              최신 수정 기준으로 자동 정렬됩니다.
            </p>
          </div>

          {latest.length === 0 ? (
            <div className="rounded-xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
              아직 공개된 글이 없습니다.
            </div>
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <ul className="divide-y divide-neutral-100">
                {latest.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-5 py-4 hover:bg-neutral-50 transition"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="truncate font-medium">
                            {item.title}
                          </div>
                          <div className="mt-1 text-xs text-neutral-500">
                            {item.updated.toISOString().slice(0, 10)}
                          </div>
                        </div>

                        <span className="shrink-0 rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs text-neutral-600">
                          {item.href.startsWith("/blog") ? "Blog" : "Docs"}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
