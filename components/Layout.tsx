import { Header } from './Header'

export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <main>
    <Header />
    {children}
  </main>
)
