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
import RelatedPosts from "@/components/mdx/RelatedPosts";
import { FigureGroup } from "@/components/mdx/FigureGroup";
import { References, Reference } from "@/components/mdx/References";

const sharedComponents: MDXComponents = {
  Series,
  KeyPoint,
  Concept,
  Figure,
  Paper,
  PaperLite,
  RelatedPosts, // ✅ 반드시 포함
  FigureGroup,

  // ✅ 전역 레퍼런스 컴포넌트 등록
  References,
  Reference,
};

interface MDXProps {
  code: string;
  components?: MDXComponents;
}

// Velite가 만들어 준 function-body 문자열을 React 컴포넌트로 변환
const compileMDX = (code: string, components: MDXComponents) => {
  const fn = new Function(code);

  // ✅ 핵심: 컴파일된 MDX 코드가 components를 "실행 시점"에 필요로 하는 경우가 있어 주입합니다.
  const mod = fn({ ...runtime, components }) as { default: ComponentType<any> };

  if (!mod?.default) {
    throw new Error("MDX compile error: default export not found.");
  }

  return mod.default;
};

export function MDXContent({ code, components = {} }: MDXProps) {
  // ✅ shared + page components 병합
  const mergedComponents: MDXComponents = { ...sharedComponents, ...components };

  // ✅ 컴파일 시점에도 components 주입
  const Component = compileMDX(code, mergedComponents);

  // ✅ 렌더링 시점에도 components 전달 (안전)
  return <Component components={mergedComponents} />;
}
