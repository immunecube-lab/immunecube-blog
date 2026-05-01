// components/mdx/KeyPoint.tsx
import React, { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

type KeyPointProps = {
  title?: string;
  children: ReactNode;
  variant?: "default" | "subtle";
  className?: string;
};

export function KeyPoint({
  title,
  children,
  variant = "default",
  className = "",
}: KeyPointProps) {
  const base = "my-8 rounded-md border px-5 py-4";

  // ✅ 본문과 분리: border + bg + (아주 약한) shadow
  const style =
    variant === "subtle"
      ? "border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      : "border-rose-200 bg-rose-50 text-gray-900 shadow-sm dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-50";

  // ✅ 라벨/아이콘 줄 + 본문 줄로 구조 분리
  const header =
    variant === "subtle"
      ? `text-[0.78rem] ${title ? "tracking-normal" : "tracking-widest"} text-gray-500 dark:text-gray-400`
      : `text-[0.78rem] ${title ? "tracking-normal" : "tracking-widest"} text-rose-700 dark:text-rose-300`;

  const body =
    variant === "subtle"
      ? "mt-2 text-[0.98rem] leading-relaxed"
      : "mt-2 text-[1.02rem] leading-relaxed font-medium";

  return (
    <aside
      className={`${base} ${style} ${className}`.trim()}
      role="note"
      aria-label={title ? `Key point: ${title}` : "Key point"}
    >
      <div className="flex items-center gap-2">
        <Lightbulb
          className={
            variant === "subtle"
              ? "h-4 w-4 text-gray-500 dark:text-gray-400"
              : "h-4 w-4 text-rose-700 dark:text-rose-300"
          }
        />
        <div className={header}>{title ?? "KEY POINT"}</div>
      </div>

      <div className={body}>{children}</div>
    </aside>
  );
}

export default KeyPoint;
