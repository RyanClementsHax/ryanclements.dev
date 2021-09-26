import React from 'react'
import { render } from '@testing-library/react'

const Providers: React.FC = ({ children }) => <>{children}</>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender: typeof render = ((ui: any, options: any) =>
  render(ui, { wrapper: Providers, ...options })) as unknown as typeof render

export * from '@testing-library/react'

export { customRender as render }
