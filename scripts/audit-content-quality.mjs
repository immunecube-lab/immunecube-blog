import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_GLOB = "content/{docs,stories,posts}/**/*.{md,mdx}";
const REPORT_PATH = path.join(ROOT, "docs", "content-quality-audit.md");
const JSON_PATH = path.join(ROOT, "output", "content-quality-audit.json");

function countMatches(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

function stripMdx(text) {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_>`~|{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function paragraphLengths(body) {
  return body
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => stripMdx(paragraph).length)
    .filter(Boolean);
}

function collectionOf(file) {
  return file.split("/")[1] ?? "unknown";
}

function addIssue(article, code, label, weight, detail = "") {
  article.issues.push({ code, label, weight, detail });
  article.score += weight;
}

function mdEscape(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
}

function fmtNumber(value) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

async function main() {
  const files = await fg(CONTENT_GLOB, {
    cwd: ROOT,
    onlyFiles: true,
    unique: true,
  });

  const articles = [];
  const parseErrors = [];
  const skippedNonArticles = [];

  for (const file of files.sort()) {
    const absolute = path.join(ROOT, file);
    const raw = await fs.readFile(absolute, "utf8");
    let parsed;
    try {
      parsed = matter(raw);
    } catch (error) {
      parseErrors.push({ file, error: error.message });
      continue;
    }

    if (path.basename(file).toLowerCase() === "readme.md") continue;

    const data = parsed.data ?? {};
    const body = parsed.content ?? "";
    if (!data.title && !data.slug && Object.keys(data).length === 0) {
      skippedNonArticles.push(file);
      continue;
    }
    const text = stripMdx(body);
    const paragraphs = paragraphLengths(body);
    const collection = collectionOf(file);
    const article = {
      file,
      collection,
      title: data.title ?? "",
      slug: data.slug ?? "",
      published: data.published !== false,
      status: data.status ?? "",
      description: data.description ?? "",
      chars: text.length,
      words: text ? text.split(/\s+/).length : 0,
      h2: countMatches(body, /^##\s+/gm),
      h3: countMatches(body, /^###\s+/gm),
      links: countMatches(body, /\[[^\]]+\]\((?:https?:\/\/|\/)[^)]+\)/g),
      externalLinks: countMatches(body, /https?:\/\//g),
      relatedPosts: /<RelatedPosts\b/.test(body),
      referenceSection: /^#{2,3}\s+(?:참고문헌|참고 자료|References?|출처)/gim.test(body),
      longParagraphs: paragraphs.filter((length) => length >= 450).length,
      maxParagraph: paragraphs.length ? Math.max(...paragraphs) : 0,
      hardBreaks: countMatches(body, / {2,}\r?\n/g),
      rhetoricalQuestions: countMatches(body, /[?？]/g),
      malformed: countMatches(
        body,
        /(?:<\/b>(?:이것|하지만|그러나|따라서|그리고|즉)|\.(?:하지만|그러나|따라서|이것|즉)|(?:즉|따라서),?\s*>\s+)/g,
      ),
      score: 0,
      issues: [],
    };

    if (!article.title) addIssue(article, "M01", "제목 없음", 30);
    if (!article.slug) addIssue(article, "M02", "슬러그 없음", 30);
    if (!article.description) {
      addIssue(article, "M03", "설명문 없음", 16);
    } else if (article.description.length < 45) {
      addIssue(article, "M04", "설명문이 짧음", 7, `${article.description.length}자`);
    } else if (article.description.length > 165) {
      addIssue(article, "M05", "설명문이 김", 5, `${article.description.length}자`);
    }
    if (article.chars < 900) addIssue(article, "R01", "본문이 매우 짧음", 10, `${article.chars}자`);
    if (article.chars >= 1800 && article.h2 === 0) addIssue(article, "R02", "긴 글에 H2 없음", 12);
    if (article.longParagraphs > 0) {
      addIssue(article, "R03", "긴 문단", Math.min(12, article.longParagraphs * 2), `${article.longParagraphs}개`);
    }
    if (article.hardBreaks >= 3) {
      addIssue(article, "R04", "수동 줄바꿈 과다", Math.min(8, article.hardBreaks), `${article.hardBreaks}회`);
    }
    if (article.rhetoricalQuestions >= 4) {
      addIssue(article, "R05", "질문형 문장 과다", 5, `${article.rhetoricalQuestions}회`);
    }
    if (article.malformed > 0) {
      addIssue(article, "S01", "마크다운·문장 붙음 의심", Math.min(15, article.malformed * 5), `${article.malformed}곳`);
    }
    if (article.chars >= 1800 && article.externalLinks === 0 && !article.referenceSection) {
      addIssue(article, "E01", "긴 글에 외부 근거 링크 없음", 10);
    }
    if (article.chars >= 1800 && !article.relatedPosts) {
      addIssue(article, "N01", "긴 글에 관련 글 안내 없음", 5);
    }

    articles.push(article);
  }

  const published = articles.filter((article) => article.published);
  const slugGroups = new Map();
  for (const article of published) {
    if (!article.slug) continue;
    const values = slugGroups.get(article.slug) ?? [];
    values.push(article);
    slugGroups.set(article.slug, values);
  }
  for (const [slug, duplicates] of slugGroups) {
    if (duplicates.length < 2) continue;
    for (const article of duplicates) {
      addIssue(article, "M06", "슬러그 중복", 30, `${slug}: ${duplicates.length}개`);
    }
  }

  const ranked = [...published].sort(
    (a, b) => b.score - a.score || b.chars - a.chars || a.file.localeCompare(b.file),
  );
  const issueCounts = new Map();
  for (const article of published) {
    for (const issue of article.issues) {
      const current = issueCounts.get(issue.code) ?? { label: issue.label, count: 0 };
      current.count += 1;
      issueCounts.set(issue.code, current);
    }
  }

  const byCollection = ["docs", "stories", "posts"].map((collection) => {
    const items = published.filter((article) => article.collection === collection);
    return {
      collection,
      count: items.length,
      chars: items.reduce((sum, article) => sum + article.chars, 0),
      flagged: items.filter((article) => article.score > 0).length,
      high: items.filter((article) => article.score >= 20).length,
    };
  });

  const generatedAt = new Date().toISOString();
  const lines = [
    "# 콘텐츠 개선 감사",
    "",
    `- 생성: ${generatedAt}`,
    `- 범위: 게시된 원문 ${fmtNumber(published.length)}개 (원고 ${fmtNumber(articles.length)}개, 작업 메모 제외 ${fmtNumber(skippedNonArticles.length)}개)`,
    "- 원칙: 삭제·통합·원문 자동 수정 없음. 이 보고서는 개선 순서를 정하기 위한 신호만 제공함.",
    "- Claude의 `ai-phrasing-audit.md`와 겹치지 않도록 AI 문투 판정은 범위에서 제외함.",
    "- 주의: 점수는 글의 과학적 정확성이나 실제 검색 유입을 평가하지 않음. 사람이 읽기 어려울 가능성이 있는 구조적 징후의 합계임.",
    "",
    "## 한눈에 보기",
    "",
    "| 영역 | 게시 글 | 개선 신호 있음 | 우선 검토(20점 이상) | 본문 글자 수 |",
    "|---|---:|---:|---:|---:|",
    ...byCollection.map(
      (row) => `| ${row.collection} | ${fmtNumber(row.count)} | ${fmtNumber(row.flagged)} | ${fmtNumber(row.high)} | ${fmtNumber(row.chars)} |`,
    ),
    "",
    "## 자주 발견된 개선 신호",
    "",
    "| 코드 | 신호 | 글 수 |",
    "|---|---|---:|",
    ...[...issueCounts.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .map(([code, value]) => `| ${code} | ${value.label} | ${fmtNumber(value.count)} |`),
    "",
    "## 우선 개선 후보 40개",
    "",
    "삭제 후보가 아니라, 같은 노력으로 독자 경험을 더 많이 개선할 수 있는 글의 순서입니다.",
    "",
    "| 순위 | 점수 | 제목 | 영역 | 글자 수 | 개선 신호 | 파일 |",
    "|---:|---:|---|---|---:|---|---|",
    ...ranked.slice(0, 40).map((article, index) => {
      const issueText = article.issues
        .map((issue) => `${issue.code} ${issue.detail}`.trim())
        .join(", ");
      return `| ${index + 1} | ${article.score} | ${mdEscape(article.title || "(제목 없음)")} | ${article.collection} | ${fmtNumber(article.chars)} | ${mdEscape(issueText)} | \`${article.file}\` |`;
    }),
    "",
    "## 개선 순서",
    "",
    "1. `S01` 문장 붙음·마크다운 이상을 먼저 고쳐 실제 읽기 오류를 제거합니다.",
    "2. `M01`~`M06` 메타데이터 문제를 고쳐 제목·검색 결과·공유 화면의 정보 손실을 막습니다.",
    "3. `R02`~`R05`가 겹친 긴 글은 도입부와 문단 구조를 손봅니다.",
    "4. `E01`은 근거를 새로 지어내지 않고, 원문에 사용한 자료를 확인할 수 있을 때만 보강합니다.",
    "5. `N01`은 관련성이 명확한 기존 글만 연결합니다.",
    "",
    "## 판정 코드",
    "",
    "- `M`: 제목·슬러그·설명문 등 메타데이터",
    "- `R`: 사람의 읽기 흐름과 문단 구조",
    "- `S`: 문법 또는 마크다운 손상 의심",
    "- `E`: 외부 근거 확인 경로",
    "- `N`: 사이트 안의 다음 읽을거리 연결",
    "",
  ];

  await fs.mkdir(path.dirname(REPORT_PATH), { recursive: true });
  await fs.mkdir(path.dirname(JSON_PATH), { recursive: true });
  await fs.writeFile(REPORT_PATH, `${lines.join("\n")}\n`, "utf8");
  await fs.writeFile(
    JSON_PATH,
    `${JSON.stringify({ generatedAt, parseErrors, skippedNonArticles, articles: ranked }, null, 2)}\n`,
    "utf8",
  );

  console.log(`Audited ${published.length} published articles (${articles.length} total).`);
  console.log(`Markdown: ${path.relative(ROOT, REPORT_PATH)}`);
  console.log(`JSON: ${path.relative(ROOT, JSON_PATH)}`);
  if (parseErrors.length) {
    console.warn(`Frontmatter parse errors: ${parseErrors.length}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
