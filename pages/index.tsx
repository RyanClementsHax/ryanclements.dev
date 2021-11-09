import Head from 'next/head'
import { Hero } from 'components/pages/landing/Hero'
import { Header } from 'components/header'

export const Index: React.FC = () => (
  <>
    <Head>
      <title>Ryan Clements</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <Hero />
  </>
)

export default Index
