// components/mdx/KeyPoint.tsx
import React, { ReactNode } from "react";

type KeyPointProps = {
  children: ReactNode;
  variant?: "default" | "subtle";
  className?: string;
};

export function KeyPoint({
  children,
  variant = "default",
  className = "",
}: KeyPointProps) {
  const base =
    "my-6 pl-4 pr-4 py-3 border-l-4";

  const style =
    variant === "subtle"
      ? "border-gray-300 bg-gray-50 text-gray-700"
      : "border-red-600 bg-slate-50 text-gray-900";

  const text =
    variant === "subtle"
      ? "text-[0.95rem] leading-relaxed"
      : "text-[1.02rem] leading-snug font-medium"; // ✅ 여기만 변경

  return (
    <div
      className={`${base} ${style} ${text} ${className}`.trim()}
      role="note"
      aria-label="Key point"
    >
      {children}
    </div>
  );
}

export default KeyPoint;
