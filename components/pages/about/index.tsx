import { Qualities } from './sections/Qualities'
import { Skills } from './sections/Skills'
import { Layout } from 'components/Layout'
import { Hero } from './sections/Hero'
import { qualities } from 'lib/content/qualities'
import { skillGroups } from 'lib/content/skills'
import qualitiesPicture from 'public/qualities-picture.jpg'
import aboutPicture from 'public/about-picture.jpg'

export const About: React.FC = () => (
  <Layout>
    <Hero
      title="A little bit about Ryan Clements..."
      subtitle={
        <>
          I&apos;m a Catholic ✝️ who lives in Florida 🦩🌴 with his wife and
          daughter 👨‍👩‍👧 where I work on my craft as a software engineer 👨‍💻.
        </>
      }
      bannerSrc={{
        ...aboutPicture,
        alt: 'My family and I at a harvest festival'
      }}
    />
    <Qualities
      title="A new kind of engineer"
      subtitle="New problems need new solutions. Here's the energy I bring to the table."
      graphicSrc={{
        ...qualitiesPicture,
        alt: 'Me and my daughter coding'
      }}
      qualities={qualities}
    />
    <Skills
      title="A lifelong learner"
      subtitle="Here is the tech I know and love"
      groups={skillGroups}
    />
  </Layout>
)
