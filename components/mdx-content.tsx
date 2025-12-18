// components/mdx-content.tsx
import * as runtime from "react/jsx-runtime";
import type React from "react";

const sharedComponents = {};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default as React.ComponentType<any>;
};

type MdxMeta = {
  date?: string;     // "YYYY-MM-DD"
  updated?: string;  // "YYYY-MM-DD"
  showPublished?: boolean; // 기본 false 권장
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType<any>>;
  meta?: MdxMeta;
}

function MetaLine({ meta }: { meta: MdxMeta }) {
  const { date, updated, showPublished = false } = meta;

  if (!date && !updated) return null;

  const parts: string[] = [];
  if (showPublished && date) parts.push(`발행: ${date}`);
  if (updated) parts.push(`최종 업데이트: ${updated}`);

  if (!parts.length) return null;

  return (
    <p className="mt-2 text-sm text-muted-foreground">
      {parts.join(" · ")}
    </p>
  );
}

export const MDXContent = ({ code, components = {}, meta }: MDXProps) => {
  const Component = useMDXComponent(code);

  return (
    <>
      {meta ? <MetaLine meta={meta} /> : null}
      <Component components={{ ...sharedComponents, ...components }} />
    </>
  );
};
