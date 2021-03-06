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

const { Base, DarkTheme } = createDefaultStories(Template, {
  base: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1710%3A511'
  },
  darkTheme: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1710%3A513'
  }
})

export { Base, DarkTheme }

export default {
  title: 'pages/landing/sections/Skills/Skill',
  component: Skill,
  parameters: {
    layout: 'centered'
  }
} as Meta
