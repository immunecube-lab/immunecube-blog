import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "소개 | immunecube",
  description:
    "immunecube가 어떤 기준으로 면역학, 의학사, 임상 연구 글을 작성하는지 소개합니다.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-20 text-neutral-900">
      <section className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-neutral-500">About</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Immunecube 소개
        </h1>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-neutral-700">
          <section>
            <h2 className="text-base font-semibold text-neutral-900">
              무엇을 하는 곳인가
            </h2>
            <p className="mt-3">
              Immunecube는 면역학과 의학사를 중심으로, 논문과 임상 연구가
              어떤 맥락에서 등장했고 무엇을 실제로 말하는지 정리하는 개인
              지식 아카이브입니다. 면역학 고전, 암과 면역치료의 역사, 백신과
              사회, 비만과 식이 연구, 건강 정보 비판 글을 함께 다룹니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">
              글을 쓰는 기준
            </h2>
            <p className="mt-3">
              이 사이트의 글은 특정 제품이나 치료법을 홍보하기 위한 것이
              아닙니다. 가능한 한 원 논문, 임상시험, 역사적 자료, 공신력 있는
              검토 문헌을 바탕으로 연구의 의미와 한계를 함께 설명하려고
              합니다.
            </p>
            <p className="mt-3">
              과학적 결론은 대개 한 문장으로 끝나지 않습니다. 그래서 이
              사이트는 연구 결과를 단정적으로 소비하기보다, 어떤 조건에서
              관찰되었는지, 무엇을 말할 수 있고 무엇을 아직 말할 수 없는지를
              구분하는 데 초점을 둡니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">
              운영자에 대하여
            </h2>
            <p className="mt-3">
              운영자는 재조합 단백질 의약품, 특히 재조합 혈액응고 제8인자
              베록토코그 알파(beroctocog alfa)의 공정 개발을 이끈 경험과
              관련 특허를 가지고 있습니다. Immunecube는 이러한 경험을
              바탕으로 생명과학 논문을 해석하고, 실제로 구현된 생물학적
              시스템의 관점에서 면역학을 이해하려는 개인 지식 아카이브입니다.
            </p>
            <p className="mt-3">
              오류가 없도록 주의하지만, 오래된 문헌이나 빠르게 바뀌는 주제는
              해석이 달라질 수 있습니다. 잘못된 내용, 부정확한 표현, 더 좋은
              참고문헌이 있다면 알려 주세요.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">
              의학적 고지
            </h2>
            <p className="mt-3">
              Immunecube의 글은 교육과 해설을 위한 자료이며, 개인의 의학적
              진단이나 치료를 대신하지 않습니다. 질병, 약물, 검사, 치료 결정은
              담당 의료진과 상의해야 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">
              의견과 오류 제보
            </h2>
            <p className="mt-3">
              현재 별도의 댓글이나 게시판은 운영하지 않습니다. 글에 대한 오류
              제보, 보완 의견, 주제 제안은 네이버 블로그를 통해 남겨 주세요.
              모든 의견에 바로 답하지는 못하지만, 중요한 오류와 보완할 내용은
              가능한 한 확인해 반영하겠습니다.
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            문서 읽기
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
