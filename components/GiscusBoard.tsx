'use client';

import Giscus from '@giscus/react';

export function GiscusBoard() {
  return (
    <div className="w-full rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
      <Giscus
        id="qna-giscus"
        repo="immunecube-lab/immunecube-blog"
        repoId=""
        category="General"
        categoryId=""
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
