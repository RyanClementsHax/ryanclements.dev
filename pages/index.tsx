import Head from 'next/head'
import { Hero } from 'components/pages/landing/Hero'
import { Qualities } from 'components/pages/landing/Qualities'
import { QualityDescription } from 'components/pages/landing/Qualities/QualityDescription'
import {
  CubeIcon,
  PresentationChartLineIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import graphic from 'public/graphic.jpg'

export const Index: React.FC = () => (
  <>
    <Head>
      <title>Ryan Clements</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Hero />

    <Qualities
      title="A new kind of engineer"
      subtitle="New problems need new solutions. Here's the energy I bring to the table."
      graphicSrc={graphic}
    >
      <QualityDescription
        Icon={<UserGroupIcon />}
        title="test"
        description="testing"
      />
      <QualityDescription
        Icon={<CubeIcon />}
        title="test"
        description="testing"
      />
      <QualityDescription
        Icon={<PresentationChartLineIcon />}
        title="test"
        description="testing"
      />
    </Qualities>
  </>
)

export default Index
