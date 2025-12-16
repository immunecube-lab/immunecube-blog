// app/layout.tsx
import localFont from "next/font/local";
import type { Metadata } from "next";
import React from "react";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"; // ✅ 추가

import "./globals.css";
import { GlobalTopNav } from "../GlobalTopNav";

const pretendard = localFont({
  src: [
    { path: "../public/fonts/Pretendard-Regular.subset.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Pretendard-Bold.subset.woff2", weight: "700", style: "normal" },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <GlobalTopNav />
        {children}

        {/* ✅ 방문자 추적용 (body 맨 아래가 가장 안전) */}
        <Analytics />
      </body>
    </html>
  );
}
