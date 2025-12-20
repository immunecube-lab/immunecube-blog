// components/mdx/Concept.tsx
import React, { ReactNode } from "react";

type ConceptProps = {
  term: string;
  children: ReactNode;
  alias?: string;
  variant?: "default" | "boxed";
  className?: string;
};

export function Concept({
  term,
  alias,
  children,
  variant = "default",
  className = "",
}: ConceptProps) {
  const base = "my-6 overflow-hidden leading-relaxed";

  const container =
    variant === "boxed"
      ? "border border-gray-200 rounded-md bg-white"
      : "border-l-4 border-gray-200 bg-white";

  return (
    <div
      className={`${base} ${container} ${className}`.trim()}
      role="definition"
      aria-label={`Concept: ${term}`}
    >
      {/* 제목 영역 */}
      <div className="px-5 py-2 bg-gray-100 text-gray-900 font-semibold">
        {term}
        {alias && (
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({alias})
          </span>
        )}
      </div>

      {/* 설명 영역 */}
      <div className="px-5 py-0 text-gray-700">
        {children}
      </div>
    </div>
  );
}

export default Concept;
