import { SkillGroupInfo } from 'lib/skills'
import { Skill } from '../Skill'

export type SkillGroupProps = SkillGroupInfo

export const SkillGroup = ({ name, skills }: SkillGroupProps) => (
  <Container>
    <Title>{name}</Title>
    <Content>
      {skills.map(x => (
        <li key={x.name}>
          <Skill {...x} />
        </li>
      ))}
    </Content>
  </Container>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-6">{children}</div>
)

const Title = ({ children }: { children?: React.ReactNode }) => (
  <h3 className="text-center text-xl font-light text-on-surface-base">
    {children}
  </h3>
)

const Content = ({ children }: { children?: React.ReactNode }) => (
  <ul className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
    {children}
  </ul>
)
