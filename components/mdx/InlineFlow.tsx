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
  wrap = true,
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
      className={`my-4 flex items-center rounded-xl border border-sky-100 bg-sky-50/50 px-2 sm:px-3 py-2 dark:border-sky-900/40 dark:bg-sky-950/30 ${
        wrap
          ? "flex-wrap justify-start sm:justify-center gap-x-1.5 gap-y-2.5 sm:gap-x-2 sm:gap-y-3"
          : "overflow-x-auto whitespace-nowrap justify-start sm:justify-center gap-1.5 sm:gap-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      } ${className}`.trim()}
    >
      {stepList.map((step, index) => {
        const isLast = index === stepList.length - 1;
        const isFirst = index === 0;
        
        const stepContent = (
          <span
            className={`inline-flex shrink-0 items-center rounded-lg border px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm font-extrabold transition-all ${
              isLast
                ? "border-sky-500 bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs dark:border-sky-400 dark:from-sky-500 dark:to-blue-600"
                : "border-neutral-200 bg-white text-neutral-800 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
            }`}
          >
            {step.trim()}
          </span>
        );

        if (isFirst) {
          return <React.Fragment key={index}>{stepContent}</React.Fragment>;
        }

        // 두 번째 아이템부터는 화살표(→)와 박스 아이템을 하나의 inline-flex 박스로 묶어
        // 줄바꿈이 일어날 때 화살표가 아랫줄의 시작점(접두사)으로 항상 같이 묶여 내려가도록 합니다.
        return (
          <span key={index} className="inline-flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="text-sky-500 font-extrabold dark:text-sky-400 text-sm sm:text-base select-none">
              →
            </span>
            {stepContent}
          </span>
        );
      })}
    </div>
  );
}

export default InlineFlow;
