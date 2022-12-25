import { Meta, StoryFn } from '@storybook/react'
import Index from 'pages/index'
import { createDefaultStories } from 'stories/storyUtils'

const Template: StoryFn = () => <Index />

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: Index
} as Meta
