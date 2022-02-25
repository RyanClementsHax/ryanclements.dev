import { Skill, SkillProps } from '../Skill'

export interface SkillGroupProps {
  children?: React.ReactNode
}

export const SkillGroup = ({ children }: SkillGroupProps) => (
  <div className="flex flex-col gap-6">{children}</div>
)

const Title: React.FC = ({ children }) => (
  <h3 className="text-on-surface-base text-xl font-light text-center">
    {children}
  </h3>
)

SkillGroup.Title = Title

const Content: React.FC = ({ children }) => (
  <ul className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
    {children}
  </ul>
)

SkillGroup.Content = Content

const _Skill = (props: SkillProps) => (
  <li>
    <Skill {...props} />
  </li>
)

SkillGroup.Skill = _Skill
