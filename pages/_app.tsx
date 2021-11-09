import { ThemeProvider } from 'components/theme'
import { Layout } from 'components/Layout'

import type { AppProps } from 'next/app'

import 'styles/global.scss'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
