import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Hero } from '.'

const Template: Story<Parameters<typeof Hero>[0]> = props => <Hero {...props} />

const { Primary, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Primary, Mobile, DarkTheme, DarkThemedMobile }

export default {
  title: 'pages/landing/Hero',
  component: Hero
} as Meta
