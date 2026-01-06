// src/components/References.tsx
// (프로젝트 경로는 예시입니다. 사용 중인 구조에 맞게 옮기셔도 됩니다.)

import React from "react";

type ReferenceItem = {
  authors: string;      // 예: "Biedler, C., Johnson, K., & Smith, K. A."
  year: string | number; // 예: 1993
  title: string;        // 논문 제목
  journal: string;      // 저널명 (이탤릭 처리 안 함)
  volume?: string;      // 예: "90"
  issue?: string;       // 예: "9"
  pages?: string;       // 예: "4094–4098"
  doi?: string;         // 예: "10.1073/pnas.90.9.4094" (선택)
  url?: string;         // 예: "https://www.pnas.org" (선택)
};

function normalizeDoi(doi: string): string {
  const d = doi.trim();
  if (!d) return "";
  // 이미 URL이면 그대로
  if (d.startsWith("http://") || d.startsWith("https://")) return d;
  // DOI만 들어오면 resolver 형태로
  return `https://doi.org/${d.replace(/^doi:\s*/i, "")}`;
}

function joinVolumeIssue(volume?: string, issue?: string): string {
  if (volume && issue) return `${volume}(${issue})`;
  if (volume) return volume;
  return "";
}

export function Reference({ item }: { item: ReferenceItem }) {
  const year = String(item.year).trim();
  const volIssue = joinVolumeIssue(item.volume, item.issue);
  const pages = item.pages?.trim();
  const doiUrl = item.doi ? normalizeDoi(item.doi) : "";
  const link = (item.url || doiUrl || "").trim();

  // APA 한 줄 형태 (저널명 이탤릭 없음)
  // authors. (year). title. journal, volume(issue), pages. url
  const parts: string[] = [];
  parts.push(`${item.authors.trim()}.`);
  parts.push(`(${year}).`);
  parts.push(`${item.title.trim()}.`);
  // journal + , volume(issue), pages.
  const jParts: string[] = [item.journal.trim()];
  if (volIssue) jParts.push(volIssue);
  const jStr = jParts.join(", ");
  if (pages) {
    parts.push(`${jStr}, ${pages}.`);
  } else {
    parts.push(`${jStr}.`);
  }

  // 링크(doi/url)는 마지막에 1개만
  if (link) parts.push(link);

  const line = parts.join(" ");

  return <li>{line}</li>;
}

export function References({
  items,
  heading = "참고문헌",
}: {
  items: ReferenceItem[];
  heading?: string;
}) {
  return (
    <section>
      <h2>{heading}</h2>
      <ul>
        {items.map((it, idx) => (
          <Reference key={`${it.title}-${idx}`} item={it} />
        ))}
      </ul>
    </section>
  );
}

export type { ReferenceItem };
