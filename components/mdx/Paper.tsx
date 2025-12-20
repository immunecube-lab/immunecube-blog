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

  // ✅ 한 줄 메타: "Nowell PC · Cancer Research · 1960 · Vol 20 · pp. 462–466"
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
        "my-6 overflow-hidden rounded-md border border-gray-200",
        className,
      ].join(" ")}
      role="note"
      aria-label="Paper"
    >
      {/* ✅ 제목 바: h3 제거(heading 간섭 제거), 상단 공간 제거 */}
      <div className="-mt-px px-4 py-3 text-[1.05rem] font-semibold leading-snug bg-rose-100 text-gray-900 border-b border-rose-200 rounded-t-md">
  {title}
</div>

      {/* ✅ 본문(메타+요약) 영역만 흰 배경 */}
      <div className="bg-white">
        {oneLineMeta && (
          <div className="px-4 pt-2 text-[0.92rem] text-gray-700 whitespace-normal">
            {oneLineMeta}
          </div>
        )}

        {takeaway && (
          <div className="px-4 pt-2 pb-3 text-[0.95rem] leading-relaxed text-gray-900">
            {takeaway}
          </div>
        )}

        {/* ✅ 링크는 기본 숨김 (필요 시 showLinks=true) */}
        {showLinks && allLinks.length > 0 && (
          <div className="px-4 pb-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.9rem] text-gray-700">
            {allLinks.map((l) => (
              <a
                key={`${l.label}:${l.href}`}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
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
