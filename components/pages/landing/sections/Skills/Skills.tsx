export interface SkillsProps {
  children?: React.ReactNode
}

export const Skills = ({ children }: SkillsProps) => (
  <section className="flex flex-col justify-center gap-8 p-5 md:gap-20 md:p-8">
    {children}
  </section>
)

const Header = ({ children }: { children?: React.ReactNode }) => (
  <hgroup className="flex flex-col gap-4 md:gap-6">{children}</hgroup>
)

Skills.Header = Header
