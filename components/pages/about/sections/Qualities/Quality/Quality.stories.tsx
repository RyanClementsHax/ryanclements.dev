import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Quality } from '.'

const Template: StoryFn = () => (
  <ul>
    <Quality
      quality={{
        icon: 'UserGroup',
        title: 'Title',
        description: 'Description that is descriptive'
      }}
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
