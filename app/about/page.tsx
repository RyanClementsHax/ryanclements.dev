import { About } from 'components/pages/about'
import { SITE_URL } from 'lib/constants'

export const metadata = {
  title: 'About Ryan Clements',
  description: 'Learn a little bit about who Ryan is',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    url: 'about'
  }
}

export default function AboutPage(): React.JSX.Element {
  return <About />
}
