import { Fragment } from 'react'
import { Proficiency, ProficiencyLevel } from '../Proficiency'

const proficiencyToDescriptionMap = new Map<ProficiencyLevel, string>([
  [
    ProficiencyLevel.Proficient,
    'Advanced, deep knowledge, can work independently, fluent, can mentor'
  ],
  [
    ProficiencyLevel.Comfortable,
    'Intermediate, can work somewhat to mostly independently, can mentor somewhat'
  ],
  [
    ProficiencyLevel.Novice,
    'New, knows the basics, will benefit from mentorship'
  ],
  [
    ProficiencyLevel.Learning,
    'Actively working on including in my list of skills, acquiring ability to be assigned work for this'
  ],
  [
    ProficiencyLevel.Exploring,
    'Learning for funsies! Seeing what the hype is all about'
  ]
])

export const ProficiencyLegend = () => (
  <dl className="grid grid-cols-[auto,_minmax(0,1fr)] gap-4">
    {Array.from(proficiencyToDescriptionMap).map(
      ([proficiency, description]) => (
        <Fragment key={proficiency}>
          <dt className="justify-self-start">
            <Proficiency level={proficiency} />
          </dt>
          <dd className="text-on-surface-base-muted">{description}</dd>
        </Fragment>
      )
    )}
  </dl>
)
