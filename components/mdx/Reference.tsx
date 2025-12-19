// components/mdx/References.tsx
import React from "react";
import RefItem, { RefItemProps } from "./RefItem";

type ReferencesProps = {
  title?: string; // 기본: "참고문헌"
  items: RefItemProps[];
  className?: string;
};

export function References({
  title = "참고문헌",
  items,
  className = "",
}: ReferencesProps) {
  return (
    <section className={`mt-10 ${className}`.trim()} aria-label={title}>
      <div className="mb-3 text-base font-semibold text-gray-900">
        {title}
      </div>

      <ol className="list-none p-0 m-0">
        {items.map((it, i) => (
          <RefItem key={it.id ?? i} {...it} index={i + 1} />
        ))}
      </ol>
    </section>
  );
}

export default References;
