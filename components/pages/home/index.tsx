import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Layout } from 'components/Layout'
import { RecentlyPublished } from './sections/RecentlyPublished'
import { RenderablePostSummary } from 'lib/pages/posts'
import { projects } from 'lib/content/projects'
import heroBannerLight from 'public/office-light.svg'
import heroBannerDark from 'public/office-dark.svg'
import { Theme } from 'components/theme'

export interface HomeProps {
  recentPostSummaries: RenderablePostSummary[]
}

export const Home: React.FC<HomeProps> = ({ recentPostSummaries }) => (
  <Layout>
    <Hero
      title={
        <>
          {'Hiya! 👋'}
          <br />
          {"I'm Ryan"}
        </>
      }
      subtitle={
        <>
          I 💖 God, my wife and daughter&nbsp;👨‍👩‍👧, and making dope
          software&nbsp;👨‍💻
        </>
      }
      bannerSrcMap={{
        [Theme.light]: {
          ...heroBannerLight,
          alt: 'Me coding in my office with my wife reading a book to our daughter'
        },
        [Theme.dark]: {
          ...heroBannerDark,
          alt: 'Me in my office coding'
        }
      }}
    />
    <RecentlyPublished
      title="Recently published posts"
      subtitle="Just my thoughts on software engineering"
      postSummaries={recentPostSummaries}
    />
    <Projects
      title="Nerd work"
      subtitle="I love what I do. Here are some projects I like to work on."
      projects={projects}
    />
  </Layout>
)
