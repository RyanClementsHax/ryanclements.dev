import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { ThemeSelect } from '.'

const Template: Story<Parameters<typeof ThemeSelect>[0]> = props => (
  <ThemeSelect {...props} />
)
const { Base, DarkTheme } = createDefaultStories(Template, {
  base: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1319%3A191'
  },
  darkTheme: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1319%3A197'
  }
})

export { Base, DarkTheme }

export default {
  title: 'components/ThemeSelect',
  component: ThemeSelect,
  parameters: {
    layout: 'centered'
  }
} as Meta
