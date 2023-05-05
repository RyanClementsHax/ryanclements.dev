import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from 'components/theme'

export * from '@testing-library/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const render = function (ui: React.ReactElement, options: any) {
  return rtlRender(ui, {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    ...options
  })
} as unknown as typeof rtlRender
