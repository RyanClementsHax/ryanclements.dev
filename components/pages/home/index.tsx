import Head from 'next/head'
import { Hero } from './sections/Hero'
import { Qualities } from './sections/Qualities'
import { Skills } from './sections/Skills'
import {
  skillGroups,
  projects,
  qualities,
  heroBannerSrcMap,
  qualitiesImageData
} from 'lib/content'
import { Projects } from './sections/Projects'
import { Layout } from './Layout'

export const Home: React.FC = () => (
  <Layout>
    <Head>
      <title>Ryan Clements</title>
    </Head>
    <Hero
      title={
        <>
          {'Hiya! 👋'}
          <br />
          {"I'm Ryan Clements"}
        </>
      }
      subtitle={
        <>
          I 💖 God, my wife and daughter&nbsp;👨‍👩‍👧, and making dope
          software&nbsp;👨‍💻
        </>
      }
      bannerSrcMap={heroBannerSrcMap}
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
    <Projects
      title="One Giant Nerd"
      subtitle="I love what I do. Here are some projects I like to work on."
      projects={projects}
    />
  </Layout>
)
