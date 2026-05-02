"use client";

import { Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type PagefindWindow = Window & {
  PagefindUI?: new (options: {
    element: string;
    baseUrl?: string;
    showImages?: boolean;
    showSubResults?: boolean;
    processResult?: (result: PagefindSearchResult) => PagefindSearchResult;
    translations?: Record<string, string>;
  }) => unknown;
};

type PagefindSearchResult = {
  url?: string;
  meta?: Record<string, string | undefined>;
  sub_results?: Array<Record<string, unknown> & { url?: string }>;
  [key: string]: unknown;
};

const PAGEFIND_CSS_ID = "pagefind-ui-css";
const PAGEFIND_SCRIPT_ID = "pagefind-ui-script";

function normalizePagefindUrl(url: string | undefined) {
  if (!url) return url;

  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.origin !== window.location.origin) return url;

    parsed.pathname = parsed.pathname
      .replace(/\/index\.html$/, "/")
      .replace(/\.html$/, "");

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return url.replace(/\/index\.html(?=([?#]|$))/, "/").replace(/\.html(?=([?#]|$))/, "");
  }
}

function normalizePagefindResult(result: PagefindSearchResult) {
  const meta = result.meta
    ? { ...result.meta, url: normalizePagefindUrl(result.meta.url) }
    : result.meta;

  const subResults = result.sub_results?.map((subResult) => ({
    ...subResult,
    url: normalizePagefindUrl(subResult.url),
  }));

  return {
    ...result,
    url: normalizePagefindUrl(result.url),
    meta,
    sub_results: subResults,
  };
}

function loadPagefindUi() {
  const win = window as PagefindWindow;

  if (!document.getElementById(PAGEFIND_CSS_ID)) {
    const link = document.createElement("link");
    link.id = PAGEFIND_CSS_ID;
    link.rel = "stylesheet";
    link.href = "/_pagefind/pagefind-ui.css";
    document.head.appendChild(link);
  }

  if (win.PagefindUI) return Promise.resolve();

  const existing = document.getElementById(PAGEFIND_SCRIPT_ID) as
    | HTMLScriptElement
    | null;

  if (existing) {
    return new Promise<void>((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(), { once: true });
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = PAGEFIND_SCRIPT_ID;
    script.src = "/_pagefind/pagefind-ui.js";
    script.async = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(), { once: true });
    document.body.appendChild(script);
  });
}

export function PagefindSearch() {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const searchId = useId().replace(/:/g, "");
  const initialized = useRef(false);

  useEffect(() => {
    if (!open || initialized.current) return;

    let alive = true;
    loadPagefindUi()
      .then(() => {
        if (!alive) return;
        const win = window as PagefindWindow;
        if (!win.PagefindUI) throw new Error("Pagefind UI was not loaded.");

        new win.PagefindUI({
          element: `#${searchId}`,
          baseUrl: "/",
          showImages: false,
          showSubResults: true,
          processResult: normalizePagefindResult,
          translations: {
            placeholder: "검색어를 입력하세요",
            clear_search: "검색어 지우기",
            load_more: "더 보기",
            search_label: "사이트 검색",
            zero_results: "검색 결과가 없습니다.",
            many_results: "[COUNT]개의 결과",
            one_result: "[COUNT]개의 결과",
            searching: "검색 중...",
          },
        });

        initialized.current = true;
      })
      .catch(() => {
        if (alive) setFailed(true);
      });

    return () => {
      alive = false;
    };
  }, [open, searchId]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
        aria-label="사이트 검색 열기"
        title="검색"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">검색</span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 bg-black/35 px-4 py-6 sm:py-20"
          role="dialog"
          aria-modal="true"
          aria-label="사이트 검색"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="mx-auto flex max-h-[calc(100dvh-3rem)] max-w-2xl flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 shadow-xl dark:border-neutral-800 dark:bg-neutral-950 sm:max-h-[calc(100dvh-10rem)]">
            <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
              <h2 className="text-base font-semibold">사이트 검색</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                aria-label="검색 닫기"
                title="닫기"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div
              id={searchId}
              className="pagefind-search-root min-h-0 flex-1 overflow-y-auto pr-1"
            />

            {failed ? (
              <p className="mt-3 shrink-0 text-sm text-red-600">
                검색 인덱스를 불러오지 못했습니다. 배포가 끝난 뒤 다시 시도해 주세요.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
