import Head from 'next/head'
import { Layout } from 'components/landing/Layout'
import { Hero } from 'components/hero/Hero'
import { Header } from 'components/header'

export const Index: React.FC = () => (
  <Layout>
    <Head>
      <title>Ryan Clements</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <Hero />
  </Layout>
)

export default Index
