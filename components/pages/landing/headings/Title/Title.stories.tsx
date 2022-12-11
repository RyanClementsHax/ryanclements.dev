import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Title } from '.'

const Template: StoryFn = () => <Title>A new kind of engineer</Title>

const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

export default {
  component: Title,
  parameters: {
    layout: 'centered'
  }
} as Meta
