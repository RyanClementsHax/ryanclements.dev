import { Skill, SkillProps } from '../Skill'

export interface SkillGroupProps {
  category: string
  skills: SkillProps[]
}

export const SkillGroup = ({ category, skills }: SkillGroupProps) => (
  <div className="flex flex-col gap-6 px-5">
    <h3 className="text-on-surface-base text-xl font-light text-center">
      {category}
    </h3>
    <ul className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {skills.map(x => (
        <li key={x.name}>
          <Skill {...x} />
        </li>
      ))}
    </ul>
  </div>
)
