import { Header } from './Header'

export const Layout: React.FC = ({ children }) => (
  <main>
    <Header />
    {children}
  </main>
)
