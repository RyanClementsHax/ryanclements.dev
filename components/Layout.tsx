import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

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
