// app/blog/page.tsx
import type { Metadata } from "next";
import { BLOG_INDEX } from "@/generated/content-index";
import { BlogBrowser } from "./blog-browser";

export const metadata: Metadata = {
  title: "블로그",
  description: "생활면역, 연구 노트, 개발 기록을 정리한 블로그입니다.",
  alternates: {
    canonical: "/blog",
  },
};

type PostWithMeta = {
  slug: string;
  title: string;
  description?: string;
  published?: boolean;
  date?: string;
  updated?: string;
  featured?: boolean;
  cover?: string;
  tags?: string[];
  category?: string;
};

export default function BlogPage() {
  const visible = [...BLOG_INDEX].filter((post) => post.published !== false) as PostWithMeta[];
  return <BlogBrowser posts={visible} />;
}
