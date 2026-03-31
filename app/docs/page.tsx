// app/docs/page.tsx
import type { Metadata } from "next";
import * as site from "@/.velite";
import { DocsBrowser } from "./docs-browser";

type Doc = {
  slug: string;
  title: string;
  description?: string;
  published?: boolean;
  category?: string;
  section?: string; // subgroup(2단)로 사용할 값
  docType?: string; // "paper" | "docent"
  order?: number;
  date?: string;
  updated?: string;
};

const docs = (site as any).docs as Doc[] | undefined;
const drafts = (site as any).drafts as Doc[] | undefined;
const isLocalDev = process.env.NODE_ENV === "development";

/* --------------------------- metadata --------------------------- */
/**
 * /docs는 필터 쿼리(cat/sec)가 붙어도 canonical은 /docs로 고정합니다.
 * - /docs?cat=...&sec=... 형태의 URL이 무한히 생기면 중복 페이지로 판단될 수 있습니다.
 * - 전역 app/layout.tsx에 metadataBase가 설정되어 있어야 절대 URL로 정상 출력됩니다.
 */
export const metadata: Metadata = {
  title: "글 모음",
  description: "카테고리 및 섹션별 문서 목록입니다.",
  alternates: {
    canonical: "/docs",
  },
};
export default function DocsPage() {
  if (!docs) {
    return (
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">글 모음</h1>
        <p className="text-sm text-neutral-500">docs 컬렉션이 아직 준비되지 않았습니다.</p>
      </main>
    );
  }

  const source = [...docs, ...(isLocalDev ? drafts ?? [] : [])];
  const visible = isLocalDev ? source : source.filter((doc) => doc.published !== false);
  return <DocsBrowser docs={visible} />;
}
