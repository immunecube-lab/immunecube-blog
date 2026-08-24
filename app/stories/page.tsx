import { Suspense } from "react";
import type { Metadata } from "next";
import { STORIES_INDEX } from "@/generated/content-index";
import { StoriesBrowser } from "./stories-browser";
import { type StoryWithMeta } from "./_lib";

export const metadata: Metadata = {
  title: "면역이야기",
  description:
    "노년의 건강과 면역을 누구나 이해할 수 있도록 쉽게 풀어쓴 이야기입니다.",
  alternates: {
    canonical: "/stories",
  },
};

export default function StoriesPage() {
  const visible = [...STORIES_INDEX].filter(
    (story) => story.published !== false,
  ) as StoryWithMeta[];

  return (
    <Suspense fallback={<div className="py-10 text-center text-sm text-neutral-400">이야기를 불러오는 중...</div>}>
      <StoriesBrowser stories={visible} />
    </Suspense>
  );
}

