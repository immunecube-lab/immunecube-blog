// components/article-meta.tsx
import React from "react";

function ymd(v?: string) {
  if (!v) return undefined;
  return v.length >= 10 ? v.slice(0, 10) : v;
}

export function MetaLine({
  date,
  updated,
  className = "text-sm text-neutral-500 mb-6",
}: {
  date?: string;
  updated?: string;
  className?: string;
}) {
  const d = ymd(date);
  const u = ymd(updated) ?? d;

  if (!d && !u) return null;

  const parts: string[] = [];
  if (d) parts.push(`발행: ${d}`);
  if (u) parts.push(`최종 업데이트: ${u}`);

  return <p className={className}>{parts.join(" · ")}</p>;
}
