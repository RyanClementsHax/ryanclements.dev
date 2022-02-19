import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { ProficiencyLegend } from '.'

const Template: Story = () => <ProficiencyLegend />

const { Base, DarkTheme } = createDefaultStories(Template, {
  base: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1715%3A9350'
  },
  darkTheme: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1715%3A9352'
  }
})
export { Base, DarkTheme }

export default {
  title: 'pages/landing/sections/Skills/ProficiencyLegend',
  component: ProficiencyLegend,
  parameters: {
    layout: 'centered'
  }
} as Meta
