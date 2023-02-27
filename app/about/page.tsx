import { About } from 'components/pages/about'
import { SITE_URL } from 'lib/constants'

export const metadata = {
  title: 'About Ryan Clements',
  description: 'Learn a little bit about who Ryan is',
  openGraph: {
    url: `${SITE_URL}/about`
  }
}

export default function AboutPage(): JSX.Element {
  return <About />
}
