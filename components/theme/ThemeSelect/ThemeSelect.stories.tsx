import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { ThemeSelect } from '.'

const Template: StoryFn = () => <ThemeSelect />
const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

export default {
  component: ThemeSelect,
  parameters: {
    layout: 'centered'
  }
} as Meta
