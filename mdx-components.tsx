// mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";

// ✅ 커스텀 MDX 컴포넌트 import
import { Series } from "@/components/mdx/Series";
import { KeyPoint } from "@/components/mdx/KeyPoint";
import { Concept } from "@/components/mdx/Concept";

// Nextra Docs 테마의 기본 MDX 컴포넌트 세트
const themeComponents = getThemeComponents();

// Nextra + 커스텀 컴포넌트 병합용 훅
export function useMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  return {
    ...themeComponents,
    ...components,

    // ✅ 여기서 MDX 태그 이름과 컴포넌트 매핑
    Series,
    KeyPoint,
    Concept,
  };
}
