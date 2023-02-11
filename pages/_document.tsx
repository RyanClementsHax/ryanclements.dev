import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ThemeMeta, ThemeScript } from 'components/theme'
import { RssHeadLinks } from 'components/RssHeadLinks'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <ThemeMeta />
          <link rel="icon" href="/favicon.ico" />
          <RssHeadLinks />
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
