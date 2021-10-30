import 'styles/global.scss'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'components/theme'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
