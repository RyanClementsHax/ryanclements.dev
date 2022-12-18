import Head from 'next/head'
import { Hero } from 'components/pages/landing/sections/Hero'
import { Qualities } from 'components/pages/landing/sections/Qualities'
import { Skills } from 'components/pages/landing/sections/Skills'
import { skillGroups } from 'lib/skills'
import { Projects } from 'components/pages/landing/sections/Projects'
import { projects } from 'lib/projects'
import { qualities } from 'lib/qualities'
import { heroBannerSrcMap, qualitiesImageData } from 'lib/images'

const Index: React.FC = () => (
  <>
    <Head>
      <title>Ryan Clements</title>
      <link rel="icon" href="/favicon.ico" />
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
  </>
)

export default Index
