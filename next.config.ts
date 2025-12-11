// next.config.ts
import type { NextConfig } from 'next'
import nextra from 'nextra'

const isDev = process.argv.includes('dev')
const isBuild = process.argv.includes('build')

// Velite: dev / build 시 자동 실행
const buildVelite = async () => {
  if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
    process.env.VELITE_STARTED = '1'
    const { build } = await import('velite')
    await build({ watch: isDev, clean: !isDev })
  }
}

void buildVelite().catch(console.error)

// Nextra 4: theme / themeConfig 는 제거되었으므로 빈 설정 객체만 넘깁니다.
const withNextra = nextra({})

const nextConfig: NextConfig = {
  // Next 16용 Turbopack 설정
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.tsx',
    },
  },
}

export default withNextra(nextConfig)
