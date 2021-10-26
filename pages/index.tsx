import { Layout } from 'components/Landing/Layout'
import Head from 'next/head'

export const Index: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Ryan Clements</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="h-screen grid md:grid-cols-2 content-center p-4">
        <div className="max-w-md justify-self-center">
          <h1 className="text-4xl font-bold mb-4">
            Hiya 👋
            <br />
            I’m Ryan Clements
          </h1>
          <h2 className="text-2xl text-gray-600">
            I 💖 God, my wife and daughter&nbsp;👨‍👩‍👧, and making dope
            software&nbsp;👨‍💻
          </h2>
        </div>
      </section>
    </Layout>
  )
}

export default Index
