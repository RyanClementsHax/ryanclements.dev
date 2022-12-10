import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { ThemeSelect } from '.'

const Template: Story = () => <ThemeSelect />
const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

export default {
  component: ThemeSelect,
  parameters: {
    layout: 'centered'
  }
} as Meta
