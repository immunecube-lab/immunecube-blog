"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CATEGORIES } from "./_categories";
import { formatYmdDot } from "@/components/utils/date";
import { normalizeDocSlug } from "@/lib/docs-slug";

type Doc = {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  section?: string;
  docType?: string;
  cover?: string;
  featured?: boolean;
  order?: number;
  date?: string;
  updated?: string;
};

type Selection = {
  category: string;
  section: string;
};

function sortDocsInCategory(items: Doc[]) {
  return [...items].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
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

  entries.sort(([a], [b]) => {
    const ao = CATEGORIES[a]?.order ?? 9999;
    const bo = CATEGORIES[b]?.order ?? 9999;
    if (ao !== bo) return ao - bo;
    return a.localeCompare(b, "ko");
  });

  return entries;
}

function groupBySection(items: Doc[], category?: string) {
  const map = new Map<string, Doc[]>();

  for (const doc of items) {
    const key = (doc.section || "etc").trim();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(doc);
  }

  const entries = Array.from(map.entries()).map(([section, list]) => {
    return [section, sortDocsInCategory(list)] as const;
  });

  const minOrderBySection = new Map<string, number>();
  for (const [section, list] of entries) {
    const min = list.reduce(
      (acc, doc) => Math.min(acc, doc.order ?? 9999),
      9999,
    );
    minOrderBySection.set(section, min);
  }

  entries.sort(([a], [b]) => {
    const ao = SECTION_ORDER[a] ?? 9999;
    const bo = SECTION_ORDER[b] ?? 9999;
    if (ao !== bo) return ao - bo;

    if (category === "면역학 고전") {
      const am = minOrderBySection.get(a) ?? 9999;
      const bm = minOrderBySection.get(b) ?? 9999;
      if (am !== bm) return am - bm;
    }

    return a.localeCompare(b, "ko");
  });

  return entries;
}

const SECTION_LABELS: Record<string, string> = {};

const SECTION_ORDER: Record<string, number> = {};

function sectionLabel(section: string) {
  return SECTION_LABELS[section] ?? section;
}

function getDocHref(slug: string) {
  const s = normalizeDocSlug(slug);
  return s ? `/docs/${s}` : "/docs";
}

function pickDisplayDate(doc: Doc) {
  return formatYmdDot(doc.updated ?? doc.date);
}

function resolveSelection(docs: Doc[], search: string): Selection {
  const grouped = groupByCategory(docs);
  const categories = grouped.map(([category]) => category);
  const defaultCategory = categories[0] ?? "";
  const params = new URLSearchParams(search);
  const requestedCategory = (params.get("cat") ?? "").trim();
  const safeCategory = categories.includes(requestedCategory)
    ? requestedCategory
    : defaultCategory;

  const activeItems =
    grouped.find(([category]) => category === safeCategory)?.[1] ?? [];
  const sectionGroups = groupBySection(activeItems, safeCategory);
  const sections = sectionGroups.map(([section]) => section);
  const requestedSection = (params.get("sec") ?? "").trim();
  const safeSection = sections.includes(requestedSection) ? requestedSection : "";

  return {
    category: safeCategory,
    section: safeSection,
  };
}

