import Head from 'next/head'
import { Qualities } from './sections/Qualities'
import { Skills } from './sections/Skills'
import { Layout } from 'components/Layout'
import { Hero } from './sections/Hero'
import { aboutImageData, qualitiesImageData } from 'lib/content/images'
import { qualities } from 'lib/content/qualities'
import { skillGroups } from 'lib/content/skills'

export const About: React.FC = () => (
  <Layout>
    <Head>
      <title>Ryan Clements</title>
    </Head>
    <Hero
      title="A little bit about Ryan Clements..."
      subtitle={
        <>
          I&apos;m a Catholic ✝️ who lives in Florida 🦩🌴 with his wife and
          daughter 👨‍👩‍👧 where I work on my craft as a software engineer 👨‍💻.
        </>
      }
      bannerSrc={aboutImageData}
    />
    <Qualities
      title="A new kind of engineer"
      subtitle="New problems need new solutions. Here's the energy I bring to the table."
      graphicSrc={qualitiesImageData}
      qualities={qualities}
    />
    <Skills
      title="A lifelong learner"
      subtitle="Here is the tech I know and love"
      groups={skillGroups}
    />
  </Layout>
)
