// app/layout.tsx
import localFont from "next/font/local";
import type { Metadata } from "next";
import React from "react";
import { Geist_Mono } from "next/font/google";
import { Layout, Footer } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";

import "../theme.config";
import themeConfig from "../theme.config";
import "nextra-theme-docs/style.css";
import "./globals.css";

import { GlobalTopNav } from "../GlobalTopNav";

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

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "immunecube",
  description: "immunecube docs",
};

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
          <div key="global-top-nav">
             <GlobalTopNav />
          </div>
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