export function DocsBrowser({ docs }: { docs: Doc[] }) {
  const grouped = groupByCategory(docs);
  const categories = grouped.map(([category]) => category);
  const defaultCategory = categories[0] ?? "";
  const [selection, setSelection] = useState<Selection>({
    category: defaultCategory,
    section: "",
  });

  useEffect(() => {
    const syncFromLocation = () => {
      setSelection(resolveSelection(docs, window.location.search));
    };

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, [docs]);

  const activeCategory = categories.includes(selection.category)
    ? selection.category
    : defaultCategory;
  const activeAllItems =
    grouped.find(([category]) => category === activeCategory)?.[1] ?? [];
  const categoryMeta = CATEGORIES[activeCategory];
  const sectionGroups = groupBySection(activeAllItems, activeCategory);
  const sections = sectionGroups.map(([section]) => section);
  const activeSection = sections.includes(selection.section)
    ? selection.section
    : "";
  const activeItems = activeSection
    ? sectionGroups.find(([section]) => section === activeSection)?.[1] ?? []
    : activeAllItems;
  const docentItems = activeItems.filter((doc) => doc.docType === "docent");
  const standardItems = activeItems.filter((doc) => doc.docType !== "docent");

  function updateSelection(nextCategory: string, nextSection: string) {
    const safeCategory = categories.includes(nextCategory)
      ? nextCategory
      : defaultCategory;
    const nextItems =
      grouped.find(([category]) => category === safeCategory)?.[1] ?? [];
    const nextSectionGroups = groupBySection(nextItems, safeCategory);
    const nextSections = nextSectionGroups.map(([section]) => section);
    const safeSection = nextSections.includes(nextSection) ? nextSection : "";
    const nextSelection = { category: safeCategory, section: safeSection };

    setSelection(nextSelection);

    const params = new URLSearchParams(window.location.search);
    if (safeCategory && safeCategory !== defaultCategory) {
      params.set("cat", safeCategory);
    } else {
      params.delete("cat");
    }

    if (safeSection) {
      params.set("sec", safeSection);
    } else {
      params.delete("sec");
    }

    const query = params.toString();
    const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.pushState({}, "", nextUrl);
  }

  function renderDocItem(doc: Doc, featured = false) {
    const label = pickDisplayDate(doc);

    return (
      <li key={doc.slug}>
        <Link
          href={getDocHref(doc.slug)}
          prefetch={false}
          className={[
            "block rounded-md transition",
            featured
              ? "border-l-4 border-amber-500 bg-amber-50/80 px-3 py-3 hover:bg-amber-50"
              : "px-2 py-2 hover:bg-neutral-50",
          ].join(" ")}
          title={doc.title}
        >
          <div className={featured && doc.cover ? "flex gap-3" : ""}>
            {featured && doc.cover ? (
              <img
                src={doc.cover}
                alt=""
                className="h-16 w-24 shrink-0 rounded object-cover"
                loading="lazy"
              />
            ) : null}

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={[
                    "inline-flex items-center gap-2 hover:underline font-medium",
                    doc.docType === "docent" ? "text-amber-700" : "text-sky-600",
                  ].join(" ")}
                >
                  {doc.docType === "docent" ? (
                    <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">
                      해설
                    </span>
                  ) : null}
                  <span>{doc.title}</span>
                </span>

                {label && (
                  <span className="shrink-0 text-[11px] text-neutral-400">
                    {label}
                  </span>
                )}
              </div>

              {doc.description && (
                <p className="mt-1 text-sm text-neutral-500">{doc.description}</p>
              )}
            </div>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex items-baseline justify-between mb-8">
        <h1 className="text-3xl font-bold">글 모음</h1>
        <div className="text-xs text-neutral-500">
          카테고리(1단)와 섹션(2단)을 선택하면 목록이 필터링됩니다.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        <aside className="md:sticky md:top-24 h-fit rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold mb-3">카테고리</div>

          <ul className="space-y-2">
            {grouped.map(([category, items]) => {
              const isCatActive = category === activeCategory;
              const catSectionGroups = isCatActive
                ? groupBySection(items, category)
                : [];
              const totalCount = items.length;

              return (
                <li key={category} className="rounded-xl">
                  <button
                    type="button"
                    onClick={() => updateSelection(category, "")}
                    className={[
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition",
                      isCatActive
                        ? "bg-neutral-900 text-white"
                        : "hover:bg-neutral-50 text-neutral-800",
                    ].join(" ")}
                  >
                    <span className="truncate">{category}</span>
                    <span
                      className={[
                        "ml-2 text-xs rounded-full px-2 py-0.5",
                        isCatActive
                          ? "bg-white/15 text-white"
                          : "bg-neutral-100 text-neutral-600",
                      ].join(" ")}
                    >
                      {totalCount}
                    </span>
                  </button>

                  {isCatActive && (
                    <div className="mt-2 ml-2 pl-2 border-l border-neutral-200">
                      <ul className="space-y-1">
                        <li>
                          <button
                            type="button"
                            onClick={() => updateSelection(category, "")}
                            className={[
                              "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition",
                              activeSection === ""
                                ? "bg-neutral-100 text-neutral-900"
                                : "hover:bg-neutral-50 text-neutral-700",
                            ].join(" ")}
                          >
                            <span className="truncate">전체</span>
                            <span className="ml-2 text-[11px] text-neutral-500">
                              {totalCount}
                            </span>
                          </button>
                        </li>

                        {catSectionGroups.map(([section, sectionItems]) => {
                          const isSectionActive = activeSection === section;
                          return (
                            <li key={section}>
                              <button
                                type="button"
                                onClick={() => updateSelection(category, section)}
                                className={[
                                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition",
                                  isSectionActive
                                    ? "bg-neutral-100 text-neutral-900"
                                    : "hover:bg-neutral-50 text-neutral-700",
                                ].join(" ")}
                              >
                                <span className="truncate">{sectionLabel(section)}</span>
                                <span className="ml-2 text-[11px] text-neutral-500">
                                  {sectionItems.length}
                                </span>
                              </button>
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
            <p className="mt-2 mb-5 text-sm text-neutral-600 leading-relaxed">
              {categoryMeta.description}
            </p>
          )}

          <div className="space-y-6">
            {docentItems.length > 0 ? (
              <section>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-amber-800">해설</h3>
                  <span className="text-[11px] text-amber-700">
                    {docentItems.length}개
                  </span>
                </div>
                <ul className="space-y-3">
                  {docentItems.map((doc) => renderDocItem(doc, true))}
                </ul>
              </section>
            ) : null}

            {standardItems.length > 0 ? (
              <section>
                {docentItems.length > 0 ? (
                  <div className="mb-2 flex items-center justify-between border-t border-neutral-100 pt-4">
                    <h3 className="text-sm font-semibold text-neutral-700">문서</h3>
                    <span className="text-[11px] text-neutral-400">
                      {standardItems.length}개
                    </span>
                  </div>
                ) : null}
                <ul className="space-y-3">
                  {standardItems.map((doc) => renderDocItem(doc))}
                </ul>
              </section>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
