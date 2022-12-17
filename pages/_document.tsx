import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ThemeMeta, ThemeScript } from 'components/theme'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <ThemeMeta />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ThemeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
