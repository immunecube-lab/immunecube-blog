import type { Metadata } from 'next';
import { GiscusBoard } from '@/components/GiscusBoard';

export const metadata: Metadata = {
  title: '질문 게시판 | Immunecube',
  description:
    '면역학, 의학사, 대사 및 건강 정보에 관한 궁금한 점이나 의견을 나누는 질문 게시판입니다.',
  alternates: {
    canonical: '/qna',
  },
};

export default function QnaPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-12 sm:px-6 sm:py-20 text-neutral-900">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* 헤더 안내 영역 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
              Q&A BOARD
            </span>
            <span className="text-xs text-neutral-400">자유 질문 & 토론</span>
          </div>

          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            질문 게시판
          </h1>

          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            면역학, 의학사, 관련 연구 논문이나 게시물에 대해 궁금하신 점, 보완 의견, 자유로운 질문을 남겨주세요.
            운영진이 확인하는 대로 답변을 작성해 드립니다.
          </p>

          <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs text-emerald-900 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-emerald-800">
              <span>💡 이용 안내</span>
            </div>
            <p>• GitHub 계정으로 간단히 로그인하여 질문을 작성하실 수 있습니다.</p>
            <p>• 질문 등록 및 답변 작성 시 작성자에게 실시간 이메일 알림이 전송됩니다.</p>
            <p>• 스팸 봇 예방 및 쾌적한 토론을 위해 관리 조치가 적용됩니다.</p>
          </div>
        </div>

        {/* Giscus 게시판 */}
        <GiscusBoard />
      </div>
    </main>
  );
}
