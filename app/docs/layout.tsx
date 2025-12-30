// app/docs/layout.tsx
import React from "react";
import { Layout } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";

import "../../theme.config";
import "nextra-theme-docs/style.css";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageMap = await getPageMap();

  return (
    <Layout pageMap={pageMap}>
      {children}
    </Layout>
  );
}
