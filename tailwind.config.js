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
        // 일반 본문용
        sans: [
          "Freesentation",          // 1순위: 웹폰트(또는 설치 폰트)
          "-apple-system",          // macOS / iOS
          "BlinkMacSystemFont",     // macOS Chrome
          "Apple SD Gothic Neo",    // 한글 macOS / iOS
          "Noto Sans KR",           // 한글 안드로이드 / 크롬OS / 웹폰트
          "Segoe UI",               // Windows 기본 UI
          "Roboto",                 // 일부 안드로이드/크롬
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // 제목·헤딩용
        heading: [
          "Montserrat",             // 영문 헤딩
          "Freesentation",          // 영문+한글 공통 톤
          "-apple-system",
          "BlinkMacSystemFont",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Segoe UI",
          "sans-serif",
        ],
      },

      // Tailwind Typography 커스터마이즈
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme("fontFamily.sans").join(", "),
            color: "var(--foreground)",

            // 본문 기본
            fontSize: "0.95rem",
            lineHeight: "1.7",

            // 링크
            a: {
              color: "inherit",
              textDecoration: "underline",
              fontWeight: "500",
            },

            // 헤딩 공통
            "h1,h2,h3,h4": {
              fontFamily: theme("fontFamily.heading").join(", "),
              fontWeight: "700",
              letterSpacing: "-0.02em",
            },

            // 한국 기준 약간 줄인 헤딩 스케일
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
              color: "#60a5fa",   // ✔ Tailwind blue-400 (더 밝은 하늘색)
            },
            h4: {
              fontSize: "1.05rem",
              lineHeight: "1.6",
            },

            // 문단
            p: {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },

            // 리스트
            "ul,ol": {
              paddingLeft: "1.3rem",
              marginTop: "0.4rem",
              marginBottom: "0.4rem",
            },
            li: {
              marginTop: "0.1rem",
              marginBottom: "0.1rem",
            },

            // 인용구
            blockquote: {
              fontStyle: "normal",
              borderLeftWidth: "3px",
              borderLeftColor: theme("colors.slate.300"),
              paddingLeft: "0.9rem",
              color: theme("colors.slate.700"),
            },

            // 코드
            code: {
              fontSize: "0.9em",
              padding: "0.15rem 0.3rem",
              borderRadius: "0.25rem",
              backgroundColor: theme("colors.slate.100"),
            },

            // pre 코드 블록
            pre: {
              fontSize: "0.85rem",
              lineHeight: "1.5",
              borderRadius: "0.5rem",
              padding: "0.9rem 1rem",
            },
          },
        },

        // 글 전체를 조금 더 줄인 버전 (prose-sm 쓸 때)
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
}
