import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Subtitle } from '.'

const Template: Story = () => (
  <Subtitle>
    New problems need new solutions. Here’s the energy I bring to the table.
  </Subtitle>
)

const { Base, DarkTheme } = createDefaultStories(Template, {
  base: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1712%3A1238'
  },
  darkTheme: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1712%3A1240'
  }
})

export { Base, DarkTheme }

export default {
  title: 'pages/landing/headings/Subtitle',
  component: Subtitle,
  parameters: {
    layout: 'centered'
  }
} as Meta
