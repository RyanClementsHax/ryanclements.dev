import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Skills } from '.'
import { skillGroups } from 'lib/skills'

const Template: StoryFn = () => (
  <Skills
    title="A lifelong learner"
    subtitle="Here is the tech I know and love"
    groups={skillGroups}
  />
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: Skills
} as Meta
