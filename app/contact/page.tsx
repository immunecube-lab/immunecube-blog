import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문의 및 질문 | immunecube",
  description: "immunecube 글에 대한 질문, 의견, 오류 제보 안내입니다.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-20 text-neutral-900">
      <section className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-neutral-500">Contact & Q&A</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">질문 및 문의</h1>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-700">
          <p>
            Immunecube 글에 대한 궁금한 점이나 자유로운 의견 공유는 새로 마련된 <strong>[질문 게시판]</strong>을 이용해 주세요.
          </p>
          <p>
            네이버 블로그를 통한 오류 제보나 소통도 계속 가능합니다.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/qna"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            질문 게시판으로 이동 →
          </Link>
          <Link
            href="https://blog.naver.com/immunecube"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100"
          >
            네이버 블로그
          </Link>
        </div>
      </section>
    </main>
  );
}
