// components/mdx/Paper.tsx
import React from "react";

type LinkItem = { label: string; href: string };

type PaperProps = {
  title: string;
  authors?: string;
  journal?: string;
  year?: number | string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  url?: string; // direct link if no DOI
  links?: LinkItem[];
  takeaway?: string; // 1-2 line 핵심
  className?: string;

  /** 링크를 Paper 블록에서 보여줄지 (기본: false) */
  showLinks?: boolean;
};

function doiToUrl(doi: string) {
  const clean = doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").trim();
  return `https://doi.org/${clean}`;
}

function pmidToUrl(pmid: string) {
  const clean = pmid.trim();
  return `https://pubmed.ncbi.nlm.nih.gov/${clean}/`;
}

export function Paper({
  title,
  authors,
  journal,
  year,
  volume,
  issue,
  pages,
  doi,
  pmid,
  url,
  links = [],
  takeaway,
  className = "",
  showLinks = false,
}: PaperProps) {
  const primaryUrl =
    (doi && doiToUrl(doi)) || url || (pmid && pmidToUrl(pmid)) || "";

  const metaParts = [
    journal,
    year ? String(year) : undefined,
    volume ? `Vol ${volume}` : undefined,
    issue ? `No ${issue}` : undefined,
    pages ? `pp. ${pages}` : undefined,
  ].filter(Boolean);

  const oneLineMeta = [authors, ...metaParts].filter(Boolean).join(" · ");

  const allLinks: LinkItem[] = [
    ...(doi ? [{ label: "DOI", href: doiToUrl(doi) }] : []),
    ...(pmid ? [{ label: "PubMed", href: pmidToUrl(pmid) }] : []),
    ...(primaryUrl && !doi && !pmid ? [{ label: "Link", href: primaryUrl }] : []),
    ...links,
  ];

  return (
    <section
      className={[
        "my-6 overflow-hidden rounded-md border border-gray-200 shadow-sm",
        className,
      ].join(" ")}
      role="note"
      aria-label="Paper"
    >
      {/* 제목 바 */}
      <div className="-mt-px px-4 py-3 text-[1.05rem] font-semibold leading-snug bg-rose-100 text-gray-900 border-b border-rose-200 rounded-t-md">
        {title}
      </div>

      {/* ✅ 본문 영역: 옅은 배경 + inset ring으로 '카드' 느낌 강화 */}
      <div className="bg-rose-50/40 ring-1 ring-inset ring-rose-100">
        {oneLineMeta && (
          <div className="px-4 pt-2 text-[0.92rem] text-rose-950/70 whitespace-normal">
            {oneLineMeta}
          </div>
        )}

        {takeaway && (
          <div className="px-4 pt-2 pb-3 text-[0.95rem] leading-relaxed text-gray-900">
            {takeaway}
          </div>
        )}

        {showLinks && allLinks.length > 0 && (
          <div className="px-4 pb-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.9rem] text-rose-950/70">
            {allLinks.map((l) => (
              <a
                key={`${l.label}:${l.href}`}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-rose-300 hover:decoration-rose-500"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Paper;
