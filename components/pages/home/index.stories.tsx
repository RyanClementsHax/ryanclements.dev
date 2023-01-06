import { Meta, StoryFn } from '@storybook/react'
import { Home } from '.'
import { createDefaultStories } from 'stories/storyUtils'

const Template: StoryFn = () => <Home />

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: Home
} as Meta
