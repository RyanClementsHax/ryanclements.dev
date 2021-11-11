import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Header } from '.'

const Template: Story<Parameters<typeof Header>[0]> = props => (
  <Header {...props} />
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  title: 'components/Header',
  component: Header
} as Meta
