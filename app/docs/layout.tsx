// app/docs/layout.tsx
import React from "react";
import { Layout, Footer } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";

import "../../theme.config";
import themeConfig from "../../theme.config";
import "nextra-theme-docs/style.css";

import { GlobalTopNav } from "../../GlobalTopNav";

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap();

  return (
    <Layout
      footer={<Footer>{themeConfig.footer.text}</Footer>}
      pageMap={pageMap}
    >
      {children}
    </Layout>
  );
}
