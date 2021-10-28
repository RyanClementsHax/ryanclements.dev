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
      <section className="h-screen w-100 p-8">
        <div className="h-full grid gap-4 content-center md:container md:mx-auto md:grid-cols-2 lg:grid-cols-5">
          <div className="grid content-center lg:col-span-2">
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
          <div className="relative h-[500px] hidden md:block shadow-md lg:col-span-3">
            <Image
              src="/banner.jpg"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="My wife, me, and our wedding party being silly"
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Index
