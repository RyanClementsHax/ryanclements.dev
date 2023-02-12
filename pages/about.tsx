import { About } from 'components/pages/about'
import { NextSeo } from 'next-seo'
import { NextPage } from 'next'

const AboutPage: NextPage = () => (
  <>
    <NextSeo
      title="About Ryan Clements"
      description="Learn a little bit about who Ryan is"
    />
    <About />
  </>
)

export default AboutPage
