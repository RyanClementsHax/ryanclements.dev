import { ThemeSelect } from 'components/theme'

export const Header: React.FC = () => (
  <header className="absolute p-3 w-full flex justify-end">
    <ThemeSelect />
  </header>
)
