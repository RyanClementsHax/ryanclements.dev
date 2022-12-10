import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Header } from '.'

const Template: Story = () => <Header />

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: Header
} as Meta
