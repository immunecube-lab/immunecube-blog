// components/mdx/RefItem.tsx
import React from "react";

export type RefItemProps = {
  /** (선택) 내부 앵커용 ID: "cani2007" 같은 키 */
  id?: string;

  /** 표시 번호(1,2,3...). 보통 References에서 자동으로 넣습니다. */
  index?: number;

  /** 저자 문자열: "Cani PD, Amar J, Iglesias MA, et al." */
  authors: string;

  /** 연도: "2007" */
  year: string | number;

  /** 제목 */
  title: string;

  /** 저널/서적/출처명 */
  source?: string;

  /** 권/호/페이지 등 */
  detail?: string;

  /** DOI (권장) */
  doi?: string;

  /** URL (웹 문서 등) */
  url?: string;

  /** 추가 메모 (선택) */
  note?: string;
};

function formatDoi(doi?: string) {
  if (!doi) return null;
  // 출력은 doi:10.... 형태로만. 링크는 선택.
  return `doi:${doi}`;
}

export function RefItem({
  id,
  index,
  authors,
  year,
  title,
  source,
  detail,
  doi,
  url,
  note,
}: RefItemProps) {
  return (
    <li
      id={id}
      className="my-2 leading-relaxed text-gray-700"
    >
      <span className="mr-2 text-gray-500">
        {typeof index === "number" ? `${index}.` : "•"}
      </span>

      <span className="text-gray-900">{authors}</span>
      <span className="text-gray-500"> ({year}). </span>

      <span className="text-gray-900">{title}</span>
      {source && <span className="text-gray-700">. {source}</span>}
      {detail && <span className="text-gray-700"> {detail}</span>}
      <span className="text-gray-700">.</span>

      {(doi || url) && (
        <div className="mt-1 text-sm text-gray-500">
          {doi && <div>{formatDoi(doi)}</div>}
          {url && (
            <div className="break-all">
              {url}
            </div>
          )}
        </div>
      )}

      {note && (
        <div className="mt-1 text-sm text-gray-500">
          {note}
        </div>
      )}
    </li>
  );
}

export default RefItem;
