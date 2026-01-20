// app/layout.tsx
import localFont from "next/font/local";
import type { Metadata } from "next";
import React from "react";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { GlobalTopNav } from "../GlobalTopNav";
import { SiteFooter } from "@/components/SiteFooter";

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
  metadataBase: new URL("https://datacube.immunecube.com"), // ✅ 추가
  title: "immunecube",
  description: "immunecube docs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`
          ${pretendard.variable}
          ${geistMono.variable}
          antialiased
          font-sans
        `}
      >
        <GlobalTopNav />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}