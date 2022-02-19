import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Title } from '.'

const Template: Story = () => <Title>A new kind of engineer</Title>

const { Base, DarkTheme } = createDefaultStories(Template, {
  base: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1712%3A1221'
  },
  darkTheme: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1712%3A1228'
  }
})

export { Base, DarkTheme }

export default {
  title: 'pages/landing/headings/Title',
  component: Title,
  parameters: {
    layout: 'centered'
  }
} as Meta
