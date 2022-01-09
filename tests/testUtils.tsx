import { render, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'components/theme'
import { Story } from '@storybook/react'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender: typeof render = ((ui: any, options: any) =>
  render(ui, { wrapper: Providers, ...options })) as unknown as typeof render

export * from '@testing-library/react'

export { customRender as render }

export const renderStory = <TArgs,>(
  Story: Story<TArgs>,
  props?: Partial<TArgs>
): RenderResult => customRender(<Story {...(Story.args as TArgs)} {...props} />)
