import c from 'classnames'
import { ProficiencyLevel } from 'lib/skills'
import s from './Proficiency.module.scss'

export interface ProficiencyProps {
  level: ProficiencyLevel
  className?: string
}

export const Proficiency = ({ level, className }: ProficiencyProps) => (
  <span className={c(s.proficiency, s[level.toLocaleLowerCase()], className)}>
    {level}
  </span>
)
