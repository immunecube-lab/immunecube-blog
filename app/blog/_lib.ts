// app/blog/_lib.ts
import type { Post } from "@/.velite";

export type PostWithMeta = Post & {
  featured?: boolean;
  cover?: string;
  tags?: string[];
  category?: string;
  updated?: string;
};

export function getPostTime(p: PostWithMeta) {
  const v = (p.updated as any) ?? (p.date as any);
  const t = new Date(v ?? 0).getTime();
  return Number.isFinite(t) ? t : 0;
}

/**
 * velite가 slug에 폴더 경로를 포함시키는 경우가 있어도
 * URL은 항상 마지막 세그먼트(=진짜 slug)만 쓰기 위해 정규화합니다.
 */
export function normalizePostSlug(input: string) {
  if (!input) return input;

  // "posts/" 같은 prefix가 있든 없든 상관없이
  // 최종적으로 "/" 기준 마지막 조각만 사용
  const s = input.replace(/^\/+|\/+$/g, ""); // 양끝 슬래시 제거
  const parts = s.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? input;
}
