import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import jsLogo from 'public/tech-logos/javascript-logo.svg'
import { Skill, SkillProps } from '.'
import { ProficiencyLevel } from 'lib/skills'

const Template: Story<SkillProps> = props => <Skill {...props} />
Template.args = {
  name: 'Javascript',
  proficiency: ProficiencyLevel.Proficient,
  logoSrc: jsLogo
}

const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

export default {
  component: Skill,
  parameters: {
    layout: 'centered'
  }
} as Meta
