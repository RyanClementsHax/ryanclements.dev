import Head from 'next/head'
import { Hero } from 'components/pages/landing/Hero'
import { Qualities } from 'components/pages/landing/Qualities'
import {
  CubeIcon,
  PresentationChartLineIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import graphic from 'public/graphic.jpg'

const Index: React.FC = () => (
  <>
    <Head>
      <title>Ryan Clements</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Hero
      title={"Hiya 👋\nI'm Ryan Clements"}
      subtitle={
        'I 💖 God, my wife and daughter 👨‍👩‍👧, and making dope software 👨‍💻'
      }
    />
    <Qualities
      title="A new kind of engineer"
      subtitle="New problems need new solutions. Here's the energy I bring to the table."
      graphicSrc={graphic}
    >
      <Qualities.Description
        Icon={<UserGroupIcon />}
        title="People first"
        description="I see people as beloved by God and worth going the extra mile for. At work, I always try to help my coworkers and solve real problems for users."
      />
      <Qualities.Description
        Icon={<CubeIcon />}
        title="Modern"
        description="Up to date with the latest trends in industry, I synthesize custom solutions using the best of what modern software engineering has available to us."
      />
      <Qualities.Description
        Icon={<PresentationChartLineIcon />}
        title="Always improving"
        description="“Whether you think you can, or you think you can't - you're right” - Henry Ford. I seek to always be improving in all areas of my life, at home and work, on soft and hard skills."
      />
    </Qualities>
  </>
)

export default Index
