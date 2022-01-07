import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import { BookmarkIcon } from '@heroicons/react/outline'

import { IconBadge } from '.'

const Template: Story = () => (
  <IconBadge>
    <BookmarkIcon />
  </IconBadge>
)

const { Base, DarkTheme } = createDefaultStories(Template, {
  base: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1478%3A620'
  },
  darkTheme: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1478%3A635'
  }
})

export { Base, DarkTheme }

export default {
  title: 'components/IconBadge',
  component: IconBadge,
  parameters: {
    layout: 'centered'
  }
} as Meta
