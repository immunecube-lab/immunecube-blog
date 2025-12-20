// components/mdx/KeyPoint.tsx
import React, { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

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
  const base = "my-8 rounded-md border px-5 py-4";

  // ✅ 본문과 분리: border + bg + (아주 약한) shadow
  const style =
    variant === "subtle"
      ? "border-gray-200 bg-gray-50 text-gray-800"
      : "border-rose-200 bg-rose-50 text-gray-900 shadow-sm";

  // ✅ 라벨/아이콘 줄 + 본문 줄로 구조 분리
  const header =
    variant === "subtle"
      ? "text-[0.78rem] tracking-widest text-gray-500"
      : "text-[0.78rem] tracking-widest text-rose-700";

  const body =
    variant === "subtle"
      ? "mt-2 text-[0.98rem] leading-relaxed"
      : "mt-2 text-[1.02rem] leading-relaxed font-medium";

  return (
    <aside
      className={`${base} ${style} ${className}`.trim()}
      role="note"
      aria-label="Key point"
    >
      <div className="flex items-center gap-2">
        <Lightbulb
          className={
            variant === "subtle"
              ? "h-4 w-4 text-gray-500"
              : "h-4 w-4 text-rose-700"
          }
        />
        <div className={header}>KEY POINT</div>
      </div>

      <div className={body}>{children}</div>
    </aside>
  );
}

export default KeyPoint;
