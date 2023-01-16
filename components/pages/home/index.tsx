import Head from 'next/head'
import { Hero } from './sections/Hero'
import { projects, heroBannerSrcMap } from 'lib/content'
import { Projects } from './sections/Projects'
import { Layout } from 'components/Layout'
import { RecentlyPublished } from './sections/RecentlyPublished'
import { RenderablePostSummary } from 'lib/posts'

export interface HomeProps {
  recentPostSummaries: RenderablePostSummary[]
}

export const Home: React.FC<HomeProps> = ({ recentPostSummaries }) => (
  <Layout>
    <Head>
      <title>Ryan Clements</title>
    </Head>
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
      bannerSrcMap={heroBannerSrcMap}
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
