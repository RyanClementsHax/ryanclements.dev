import { Meta, StoryFn } from '@storybook/react'
import { allSkills } from 'lib/skills'
import { createDefaultStories } from 'stories/storyUtils'
import { SkillGroup } from '.'

const Template: StoryFn = () => (
  <SkillGroup skillGroup={{ name: 'Everything', skills: allSkills }} />
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: SkillGroup
} as Meta
