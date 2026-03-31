// app/blog/page.tsx
import type { Metadata } from "next";
import { posts } from "@/.velite";
import type { Post } from "@/.velite";
import { BlogBrowser } from "./blog-browser";

export const metadata: Metadata = {
  title: "블로그",
  description: "생활면역, 연구 노트, 개발 기록을 정리한 블로그입니다.",
  alternates: {
    canonical: "/blog",
  },
};

type PostWithMeta = Post & {
  featured?: boolean;
  cover?: string;
  tags?: string[];
  category?: string;
  updated?: string;
};

export default function BlogPage() {
  const visible = [...posts].filter((post) => post.published !== false) as PostWithMeta[];
  return <BlogBrowser posts={visible} />;
}
