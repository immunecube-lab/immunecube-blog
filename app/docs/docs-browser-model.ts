import { CATEGORIES } from "./_categories";
import { formatYmdDot } from "@/components/utils/date";
import { normalizeDocSlug } from "@/lib/docs-slug";

export type DocBrowserItem = {
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

export type DocsSelection = {
  category: string;
  section: string;
};

export function sortDocsInCategory(items: DocBrowserItem[]) {
  return [...items].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const ao = a.order ?? 9999;
    const bo = b.order ?? 9999;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title, "ko");
  });
}

export function groupByCategory(list: DocBrowserItem[]) {
  const map = new Map<string, DocBrowserItem[]>();

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

export function groupBySection(items: DocBrowserItem[], category?: string) {
  const map = new Map<string, DocBrowserItem[]>();

  for (const doc of items) {
    const rawKey = (doc.section || "etc").trim();
    const label = sectionLabel(rawKey);
    if (!map.has(label)) map.set(label, []);
    map.get(label)!.push(doc);
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

const SECTION_LABELS: Record<string, string> = {
  "etc": "기타",
  "guide": "안내",
  "immunology": "면역학 기초",
  "daily-immunity": "생활면역",
  "everyday-immunity": "생활면역",
  "vaccine-society": "백신과 사회",
  "medicine-history": "의학의 역사",
  "cancer-history": "암의 역사",
  "imm-classic": "면역학 고전",
  "metabolism": "대사",
  "이기적인 면역": "이기적인 면역",
  "metabolism-immunity": "대사와 면역",
  "케빈 홀": "케빈 홀",
  "식이 이론": "식단 이론",
  "다이어트 이론": "식단 이론",
  "News": "새 글",
};

const SECTION_ORDER: Record<string, number> = {
  "guide": 1,
  "개요": 1,
  "0. 먼저 읽기": 1,
  "면역 기초": 5,
  "immunology": 6,
  "이기적인 면역": 7,
  "연구와 통계": 10,
  "임상시험": 10,
  "에너지 균형": 20,
  "케빈 홀": 25,
  "식단 이론": 30,
  "식이 이론": 31,
  "식품과 영양소": 40,
  "영양학": 41,
  "설탕과 감미료": 50,
  "식사지침과 정책": 60,
  "인플루언서": 70,
  "대체의학과 건강상술": 80,
  "생활면역과 질병 오해": 90,
  "검사와 진단": 100,
  "News": 999,
};

export function sectionLabel(section: string) {
  return SECTION_LABELS[section] ?? section;
}

export function getDocHref(slug: string) {
  const s = normalizeDocSlug(slug);
  return s ? `/docs/${s}` : "/docs";
}

export function pickDisplayDate(doc: DocBrowserItem) {
  return formatYmdDot(doc.updated ?? doc.date);
}

export function resolveSelection(docs: DocBrowserItem[], search: string): DocsSelection {
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
