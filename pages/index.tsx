import { ThemeToggle } from 'components/Theme'
import Head from 'next/head'
import Image from 'next/image'

export const Index: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-800">
      <Head>
        <title>Ryan Clements</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-primary dark:text-opacity-25">
          Welcome to my site!
        </h1>

        <p className="mt-3 text-2xl">
          It is currently under construction 🚧👷‍♂️👷‍♀️
        </p>
        <ThemeToggle />
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className="h-4 ml-2 mr-2">
            <Image height={16} width={70} src="/vercel.svg" alt="Vercel Logo" />
          </span>
          and ✝️
        </a>
      </footer>
    </div>
  )
}

export default Index
