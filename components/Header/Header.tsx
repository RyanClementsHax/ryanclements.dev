import { ThemeSelect } from 'components/theme'

export const Header: React.FC = () => (
  <header className="absolute flex w-full justify-end p-3">
    <ThemeSelect />
  </header>
)
