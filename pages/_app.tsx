import { ThemeProvider } from 'components/theme'

import type { AppProps } from 'next/app'

import 'styles/global.scss'
import { useEffect } from 'react'
import { log } from 'lib/utils'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    log.log('Ryan Clements')
    log.log(
      'Full Time Catholic | Full Time Father | Full Stack Engineer | Massive Nerd'
    )
    log.log("You're a curious one I see ;)")
  }, [])

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
