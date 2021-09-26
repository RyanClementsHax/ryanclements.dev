import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'

import { useUser } from '@auth0/nextjs-auth0'
import auth0, { withI18nPageAuthRequired } from 'lib/auth/auth0'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import s from 'styles/home.module.scss'

export const getServerSideProps = withI18nPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { accessToken } = await auth0.getAccessToken(req, res)
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return {
        props: {
          data: await result.json()
        }
      }
    } catch {
      return { props: {} }
    }
  }
})

export const Home = ({
  user: userFromPageProps,
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const { user: userFromContext } = useUser()

  return (
    <>
      <Head>
        <title>nPool</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <main className={s.page}>
        <Card className={s.dataCard}>
          <Card.Body className={s.body}>
            <Button href="/api/auth/logout">Sign out</Button>
          </Card.Body>
        </Card>
        <Card className={s.dataCard}>
          <Card.Title as="h2" className={s.title}>
            User data from context
            <hr />
          </Card.Title>
          <Card.Body className={s.body}>
            This user data was passed in as props from the withPageAuthRequired
            but provided via useUser hook:
            <pre>{JSON.stringify(userFromContext, null, 4)}</pre>
          </Card.Body>
        </Card>
        <Card className={s.dataCard}>
          <Card.Title as="h2" className={s.title}>
            User data from page props
            <hr />
          </Card.Title>
          <Card.Body className={s.body}>
            This user data was passed in as props from the withPageAuthRequired
            but accessed directly from page props:
            <pre>{JSON.stringify(userFromPageProps, null, 4)}</pre>
          </Card.Body>
        </Card>
        <Card className={s.dataCard}>
          <Card.Title as="h2" className={s.title}>
            Data from authenticated NPool.Api route
            <hr />
          </Card.Title>
          <Card.Body className={s.body}>
            This data was retrieved when server rendering the page, then passing
            it in via page props (these are the claims that the server can see):
            <pre>{JSON.stringify(data, null, 4)}</pre>
          </Card.Body>
        </Card>
      </main>
    </>
  )
}

export default Home
