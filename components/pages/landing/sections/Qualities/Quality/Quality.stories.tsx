import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Quality } from '.'

const Template: Story = () => (
  <ul>
    <Quality
      icon="UserGroup"
      title="Title"
      description="Description that is descriptive"
    />
  </ul>
)

const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

export default {
  component: Quality,
  parameters: {
    layout: 'centered'
  }
} as Meta
