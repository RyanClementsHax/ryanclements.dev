import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import jsLogo from 'public/tech-logos/javascript-logo.svg'
import { Skill, SkillProps } from '.'
import { ProficiencyLevel } from 'lib/content'

const Template: StoryFn<SkillProps> = props => <Skill {...props} />
Template.args = {
  skill: {
    name: 'Javascript',
    proficiency: ProficiencyLevel.Proficient,
    logoSrc: jsLogo
  }
}

const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

export default {
  component: Skill,
  parameters: {
    layout: 'centered'
  }
} as Meta
