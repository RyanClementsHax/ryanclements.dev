import { Layout } from 'components/Landing/Layout'
import Head from 'next/head'
import Image from 'next/image'

export const Index: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Ryan Clements</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="h-screen grid md:grid-cols-2 lg:grid-cols-5 gap-4 content-center py-4 px-8 xl:px-16">
        <div className="max-w-md justify-self-center grid content-center lg:col-span-2">
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
        <div className="relative h-[500px] hidden md:block overflow-hidden shadow-md lg:col-span-3">
          <Image
            src="/banner.jpg"
            layout="fill"
            alt="My wife, me, and our wedding party being silly"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      </section>
    </Layout>
  )
}

export default Index
