// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100">
      <div className="max-w-xl space-y-6 px-6">
        <h1 className="text-3xl font-semibold">
          immunecube
        </h1>
        <p className="text-sm text-neutral-300 leading-relaxed">
          생활면역과 저속노화, 면역 실험의 역사와
          현대 면역대사를 다루는 블로그 & 문서 사이트입니다.
        </p>
        <div className="flex gap-4">
          {/* TODO: 실제 블로그 경로로 수정 */}
          <Link
            href="/blog"
            className="rounded-full border border-neutral-500 px-4 py-2 text-sm hover:bg-neutral-100 hover:text-neutral-900 transition"
          >
            블로그로 가기
          </Link>
          <Link
            href="/docs"
            className="text-sm text-neutral-300 underline underline-offset-4 hover:text-white"
          >
            문서 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
