// components/mdx/PaperLite.tsx
import React from "react";

type PaperLiteProps = {
  title: string;
  authors?: string;
  journal?: string;
  year?: number | string;
  doi?: string;
  pmid?: string;
  url?: string;
  className?: string;
};

function doiToUrl(doi: string) {
  const clean = doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").trim();
  return `https://doi.org/${clean}`;
}

function pmidToUrl(pmid: string) {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid.trim()}/`;
}

export function PaperLite({
  title,
  authors,
  journal,
  year,
  doi,
  pmid,
  url,
  className = "",
}: PaperLiteProps) {
  const href =
    (doi && doiToUrl(doi)) ||
    (pmid && pmidToUrl(pmid)) ||
    url ||
    undefined;

  const metaBottom = [journal, year].filter(Boolean).join(" · ");

  return (
    <div
      className={[
        "my-4 pl-3 border-l-4 border-gray-400", // ✅ 굵기 통일
        "text-[0.95rem] leading-snug",
        className,
      ].join(" ")}
      role="note"
      aria-label="Paper reference"
    >
      <div className="font-medium text-gray-900">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </div>

      {authors && (
        <div className="text-gray-700 text-[0.9rem]">
          {authors}
        </div>
      )}

      {metaBottom && (
        <div className="text-gray-600 text-[0.85rem]">
          {metaBottom}
        </div>
      )}
    </div>
  );
}

export default PaperLite;
