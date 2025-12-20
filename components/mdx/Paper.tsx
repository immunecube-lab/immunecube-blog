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
  showLinks = false, // ✅ 기본은 숨김
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

  const allLinks: LinkItem[] = [
    ...(doi ? [{ label: "DOI", href: doiToUrl(doi) }] : []),
    ...(pmid ? [{ label: "PubMed", href: pmidToUrl(pmid) }] : []),
    ...(primaryUrl && !doi && !pmid ? [{ label: "Link", href: primaryUrl }] : []),
    ...links,
  ];

  return (
    <section
      className={[
        "my-8 border-l-4 border-gray-900 bg-gray-50 px-5 py-4",
        className,
      ].join(" ")}
      role="note"
      aria-label="Paper"
    >
      {/* ✅ gap 제거: 요소별 간격을 직접 제어 */}
      <div>
        {/* ✅ Paper-제목 간격 축소 */}
        <div className="text-[0.7rem] font-semibold tracking-widest text-gray-600 uppercase mb-1">
          Paper
        </div>

        <h3 className="m-0 text-[1.15rem] font-semibold leading-snug text-gray-900">
          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>

        {authors && (
          <div className="mt-2 text-[0.95rem] leading-relaxed text-gray-800">
            {authors}
          </div>
        )}

        {metaParts.length > 0 && (
          <div className="mt-1 text-[0.9rem] text-gray-700">
            {metaParts.join(" · ")}
          </div>
        )}

        {takeaway && (
          <div className="mt-3 text-[0.98rem] leading-relaxed font-medium text-gray-900">
            {takeaway}
          </div>
        )}

        {/* ✅ 링크는 기본 숨김, 필요할 때만 showLinks=true */}
        {showLinks && allLinks.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.9rem] text-gray-700">
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
