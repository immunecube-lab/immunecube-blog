// components/mdx-content.tsx
import * as runtime from "react/jsx-runtime";
import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import { Figure } from "@/components/mdx/Figure";
import { Paper } from "@/components/mdx/Paper";

// ✅ 커스텀 MDX 컴포넌트만 직접 import (Nextra 테마 훅 import 금지)
import { Series } from "@/components/mdx/Series";
import { KeyPoint } from "@/components/mdx/KeyPoint";
import { Concept } from "@/components/mdx/Concept";
import { PaperLite } from "@/components/mdx/PaperLite";

const sharedComponents: MDXComponents = {
  Series,
  KeyPoint,
  Concept,
  Figure,
  Paper,
  PaperLite,
};

// Velite가 만들어 준 function-body 문자열을 React 컴포넌트로 변환
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default as ComponentType<any>;
};

interface MDXProps {
  code: string;
  components?: MDXComponents;
}

export function MDXContent({ code, components = {} }: MDXProps) {
  const Component = useMDXComponent(code);

  // ✅ Velite 경로에서는 "sharedComponents + page components"만 병합
  return <Component components={{ ...sharedComponents, ...components }} />;
}
