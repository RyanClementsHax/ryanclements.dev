import { ThemeToggle } from 'components/theme'

export const Header: React.FC = () => {
  return (
    <header className="absolute right-0 p-3">
      <ThemeToggle />
    </header>
  )
}
