// app/layout.tsx
import type { Metadata } from "next";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Layout, Navbar, Footer } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";

import "../theme.config"; // 타입 때문에 한 번 불러두기 (필수는 아님)
import themeConfig from "../theme.config"; // 우리가 만든 config
import "nextra-theme-docs/style.css"; // ✅ Nextra Docs 스타일
import "./globals.css";                // 기존 글로벌 스타일

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "immunecube",
  description: "immunecube docs",
};

// ✅ Nextra 4에서는 layout이 Layout 컴포넌트를 감싸는 구조가 됩니다.
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageMap = await getPageMap();

  return (
    // ✔ 한국어 사이트이므로 lang="ko" 로 변경 (선택이지만 권장)
    <html lang="ko" suppressHydrationWarning>
      <body
        className={
          // ✔ 기존 Geist 변수 + 안티앨리어싱 유지
          // ✔ 여기에 Tailwind의 font-sans + 배경/글자색을 추가
         
        `${geistSans.variable} ${geistMono.variable} antialiased font-sans` }
      >
        <Layout
          navbar={
            <Navbar
              logo={themeConfig.logo}
              projectLink={themeConfig.project.link}
            />
          }
          footer={<Footer>{themeConfig.footer.text}</Footer>}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
