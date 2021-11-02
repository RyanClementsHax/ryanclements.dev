import Head from 'next/head'
import { Layout } from 'components/landing/Layout'
import { Hero } from 'components/hero/Hero'

export const Index: React.FC = () => (
  <Layout>
    <Head>
      <title>Ryan Clements</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Hero />
  </Layout>
)

export default Index
