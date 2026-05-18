// app/docs/layout.tsx
import React from "react";

import "../../theme.config";
import "nextra-theme-docs/style.css";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
