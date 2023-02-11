import { ThemeProvider } from 'components/theme'

import type { AppProps } from 'next/app'

import 'styles/global.scss'
import { log } from 'lib/utils/logs'
import { useEffect } from 'react'
import { AppSeo } from 'components/AppSeo'
import { fontClass } from 'lib/fonts'

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
      <AppSeo />
      <div className={fontClass}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}
