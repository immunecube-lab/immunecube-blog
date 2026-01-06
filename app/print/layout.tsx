// app/print/layout.tsx
export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return <div className="print-mode">{children}</div>;
}
