import React from "react";

type StepItem = string | { title: string; description?: string; highlight?: boolean };

type ProcessFlowProps = {
  title?: string;
  items?: StepItem[];
  steps?: StepItem[];
  className?: string;
};

export function ProcessFlow({
  title,
  items,
  steps,
  className = "",
}: ProcessFlowProps) {
  const stepList = items || steps || [];

  return (
    <div className={`my-8 rounded-xl border border-sky-100 bg-sky-50/40 p-5 dark:border-sky-900/40 dark:bg-sky-950/20 ${className}`.trim()}>
      {title && (
        <div className="mb-4 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          {title}
        </div>
      )}

      <div className="space-y-2.5">
        {stepList.map((step, index) => {
          const isLast = index === stepList.length - 1;
          const stepTitle = typeof step === "string" ? step : step.title;
          const stepDesc = typeof step === "object" ? step.description : undefined;
          const isHighlight = typeof step === "object" ? Boolean(step.highlight) : isLast;

          return (
            <div key={index} className="flex flex-col items-center">
              {/* Step Card */}
              <div
                className={`flex w-full items-center gap-3.5 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                  isHighlight
                    ? "border-sky-500 bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md dark:border-sky-400 dark:from-sky-500 dark:to-blue-600"
                    : "border-neutral-200 bg-white text-neutral-800 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isHighlight
                      ? "bg-white/20 text-white"
                      : "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                  }`}
                >
                  {index + 1}
                </span>

                <div className="flex-1">
                  <div className="leading-snug">{stepTitle}</div>
                  {stepDesc && (
                    <div
                      className={`mt-0.5 text-xs ${
                        isHighlight
                          ? "text-sky-100"
                          : "text-neutral-500 dark:text-neutral-400"
                      }`}
                    >
                      {stepDesc}
                    </div>
                  )}
                </div>
              </div>

              {/* Downward Arrow Connection */}
              {!isLast && (
                <div className="my-1 flex items-center justify-center text-sky-400 dark:text-sky-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProcessFlow;
