import Head from 'next/head'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import useTranslation from 'next-translate/useTranslation'

import s from 'styles/index.module.scss'
import { useI18nRoute } from 'lib/i18n/hooks'

export const Index: React.FC = () => {
  const { t } = useTranslation('index')
  return (
    <>
      <Head>
        <title>nPool</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <main className={s.page}>
        <Card className={s.loginCard}>
          <Card.Body className={s.body}>
            <Card.Title as="h1" className={s.title}>
              {t('header')}
              <hr />
            </Card.Title>
            <Button href={`/api/auth/login?returnTo=${useI18nRoute('/home')}`}>
              {t('login-btn')}
            </Button>
          </Card.Body>
        </Card>
      </main>
    </>
  )
}

export default Index
