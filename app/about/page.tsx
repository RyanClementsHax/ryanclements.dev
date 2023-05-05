import { About } from 'components/pages/about'

export const metadata = {
  title: 'About Ryan Clements',
  description: 'Learn a little bit about who Ryan is',
  openGraph: {
    url: 'about'
  }
}

export default function AboutPage(): JSX.Element {
  return <About />
}
