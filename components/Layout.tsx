import { Header } from './Header'
import { Footer } from './Footer'

export const Layout: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => (
  <main>
    <Header />
    {children}
    <Footer />
  </main>
)
