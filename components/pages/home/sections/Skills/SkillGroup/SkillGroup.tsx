import { SkillGroupInfo, SkillInfo } from 'lib/content'
import { useMemo } from 'react'
import { Skill } from '../Skill'

export interface SkillGroupProps {
  skillGroup: SkillGroupInfo
}

export const SkillGroup: React.FC<SkillGroupProps> = ({
  skillGroup: { name, skills }
}) => {
  const sortedSkills = useMemo(
    () => skills.slice().sort(compareSkills),
    [skills]
  )
  return (
    <Container>
      <Title>{name}</Title>
      <Content>
        {sortedSkills.map(x => (
          <li key={x.name} data-testid={`skill-${x.name}`}>
            <Skill skill={x} />
          </li>
        ))}
      </Content>
    </Container>
  )
}

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-6">{children}</div>
)

const Title = ({ children }: { children?: React.ReactNode }) => (
  <h3 className="text-center text-xl font-light">{children}</h3>
)

const Content = ({ children }: { children?: React.ReactNode }) => (
  <ul className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
    {children}
  </ul>
)

const compareSkills = (a: SkillInfo, b: SkillInfo) => {
  const cleanSkillName = (name: string) => name.replace('.', '')
  const cleanedAName = cleanSkillName(a.name)
  const cleanedBName = cleanSkillName(b.name)
  return cleanedAName.localeCompare(cleanedBName, undefined, {
    sensitivity: 'base'
  })
}
