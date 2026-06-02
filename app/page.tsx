// app/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpen,
  Compass,
  FlaskConical,
  HeartPulse,
  History,
  Microscope,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { BLOG_INDEX, DOCS_INDEX } from "@/generated/content-index";
import { normalizeDocSlug } from "@/lib/docs-slug";

export const metadata: Metadata = {
  title: "immunecube",
  description:
    "면역학 고전, 의학사, 암 면역치료, 비만과 식이 연구를 논문과 역사적 맥락 속에서 정리합니다.",
  alternates: {
    canonical: "/",
  },
};

type Entry = {
  title: string;
  href: string;
  dateLabel?: string;
  kind: "blog" | "docs";
};

type TimedEntry = Entry & {
  timestamp: number;
};

const MAX_DOC_ITEMS = 10;
const MAX_BLOG_ITEMS = 3;

/* ----------------------------- utils ----------------------------- */

function normalizeSlugPart(slug: string) {
  const s = slug.startsWith("/") ? slug.slice(1) : slug;
  if (s.startsWith("docs/")) return s.slice("docs/".length);
  if (s.startsWith("posts/")) return s.slice("posts/".length);
  if (s.startsWith("blog/")) return s.slice("blog/".length);
  return s;
}

function formatYmdDot(v?: string | Date) {
  if (!v) return undefined;
  const d = v instanceof Date ? v : new Date(v);
  if (Number.isNaN(d.getTime())) return undefined;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

function getDocHref(slug: string) {
  const s = normalizeDocSlug(slug);
  return s ? `/docs/${s}` : "/docs";
}

function getBlogHref(slug: string) {
  const s = normalizeSlugPart(slug);
  return `/blog/${encodeURIComponent(s)}`;
}

/* ----------------------------- velite types ----------------------------- */

type VelitePost = {
  slug: string;
  title: string;
  published?: boolean;
  date?: string;
  updated?: string;
};

type VeliteDoc = {
  slug: string;
  title: string;
  published?: boolean;
  category?: string;
  date?: string;
  updated?: string;
};

type TopicCard = {
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
};

type ReadingPath = {
  title: string;
  description: string;
  href: string;
};

const TOPIC_CARDS: TopicCard[] = [
  {
    title: "면역학 고전",
    description: "면역학의 핵심 개념이 만들어진 논문과 실험을 연대순으로 읽습니다.",
    category: "면역학 고전",
    icon: Microscope,
  },
  {
    title: "사이토카인과 선천면역",
    description: "T세포, 사이토카인, 선천면역, 내독소 연구가 이어지는 긴 흐름입니다.",
    category: "IL-2 saga",
    icon: FlaskConical,
  },
  {
    title: "암과 면역치료",
    description: "콜리 독소, IL-2, 체크포인트 억제제, CAR-T로 이어지는 치료의 역사입니다.",
    category: "면역치료",
    icon: ShieldCheck,
  },
  {
    title: "의학과 질병의 역사",
    description: "임상시험, 감염병, 결핍증, 치료법이 어떻게 이해되어 왔는지 살핍니다.",
    category: "의학의 역사",
    icon: History,
  },
  {
    title: "비만과 다이어트 과학",
    description: "칼로리, 식단 구성, 시간제한 식사, 임상시험 결과를 차분히 비교합니다.",
    category: "비만 다이어트",
    icon: HeartPulse,
  },
  {
    title: "건강 정보 비판적 읽기",
    description: "통계, 진단, 플라시보, 역인과성처럼 연구 해석에서 자주 생기는 함정을 다룹니다.",
    category: "critics",
    icon: Stethoscope,
  },
];

const READING_PATHS: ReadingPath[] = [
  {
    title: "처음 오셨다면",
    description: "사이트의 문서 구조와 읽는 순서를 먼저 확인합니다.",
    href: "/docs/guide",
  },
  {
    title: "면역학의 큰 줄기",
    description: "면역학 고전에서 IL-2 saga와 면역치료로 이어지는 흐름을 따라갑니다.",
    href: `/docs?cat=${encodeURIComponent("면역학 고전")}`,
  },
  {
    title: "비만·식이 연구 읽기",
    description: "DIETFITS, CALERIE, TREAT 같은 임상시험을 중심으로 식단 논쟁을 정리합니다.",
    href: `/docs?cat=${encodeURIComponent("비만 다이어트")}`,
  },
];

/* ----------------------------- page ----------------------------- */

export default function Home() {
  const posts = (BLOG_INDEX satisfies VelitePost[])
    .filter((p) => p.published !== false)
    .map<TimedEntry>((p) => {
      const raw = p.updated ?? p.date;
      const label = formatYmdDot(raw);
      const dt = raw ? new Date(raw) : null;
      return {
        title: p.title,
        href: getBlogHref(p.slug),
        dateLabel: label,
        timestamp: dt?.getTime() ?? 0,
        kind: "blog" as const,
      };
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  const docs = (DOCS_INDEX satisfies VeliteDoc[])
    .filter((d) => d.published !== false)
    .map<TimedEntry>((d) => {
      const raw = d.updated ?? d.date;
      const label = formatYmdDot(raw);
      const dt = raw ? new Date(raw) : null;
      return {
        title: d.title,
        href: getDocHref(d.slug),
        dateLabel: label,
        timestamp: dt?.getTime() ?? 0,
        kind: "docs" as const,
      };
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  const toEntry = (entry: TimedEntry): Entry => ({
    title: entry.title,
    href: entry.href,
    dateLabel: entry.dateLabel,
    kind: entry.kind,
  });
  const docsLatest = docs.slice(0, MAX_DOC_ITEMS).map(toEntry);
  const blogLatest = posts.slice(0, MAX_BLOG_ITEMS).map(toEntry);
  const publishedDocCount = docs.length;

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-14">
        <section className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm">
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
              {publishedDocCount.toLocaleString("ko-KR")}개의 문서로 읽는 생명과학
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-5xl">
              논문으로 읽는 생명과학과 의학의 역사
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
              면역학 고전, 암 면역치료, 감염과 염증, 비만과 식이 연구를 1차 문헌과
              역사적 맥락 속에서 정리합니다. 발견의 순간과 실험의 한계, 그리고
              대중적으로 잘못 알려진 해석까지 함께 살펴봅니다.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/docs/guide"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                처음 읽는 방법
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100"
              >
                문서 전체 보기
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <img
              src="/images/hero.svg"
              alt="면역학과 의학 지식 정리를 상징하는 이미지"
              className="h-64 w-full object-contain p-6 sm:h-72 lg:h-80"
              fetchPriority="high"
            />
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">주제별로 들어가기</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
                이 사이트의 글은 최신 뉴스보다 긴 흐름을 따라갑니다. 관심 있는 주제에서
                시작해도, 관련 글을 따라가면 하나의 이야기로 이어지도록 구성하고 있습니다.
              </p>
            </div>
            <Link
              href="/docs"
              className="hidden rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700 transition hover:bg-neutral-100 sm:inline-flex"
            >
              전체 카테고리
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOPIC_CARDS.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.title}
                  href={`/docs?cat=${encodeURIComponent(topic.category)}`}
                  className="group min-h-40 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition group-hover:bg-neutral-900 group-hover:text-white">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <div className="mt-4 text-sm font-semibold text-neutral-950">
                    {topic.title}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-neutral-600">
                    {topic.description}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-neutral-700" aria-hidden />
            <h2 className="text-xl font-semibold tracking-tight">처음 읽는다면</h2>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {READING_PATHS.map((path, index) => (
              <Link
                key={path.title}
                href={path.href}
                className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition hover:bg-neutral-100"
              >
                <div className="text-xs font-semibold text-neutral-500">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-sm font-semibold text-neutral-950">
                  {path.title}
                </div>
                <div className="mt-2 text-sm leading-6 text-neutral-600">
                  {path.description}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3) 최근 문서 */}
        <section className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-base font-semibold">최근에 정리한 문서</h2>
            <Link
              href="/docs"
              className="text-xs rounded-full border border-neutral-200 bg-white px-3 py-1 text-neutral-700 hover:bg-neutral-100 transition"
            >
              문서 전체 보기
            </Link>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            {docsLatest.length === 0 ? (
              <div className="px-5 py-5 text-sm text-neutral-600">아직 문서가 없습니다.</div>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {docsLatest.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-5 py-4 hover:bg-neutral-50 transition"
                      title={item.title}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="truncate font-medium">{item.title}</div>
                        {item.dateLabel && (
                          <div className="shrink-0 text-xs text-neutral-500">
                            {item.dateLabel}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* 4) Blog: 공지 / 운영 (★ 수정 5: 제목 톤 다운) */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-neutral-700" aria-hidden />
              <h2 className="text-base font-semibold">사이트 공지</h2>
            </div>
            <Link
              href="/blog"
              className="text-xs rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-neutral-700 hover:bg-neutral-100 transition"
            >
              전체 보기
            </Link>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            블로그에는 사이트 운영과 공지 사항을 게시합니다.
          </p>

          {blogLatest.length === 0 ? (
            <div className="mt-3 text-sm text-neutral-600">아직 공지 글이 없습니다.</div>
          ) : (
            <ul className="mt-3 space-y-2">
              {blogLatest.map((item) => (
                <li
                  key={item.href}
                  className="rounded-xl border border-neutral-200 bg-neutral-50"
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-3 hover:bg-neutral-100 transition"
                    title={item.title}
                  >
                    <div className="truncate text-sm font-medium">{item.title}</div>
                    {item.dateLabel && (
                      <div className="mt-1 text-xs text-neutral-500">
                        {item.dateLabel}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
