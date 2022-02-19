export interface SkillsProps {
  children?: React.ReactNode
}

export const Skills = ({ children }: SkillsProps) => (
  <section className="p-5 flex flex-col gap-8 md:py-12 md:px-0 md:gap-20 justify-center">
    {children}
  </section>
)

const Header: React.FC = ({ children }) => (
  <hgroup className="flex flex-col gap-4 md:gap-6">{children}</hgroup>
)

Skills.Header = Header
