/* eslint-disable no-console */
import { ThemeProvider } from 'components/theme'

import type { AppProps } from 'next/app'

import 'styles/global.scss'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    console.log('Ryan Clements')
    console.log(
      'Full Time Catholic | Full Time Father | Full Stack Engineer | Massive Nerd'
    )
    console.log("You're a curious one I see ;)")
  }, [])

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
