// components/mdx/Series.tsx
import React from "react";

type SeriesProps = {
  /** Series title shown as the primary identifier */
  title: string;

  /** Optional: describes where this article sits within the series (semantic position, not numbering) */
  position?: string;

  /** Optional: short scope/axis hint (e.g., "면역–대사 연결") */
  scope?: string;

  /** Optional: simple numbering if you ever want it (keep it secondary) */
  part?: number;
  total?: number;

  /** Optional: visual variant */
  variant?: "default" | "subtle";

  /** Optional: additional classes */
  className?: string;
};

export function Series({
  title,
  position,
  scope,
  part,
  total,
  variant = "default",
  className = "",
}: SeriesProps) {
  const hasNumber = typeof part === "number" && typeof total === "number";

  const root =
    variant === "subtle"
      ? "my-6 border-l-4 border-gray-100 pl-3 text-sm text-gray-600"
      : "my-6 border-l-4 border-gray-200 pl-3 text-sm text-gray-600";

  return (
    <div className={`${root} ${className}`.trim()} aria-label="Series context">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="uppercase tracking-wider text-[0.65rem] text-gray-400">
          Series
        </span>

        {hasNumber && (
          <span className="text-[0.7rem] text-gray-400">
            {part}/{total}
          </span>
        )}
      </div>

      <div className="mt-1 leading-relaxed">
        <span className="font-medium text-gray-900">{title}</span>

        {position && (
          <span className="text-gray-500"> — {position}</span>
        )}
      </div>

      {scope && (
        <div className="mt-1 text-xs text-gray-500">
          {scope}
        </div>
      )}
    </div>
  );
}

export default Series;

