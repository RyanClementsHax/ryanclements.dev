import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Subtitle } from '.'

const Template: Story = () => (
  <Subtitle>
    New problems need new solutions. Here’s the energy I bring to the table.
  </Subtitle>
)

const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

export default {
  component: Subtitle,
  parameters: {
    layout: 'centered'
  }
} as Meta
