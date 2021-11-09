import 'styles/global.scss'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'components/theme'
import { Layout } from 'components/Layout'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
