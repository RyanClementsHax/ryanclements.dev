import { Subtitle } from 'components/pages/home/headings/Subtitle'
import { Title } from 'components/pages/home/headings/Title'
import { SkillGroupInfo } from 'lib/content'
import { ProficiencyLegend } from './ProficiencyLegend'
import { SkillGroup } from './SkillGroup'

export interface SkillsProps {
  title: string
  subtitle: string
  groups: SkillGroupInfo[]
}

export const Skills: React.FC<SkillsProps> = ({ title, subtitle, groups }) => (
  <Container>
    <Header title={title} subtitle={subtitle} />
    <ProficiencyLegend />
    {groups.map(x => (
      <SkillGroup key={x.name} skillGroup={x} />
    ))}
  </Container>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <section className="flex flex-col justify-center gap-8 p-5 py-16 md:gap-24 md:p-8 md:py-24">
    {children}
  </section>
)

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <hgroup className="flex flex-col gap-4 md:gap-6">
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </hgroup>
)
