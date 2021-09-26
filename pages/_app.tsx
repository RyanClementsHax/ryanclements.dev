import { UserProvider } from '@auth0/nextjs-auth0'
import SSRProvider from 'react-bootstrap/SSRProvider'
import type { AppProps } from 'next/app'

import 'styles/global.scss'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SSRProvider>
      <UserProvider user={pageProps.user}>
        <Component {...pageProps} />
      </UserProvider>
    </SSRProvider>
  )
}
