// app/docs/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import * as site from "@/.velite";
import { CATEGORIES } from "./_categories";
import { formatYmdDot } from "@/components/utils/date";

type Doc = {
  slug: string;
  title: string;
  description?: string;
  published?: boolean;
  category?: string;
  section?: string; // subgroup(2단)로 사용할 값
  order?: number;
  date?: string;
  updated?: string;
};

const docs = (site as any).docs as Doc[] | undefined;
const drafts = (site as any).drafts as Doc[] | undefined;
const isLocalDev = process.env.NODE_ENV === "development";

/* --------------------------- metadata --------------------------- */
/**
 * /docs는 필터 쿼리(cat/sec)가 붙어도 canonical은 /docs로 고정합니다.
 * - /docs?cat=...&sec=... 형태의 URL이 무한히 생기면 중복 페이지로 판단될 수 있습니다.
 * - 전역 app/layout.tsx에 metadataBase가 설정되어 있어야 절대 URL로 정상 출력됩니다.
 */
export const metadata: Metadata = {
  title: "글 모음",
  description: "카테고리 및 섹션별 문서 목록입니다.",
  alternates: {
    canonical: "/docs",
  },
};

/* ----------------------------- utils ----------------------------- */

function sortDocsInCategory(items: Doc[]) {
  return [...items].sort((a, b) => {
    const ao = a.order ?? 9999;
    const bo = b.order ?? 9999;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title, "ko");
  });
}

function groupByCategory(list: Doc[]) {
  const map = new Map<string, Doc[]>();

  for (const doc of list) {
    const key = (doc.category || "기타").trim();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(doc);
  }

  const entries = Array.from(map.entries()).map(([category, items]) => {
    return [category, sortDocsInCategory(items)] as const;
  });

  // CATEGORIES.order 기준으로 카테고리 정렬
  entries.sort(([a], [b]) => {
    const ao = CATEGORIES[a]?.order ?? 9999;
    const bo = CATEGORIES[b]?.order ?? 9999;
    if (ao !== bo) return ao - bo;
    return a.localeCompare(b, "ko");
  });

  return entries;
}

// activeCategory 내부에서 section별로 그룹핑
function groupBySection(items: Doc[]) {
  const map = new Map<string, Doc[]>();

  for (const doc of items) {
    const key = (doc.section || "etc").trim(); // section 없으면 etc
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(doc);
  }

  const entries = Array.from(map.entries()).map(([section, list]) => {
    return [section, sortDocsInCategory(list)] as const;
  });

  entries.sort(([a], [b]) => a.localeCompare(b, "ko"));
  return entries;
}

// section을 사람이 읽는 라벨로 바꾸고 싶으면 여기에서 매핑
const SECTION_LABELS: Record<string, string> = {
  // "imm-classic": "면역학 고전",
  // 예: "vaccine-society": "백신과 사회",
};

function sectionLabel(section: string) {
  return SECTION_LABELS[section] ?? section;
}

function getDocHref(slug: string) {
  if (!slug) return "/docs";
  if (slug.startsWith("/")) return slug;
  if (slug.startsWith("docs/")) return `/${slug}`;
  return `/docs/${slug}`;
}

function pickDisplayDate(doc: Doc) {
  return formatYmdDot(doc.updated ?? doc.date);
}

/* ----------------------------- page ----------------------------- */

