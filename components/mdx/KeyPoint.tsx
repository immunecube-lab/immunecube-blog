// components/mdx/KeyPoint.tsx
import React, { ReactNode } from "react";

type KeyPointProps = {
  children: ReactNode;
  /** Optional visual emphasis */
  variant?: "default" | "subtle";
  /** Optional extra classes */
  className?: string;
};

export function KeyPoint({
  children,
  variant = "default",
  className = "",
}: KeyPointProps) {
  const base =
    "my-8 pl-5 pr-4 py-4 border-l-4 leading-relaxed";

  const style =
    variant === "subtle"
      ? "border-gray-300 bg-gray-50 text-gray-700"
      : "border-gray-900 bg-gray-50 text-gray-900";

  return (
    <div
      className={`${base} ${style} ${className}`.trim()}
      role="note"
      aria-label="Key point"
    >
      {children}
    </div>
  );
}

export default KeyPoint;
