import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문의 | immunecube",
  description: "immunecube 글에 대한 의견, 오류 제보, 주제 제안 안내입니다.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-20 text-neutral-900">
      <section className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-neutral-500">Contact</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">문의</h1>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-700">
          <p>
            이 사이트의 글에 대한 의견, 오류 제보, 주제 제안은 네이버 블로그를
            통해 남겨 주세요.
          </p>
          <p>
            모든 문의에 바로 답변하지는 못하지만, 중요한 오류나 보완할 내용은
            가능한 한 확인해 반영하겠습니다.
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="https://blog.naver.com/immunecube"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            네이버 블로그로 이동
          </Link>
        </div>
      </section>
    </main>
  );
}
