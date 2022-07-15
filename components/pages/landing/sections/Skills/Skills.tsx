import { Subtitle } from 'components/pages/landing/headings/Subtitle'
import { Title } from 'components/pages/landing/headings/Title'
import { SkillGroupInfo } from 'lib/skills'
import { ProficiencyLegend } from './ProficiencyLegend'
import { SkillGroup } from './SkillGroup'

export interface SkillsProps {
  title: string
  subtitle: string
  groups: SkillGroupInfo[]
}

export const Skills = ({ title, subtitle, groups }: SkillsProps) => (
  <Container>
    <Header title={title} subtitle={subtitle} />
    <ProficiencyLegend />
    {groups.map(x => (
      <SkillGroup key={x.name} {...x} />
    ))}
  </Container>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <section className="flex flex-col justify-center gap-8 p-5 md:gap-20 md:p-8">
    {children}
  </section>
)

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <hgroup className="flex flex-col gap-4 md:gap-6">
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </hgroup>
)
