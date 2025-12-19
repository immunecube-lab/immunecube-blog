// components/mdx/Concept.tsx
import React, { ReactNode } from "react";

type ConceptProps = {
  /** Term being defined */
  term: string;
  children: ReactNode;

  /** Optional short alias or subtitle */
  alias?: string;

  /** Optional visual variant */
  variant?: "default" | "boxed";

  /** Optional extra classes */
  className?: string;
};

export function Concept({
  term,
  alias,
  children,
  variant = "default",
  className = "",
}: ConceptProps) {
  const base =
    "my-6 px-5 py-4 leading-relaxed";

  const style =
    variant === "boxed"
      ? "border border-gray-200 rounded-md bg-white"
      : "border-l-4 border-gray-200 bg-white";

  return (
    <div
      className={`${base} ${style} ${className}`.trim()}
      role="definition"
      aria-label={`Concept: ${term}`}
    >
      <div className="mb-1 font-semibold text-gray-900">
        {term}
        {alias && (
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({alias})
          </span>
        )}
      </div>

      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
}

export default Concept;
