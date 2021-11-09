import { Header } from './header'

export const Layout: React.FC = ({ children }) => (
  <main>
    <Header />
    {children}
  </main>
)
