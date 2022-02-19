import { BookmarkIcon } from '@heroicons/react/outline'
import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Quality } from '.'

const Template: Story = () => (
  <ul>
    <Quality
      Icon={<BookmarkIcon />}
      title="Title"
      description="Description that is descriptive"
    />
  </ul>
)

const { Base, DarkTheme } = createDefaultStories(Template, {
  base: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1503%3A652'
  },
  darkTheme: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1503%3A654'
  }
})

export { Base, DarkTheme }

export default {
  title: 'pages/landing/sections/Qualities/Quality',
  component: Quality,
  parameters: {
    layout: 'centered'
  }
} as Meta
