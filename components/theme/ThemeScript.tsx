import { Theme, themeToContentMetaMap } from './types'
import { initTheme } from './utils'

// I would love to use next/script, but it doesn't block rendering which this needs https://nextjs.org/docs/api-reference/next/script#beforeinteractive
export const ThemeScript: React.FC = () => (
  <script
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: stringifyFunctionCall(initTheme, Theme, themeToContentMetaMap)
    }}
  />
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringifyFunctionCall = <T extends (...params: any) => unknown>(
  func: T,
  ...params: Parameters<T>
) => `(${func})(${params.map((x: unknown) => JSON.stringify(x)).join(',')})`
