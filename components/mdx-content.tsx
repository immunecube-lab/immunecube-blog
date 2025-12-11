// components/mdx-content.tsx
import * as runtime from 'react/jsx-runtime'

const sharedComponents = {}

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default as React.ComponentType<any>
}

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType<any>>
}

export const MDXContent = ({ code, components = {} }: MDXProps) => {
  const Component = useMDXComponent(code)
  return (
    <Component components={{ ...sharedComponents, ...components }} />
  )
}
