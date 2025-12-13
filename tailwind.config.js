/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./mdx-components.{js,ts,jsx,tsx}",
    "./.velite/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        /**
         * 본문 기본 폰트
         * - app/layout.tsx에서 localFont로 주입한 Pretendard
         * - var(--font-sans)가 1순위
         */
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],

        /**
         * 헤딩용 폰트
         * - 기본은 본문과 동일하게 Pretendard
         * - 필요하면 Montserrat을 맨 뒤에서 선택적으로 사용
         */
        heading: [
          "var(--font-sans)",
          "Montserrat",
          "-apple-system",
          "BlinkMacSystemFont",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Segoe UI",
          "sans-serif",
        ],

        /**
         * 코드용 폰트
         * - layout.tsx에서 Geist Mono 주입
         */
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },

      /**
       * Tailwind Typography (prose) 커스터마이즈
       */
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme("fontFamily.sans").join(", "),
            color: "var(--foreground)",

            /* 본문 기본 */
            fontSize: "0.95rem",
            lineHeight: "1.8",

            /* 링크 */
            a: {
              color: "inherit",
              textDecoration: "underline",
              fontWeight: "500",
            },

            /* 헤딩 공통 */
            "h1,h2,h3,h4": {
              fontFamily: theme("fontFamily.heading").join(", "),
              fontWeight: "700",
              letterSpacing: "-0.02em",
            },

            /* 한국어 본문에 맞춘 헤딩 스케일 */
            h1: {
              fontSize: "1.8rem",
              lineHeight: "1.4",
              marginBottom: "1.1rem",
            },
            h2: {
              fontSize: "1.4rem",
              lineHeight: "1.5",
              marginTop: "1.7rem",
              marginBottom: "0.9rem",
              color: "#3b82f6",
            },
            h3: {
              fontSize: "1.2rem",
              lineHeight: "1.6",
              marginTop: "1.5rem",
              marginBottom: "0.7rem",
              color: "#60a5fa",
            },
            h4: {
              fontSize: "1.05rem",
              lineHeight: "1.6",
            },

            /* 문단 */
            p: {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },

            /* 리스트 */
            "ul,ol": {
              paddingLeft: "1.3rem",
              marginTop: "0.4rem",
              marginBottom: "0.4rem",
            },
            li: {
              marginTop: "0.1rem",
              marginBottom: "0.1rem",
            },

            /* 인용 */
            blockquote: {
              marginLeft: "0",
              fontStyle: "normal", // 이탤릭 제거
              fontSize: "0.95em", // 본문보다 살짝 작게
              lineHeight: "1.75",
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              paddingLeft: "1rem",
              borderLeftWidth: "2px",
              borderLeftColor: theme("colors.slate.300"),
              color: theme("colors.slate.700"),
              backgroundColor: "transparent",
            },

            /* 인라인 코드 */
            code: {
              fontFamily: theme("fontFamily.mono").join(", "),
              fontSize: "0.9em",
              padding: "0.15rem 0.3rem",
              borderRadius: "0.25rem",
              backgroundColor: theme("colors.slate.100"),
            },

            /* 코드 블록 */
            pre: {
              fontFamily: theme("fontFamily.mono").join(", "),
              fontSize: "0.85rem",
              lineHeight: "1.5",
              borderRadius: "0.5rem",
              padding: "0.9rem 1rem",
            },
          },
        },

        /* prose-sm */
        sm: {
          css: {
            fontSize: "0.9rem",
            h1: { fontSize: "1.6rem" },
            h2: { fontSize: "1.3rem" },
            h3: { fontSize: "1.1rem" },
          },
        },
      }),
    },
  },
};
