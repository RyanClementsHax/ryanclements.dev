import { Meta, StoryFn } from '@storybook/react'
import { ProficiencyLevel } from 'lib/content'
import { createDefaultStories } from 'stories/storyUtils'

import { Proficiency, ProficiencyProps } from '.'

const Template: StoryFn<ProficiencyProps> = props => <Proficiency {...props} />

const Proficient = Template.bind({})
Proficient.args = {
  level: ProficiencyLevel.Proficient
}
const { Base: ProficientBase, DarkTheme: ProficientDarkTheme } =
  createDefaultStories(Proficient)
export { ProficientBase, ProficientDarkTheme }

const Comfortable = Template.bind({})
Comfortable.args = {
  level: ProficiencyLevel.Comfortable
}
const { Base: ComfortableBase, DarkTheme: ComfortableDarkTheme } =
  createDefaultStories(Comfortable)
export { ComfortableBase, ComfortableDarkTheme }

const Novice = Template.bind({})
Novice.args = {
  level: ProficiencyLevel.Novice
}
const { Base: NoviceBase, DarkTheme: NoviceDarkTheme } =
  createDefaultStories(Novice)
export { NoviceBase, NoviceDarkTheme }

const Learning = Template.bind({})
Learning.args = {
  level: ProficiencyLevel.Learning
}
const { Base: LearningBase, DarkTheme: LearningDarkTheme } =
  createDefaultStories(Learning)
export { LearningBase, LearningDarkTheme }

const Exploring = Template.bind({})
Exploring.args = {
  level: ProficiencyLevel.Exploring
}
const { Base: ExploringBase, DarkTheme: ExploringDarkTheme } =
  createDefaultStories(Exploring)
export { ExploringBase, ExploringDarkTheme }

export default {
  component: Proficiency,
  parameters: {
    layout: 'centered'
  }
} as Meta
