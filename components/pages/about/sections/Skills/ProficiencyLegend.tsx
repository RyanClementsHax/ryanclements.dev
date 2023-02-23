import { ProficiencyLevel } from 'lib/content/skills'
import { Proficiency } from './Proficiency'

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

export const ProficiencyLegend: React.FC = () => (
  <Container>
    {Array.from(proficiencyToDescriptionMap).map(([level, description]) => (
      <ProficiencyRow key={level} level={level} description={description} />
    ))}
  </Container>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-center">
    <dl className="grid max-w-md grid-cols-[auto,_minmax(0,1fr)] gap-4">
      {children}
    </dl>
  </div>
)

const ProficiencyRow = ({
  level,
  description
}: {
  level: ProficiencyLevel
  description: string
}) => (
  <>
    <dt className="justify-self-start">
      <Proficiency level={level} />
    </dt>
    <dd className="text-on-surface-base-muted">{description}</dd>
  </>
)
