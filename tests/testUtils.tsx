import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'components/Theme'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender: typeof render = ((ui: any, options: any) =>
  render(ui, { wrapper: Providers, ...options })) as unknown as typeof render

export * from '@testing-library/react'

export { customRender as render }
