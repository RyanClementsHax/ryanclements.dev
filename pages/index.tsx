import Head from 'next/head'
import { Hero } from 'components/pages/landing/Hero'

export const Index: React.FC = () => (
  <>
    <Head>
      <title>Ryan Clements</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Hero />
  </>
)

export default Index