type SearchParams = {
  cat?: string;
  sec?: string;
};

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function DocsPage({ searchParams }: PageProps) {
  // ✅ Next(App Router)에서 searchParams가 Promise로 들어오는 케이스 대응
  const sp = await searchParams;

  if (!docs) {
    return (
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">글 모음</h1>
        <p className="text-sm text-neutral-500">docs 컬렉션이 아직 준비되지 않았습니다.</p>
      </main>
    );
  }

  const selectedCat = (sp?.cat || "").trim();
  const selectedSec = (sp?.sec || "").trim();

  const source = [...docs, ...(isLocalDev ? drafts ?? [] : [])];
  const visible = isLocalDev ? source : source.filter((d) => d.published !== false);
  const grouped = groupByCategory(visible);

  const categories = grouped.map(([c]) => c);
  const activeCategory = categories.includes(selectedCat) ? selectedCat : categories[0];

  const activeAllItems = grouped.find(([c]) => c === activeCategory)?.[1] ?? [];
  const categoryMeta = CATEGORIES[activeCategory];

  // 현재 카테고리 내부에서 section 그룹 생성
  const sectionGroups = groupBySection(activeAllItems);
  const sections = sectionGroups.map(([s]) => s);

  // sec 파라미터가 유효하면 필터, 아니면 전체
  const activeSection = sections.includes(selectedSec) ? selectedSec : "";
  const activeItems = activeSection
    ? sectionGroups.find(([s]) => s === activeSection)?.[1] ?? []
    : activeAllItems;

  const baseCatHref = (cat: string) => `/docs?cat=${encodeURIComponent(cat)}`;
  const catSecHref = (cat: string, sec: string) =>
    `/docs?cat=${encodeURIComponent(cat)}&sec=${encodeURIComponent(sec)}`;

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex items-baseline justify-between mb-8">
        <h1 className="text-3xl font-bold">글 모음</h1>
        <div className="text-xs text-neutral-500">
          카테고리(1단)와 섹션(2단)을 선택하면 목록이 필터링됩니다.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* 왼쪽 사이드바 */}
        <aside className="md:sticky md:top-24 h-fit rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold mb-3">카테고리</div>

          <ul className="space-y-2">
            {grouped.map(([category, items]) => {
              const isCatActive = category === activeCategory;

              // 카테고리별 section 미리 계산(펼쳐질 때만 사용)
              const catSectionGroups = isCatActive ? groupBySection(items) : [];
              const totalCount = items.length;

              return (
                <li key={category} className="rounded-xl">
                  {/* 1단: category */}
                  <Link
                    href={baseCatHref(category)} // cat만 바꾸면 sec는 자동으로 전체 처리
                    className={[
                      "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                      isCatActive ? "bg-neutral-900 text-white" : "hover:bg-neutral-50 text-neutral-800",
                    ].join(" ")}
                  >
                    <span className="truncate">{category}</span>
                    <span
                      className={[
                        "ml-2 text-xs rounded-full px-2 py-0.5",
                        isCatActive ? "bg-white/15 text-white" : "bg-neutral-100 text-neutral-600",
                      ].join(" ")}
                    >
                      {totalCount}
                    </span>
                  </Link>

                  {/* 2단: section (active category일 때만 노출) */}
                  {isCatActive && (
                    <div className="mt-2 ml-2 pl-2 border-l border-neutral-200">
                      <ul className="space-y-1">
                        {/* 전체 */}
                        <li>
                          <Link
                            href={baseCatHref(category)} // sec 제거(=전체)
                            className={[
                              "flex items-center justify-between rounded-lg px-3 py-2 text-xs transition",
                              activeSection === ""
                                ? "bg-neutral-100 text-neutral-900"
                                : "hover:bg-neutral-50 text-neutral-700",
                            ].join(" ")}
                          >
                            <span className="truncate">전체</span>
                            <span className="ml-2 text-[11px] text-neutral-500">{totalCount}</span>
                          </Link>
                        </li>

                        {catSectionGroups.map(([sec, secItems]) => {
                          const isSecActive = activeSection === sec;
                          return (
                            <li key={sec}>
                              <Link
                                href={catSecHref(category, sec)}
                                className={[
                                  "flex items-center justify-between rounded-lg px-3 py-2 text-xs transition",
                                  isSecActive
                                    ? "bg-neutral-100 text-neutral-900"
                                    : "hover:bg-neutral-50 text-neutral-700",
                                ].join(" ")}
                              >
                                <span className="truncate">{sectionLabel(sec)}</span>
                                <span className="ml-2 text-[11px] text-neutral-500">{secItems.length}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* 오른쪽 목록 */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-xl font-semibold">
              {activeCategory}
              {activeSection ? (
                <span className="ml-2 text-sm font-normal text-neutral-500">
                  / {sectionLabel(activeSection)}
                </span>
              ) : null}
            </h2>

            <div className="text-xs text-neutral-400">{activeItems.length}개</div>
          </div>

          {categoryMeta?.description && (
            <p className="mt-2 mb-5 text-sm text-neutral-600 leading-relaxed">{categoryMeta.description}</p>
          )}

          <ul className="space-y-3">
            {activeItems.map((doc) => {
              const label = pickDisplayDate(doc);

              return (
                <li key={doc.slug}>
                  <Link
                    href={getDocHref(doc.slug)}
                    className="block rounded-md px-2 py-2 hover:bg-neutral-50 transition"
                    title={doc.title}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-sky-600 hover:underline font-medium">
                        <span>{doc.title}</span>
                        {isLocalDev && doc.published === false ? (
                          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800 no-underline">
                            DRAFT
                          </span>
                        ) : null}
                      </span>

                      {label && <span className="shrink-0 text-[11px] text-neutral-400">{label}</span>}
                    </div>

                    {doc.description && <p className="mt-1 text-sm text-neutral-500">{doc.description}</p>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}
