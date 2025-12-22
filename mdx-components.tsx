// mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";

// ✅ 커스텀 MDX 컴포넌트 import
import { Series } from "@/components/mdx/Series";
import { KeyPoint } from "@/components/mdx/KeyPoint";
import { Concept } from "@/components/mdx/Concept";

// ✅ 여기! 실제 파일 위치가 mdx/RelatedPosts.tsx 라면 이게 정답입니다.
import RelatedPosts from "@/components/mdx/RelatedPosts";

const themeComponents = getThemeComponents();

export function useMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  return {
    ...themeComponents,
    ...components,
    Series,
    KeyPoint,
    Concept,
    RelatedPosts,
  };
}
