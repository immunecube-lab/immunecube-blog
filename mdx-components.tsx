// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'

// Nextra Docs 테마의 기본 MDX 컴포넌트 세트
const themeComponents = getThemeComponents()

// Nextra + 커스텀 컴포넌트 병합용 훅
export function useMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  return {
    ...themeComponents,
    ...components,
  }
}
