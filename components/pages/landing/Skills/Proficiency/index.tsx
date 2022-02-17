import c from 'classnames'

export type ProficiencyLevel =
  | 'proficient'
  | 'comfortable'
  | 'novice'
  | 'learning'
  | 'exploring'

export interface ProficiencyProps {
  level: ProficiencyLevel
  className: string
}

const proficiencyToClassesMap: Record<ProficiencyLevel, string> = {
  proficient: 'text-yellow-800 border-yellow-600 bg-yellow-200',
  comfortable: 'text-zinc-800 border-zinc-600 bg-zinc-200',
  novice: 'text-blue-800 border-blue-600 bg-blue-200',
  learning: 'text-green-800 border-green-600 bg-green-200',
  exploring: 'text-purple-800 border-purple-600 bg-purple-200'
}

export const Proficiency = ({ level, className }: ProficiencyProps) => (
  <span
    className={c(
      proficiencyToClassesMap[level],
      'rounded-full first-letter:uppercase px-2 py-0.5 border text-xs',
      className
    )}
  >
    {level}
  </span>
)
