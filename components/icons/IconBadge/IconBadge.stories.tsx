import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import { BookmarkIcon } from '@heroicons/react/24/outline'

import { IconBadge } from '.'

const Template: Story = () => (
  <IconBadge>
    <BookmarkIcon />
  </IconBadge>
)

const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

export default {
  component: IconBadge,
  parameters: {
    layout: 'centered'
  }
} as Meta
