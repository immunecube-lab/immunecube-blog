import React from "react";

type InlineFlowProps = {
  text?: string;
  steps?: string[];
  items?: string[];
  wrap?: boolean;
  className?: string;
};

export function InlineFlow({
  text,
  steps,
  items,
  wrap = false,
  className = "",
}: InlineFlowProps) {
  let stepList: string[] = [];

  if (steps && steps.length > 0) {
    stepList = steps;
  } else if (items && items.length > 0) {
    stepList = items;
  } else if (text) {
    stepList = text.split(/\s*➔\s*|\s*→\s*/);
  }

  if (stepList.length === 0) return null;

  return (
    <div
      className={`my-4 flex items-center gap-1.5 sm:gap-2 rounded-xl border border-sky-100 bg-sky-50/50 px-2 sm:px-3 py-2 dark:border-sky-900/40 dark:bg-sky-950/30 ${
        wrap
          ? "flex-wrap justify-center"
          : "overflow-x-auto whitespace-nowrap justify-start sm:justify-center [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      } ${className}`.trim()}
    >
      {stepList.map((step, index) => {
        const isLast = index === stepList.length - 1;
        return (
          <React.Fragment key={index}>
            <span
              className={`inline-flex shrink-0 items-center rounded-lg border px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm font-extrabold transition-all ${
                isLast
                  ? "border-sky-500 bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs dark:border-sky-400 dark:from-sky-500 dark:to-blue-600"
                  : "border-neutral-200 bg-white text-neutral-800 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
              }`}
            >
              {step.trim()}
            </span>
            {!isLast && (
              <span className="shrink-0 text-sky-500 font-extrabold dark:text-sky-400 text-sm sm:text-base select-none">
                →
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default InlineFlow;
