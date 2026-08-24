import { Suspense, type ReactNode } from "react";
import { STORIES_INDEX } from "@/generated/content-index";
import { groupStoriesBySeries, type StoryWithMeta } from "./_lib";
import { LeftSidebar } from "./left-sidebar";

export default function StoriesLayout({ children }: { children: ReactNode }) {
  const all = [...(STORIES_INDEX as StoryWithMeta[])].filter(
    (story) => story.published !== false,
  );

  const categories = Array.from(
    new Set(
      all
        .map((story) => (story.category ?? "").trim())
        .filter((value) => value.length > 0),
    ),
  ).sort((a, b) => a.localeCompare(b, "ko"));

  const seriesGroups = groupStoriesBySeries(all);

  return (
    <div className="mx-auto flex max-w-6xl flex-col md:flex-row gap-6 md:gap-10 px-4 py-6 sm:px-6 sm:py-10 print:p-0 print:gap-0">
      <Suspense fallback={<div className="w-60 shrink-0 border-r pr-6 print:hidden" />}>
        <LeftSidebar categories={categories} seriesGroups={seriesGroups} />
      </Suspense>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
