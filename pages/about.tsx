import { About } from 'components/pages/about'
import { PageSeo } from 'components/PageSeo'
import { NextPage } from 'next'

const AboutPage: NextPage = () => (
  <>
    <PageSeo
      title="About Ryan Clements"
      description="Learn a little bit about who Ryan is"
    />
    <About />
  </>
)

export default AboutPage
