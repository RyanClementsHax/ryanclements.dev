import { Header } from 'components/Header/Header'
import { Footer } from 'components/Footer'

// TODO: refactor

export const Layout: React.FC<{
  children?: React.ReactNode
  hideHeaderWithScroll?: boolean
}> = ({ children, hideHeaderWithScroll }) => (
  <main>
    <Header hideWithScroll={hideHeaderWithScroll} />
    {children}
    <Footer />
  </main>
)
