// next.config.ts
import type { NextConfig } from 'next'
import nextra from 'nextra'

// Nextra 4: theme / themeConfig 는 제거되었으므로 빈 설정 객체만 넘깁니다.
const withNextra = nextra({})

const nextConfig: NextConfig = {
  output: "export",
  // Next 16용 Turbopack 설정
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.tsx',
    },
  },
}

export default withNextra(nextConfig)
