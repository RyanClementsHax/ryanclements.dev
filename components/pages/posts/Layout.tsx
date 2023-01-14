import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

export const Layout: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => (
  <main>
    <Header />
    {children}
    <Footer />
  </main>
)
