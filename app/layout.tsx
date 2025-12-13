// app/layout.tsx
import localFont from "next/font/local";
import type { Metadata } from "next";
import React from "react";
import { Geist_Mono } from "next/font/google";
import { Layout, Navbar, Footer } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";

import "../theme.config";                 // 타입 때문에 한 번 불러두기
import themeConfig from "../theme.config";
import "nextra-theme-docs/style.css";     // Nextra Docs 스타일
import "./globals.css";                   // 글로벌 스타일

// ✅ Pretendard (본문 기본 폰트)
const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

// ✅ 코드용 폰트는 Geist Mono만 유지
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "immunecube",
  description: "immunecube docs",
};

// ✅ Nextra 4 Root Layout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageMap = await getPageMap();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`
          ${pretendard.variable}
          ${geistMono.variable}
          antialiased
          font-sans
        `}
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
