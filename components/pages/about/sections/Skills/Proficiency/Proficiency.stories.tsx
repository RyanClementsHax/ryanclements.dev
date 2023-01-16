import { Meta, StoryFn } from '@storybook/react'
import { ProficiencyLevel } from 'lib/content/skills'
import { createDefaultStories } from 'stories/storyUtils'

import { Proficiency, ProficiencyProps } from '.'

const Template: StoryFn<ProficiencyProps> = props => <Proficiency {...props} />

const { ProficientBase, ProficientDarkTheme } = createDefaultStories(Template, {
  prefix: ProficiencyLevel.Proficient,
  additionalArgs: {
    level: ProficiencyLevel.Proficient
  }
})
export { ProficientBase, ProficientDarkTheme }

const { ComfortableBase, ComfortableDarkTheme } = createDefaultStories(
  Template,
  {
    prefix: ProficiencyLevel.Comfortable,
    additionalArgs: {
      level: ProficiencyLevel.Comfortable
    }
  }
)
export { ComfortableBase, ComfortableDarkTheme }

const { NoviceBase, NoviceDarkTheme } = createDefaultStories(Template, {
  prefix: ProficiencyLevel.Novice,
  additionalArgs: {
    level: ProficiencyLevel.Novice
  }
})
export { NoviceBase, NoviceDarkTheme }

const { LearningBase, LearningDarkTheme } = createDefaultStories(Template, {
  prefix: ProficiencyLevel.Learning,
  additionalArgs: {
    level: ProficiencyLevel.Learning
  }
})
export { LearningBase, LearningDarkTheme }

const { ExploringBase, ExploringDarkTheme } = createDefaultStories(Template, {
  prefix: ProficiencyLevel.Exploring,
  additionalArgs: {
    level: ProficiencyLevel.Exploring
  }
})
export { ExploringBase, ExploringDarkTheme }

export default {
  component: Proficiency,
  parameters: {
    layout: 'centered'
  }
} as Meta
