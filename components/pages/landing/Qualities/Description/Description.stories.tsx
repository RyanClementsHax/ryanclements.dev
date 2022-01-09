import { BookmarkIcon } from '@heroicons/react/outline'
import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Description } from '.'

const Template: Story = () => (
  <ul>
    <Description
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
  title: 'pages/landing/Qualitites/Description',
  component: Description,
  parameters: {
    layout: 'centered'
  }
} as Meta
