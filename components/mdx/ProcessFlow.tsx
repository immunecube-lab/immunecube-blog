import React from "react";

type StepItem = string | { title: string; description?: string; highlight?: boolean };

type ProcessFlowProps = {
  title?: string;
  items?: StepItem[];
  steps?: StepItem[];
  mode?: "vertical" | "horizontal";
  horizontal?: boolean;
  className?: string;
};

export function ProcessFlow({
  title,
  items,
  steps,
  mode = "vertical",
  horizontal = false,
  className = "",
}: ProcessFlowProps) {
  const stepList = items || steps || [];
  const isHorizontal = horizontal || mode === "horizontal";

  if (isHorizontal) {
    return (
      <div
        className={`my-6 mx-auto max-w-full rounded-xl border border-sky-100 bg-sky-50/40 p-4 sm:p-5 dark:border-sky-900/40 dark:bg-sky-950/20 ${className}`.trim()}
      >
        {title && (
          <div className="mb-3 text-center text-base font-extrabold tracking-tight text-sky-800 dark:text-sky-300">
            {title}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {stepList.map((step, index) => {
            const isLast = index === stepList.length - 1;
            const stepTitle = typeof step === "string" ? step : step.title;
            const isHighlight = typeof step === "object" ? Boolean(step.highlight) : isLast;

            return (
              <React.Fragment key={index}>
                <div
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isHighlight
                      ? "border-sky-500 bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs dark:border-sky-400 dark:from-sky-500 dark:to-blue-600"
                      : "border-neutral-200 bg-white text-neutral-800 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                  }`}
                >
                  <span
                    className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                      isHighlight
                        ? "bg-white/25 text-white"
                        : "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span>{stepTitle}</span>
                </div>

                {!isLast && (
                  <span className="text-sky-500 font-bold dark:text-sky-400 select-none">
                    →
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`my-8 mx-auto max-w-xl rounded-xl border border-sky-100 bg-sky-50/40 p-4 sm:p-5 dark:border-sky-900/40 dark:bg-sky-950/20 ${className}`.trim()}
    >
      {title && (
        <div className="mb-4 text-center text-base font-extrabold tracking-tight text-sky-800 dark:text-sky-300">
          {title}
        </div>
      )}

      <div className="space-y-2">
        {stepList.map((step, index) => {
          const isLast = index === stepList.length - 1;
          const stepTitle = typeof step === "string" ? step : step.title;
          const stepDesc = typeof step === "object" ? step.description : undefined;
          const isHighlight = typeof step === "object" ? Boolean(step.highlight) : isLast;

          return (
            <div key={index} className="flex flex-col items-center">
              {/* Step Card */}
              <div
                className={`flex w-full flex-col items-center justify-center rounded-lg border px-4 py-2.5 text-center text-sm font-medium transition-all ${
                  isHighlight
                    ? "border-sky-500 bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md dark:border-sky-400 dark:from-sky-500 dark:to-blue-600"
                    : "border-neutral-200 bg-white text-neutral-800 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                      isHighlight
                        ? "bg-white/25 text-white"
                        : "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="font-bold leading-snug">{stepTitle}</span>
                </div>

                {stepDesc && (
                  <div
                    className={`mt-1 text-xs ${
                      isHighlight
                        ? "text-sky-100"
                        : "text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    {stepDesc}
                  </div>
                )}
              </div>

              {/* Downward Arrow Connection */}
              {!isLast && (
                <div className="my-0.5 flex items-center justify-center text-sky-400 dark:text-sky-500">
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
