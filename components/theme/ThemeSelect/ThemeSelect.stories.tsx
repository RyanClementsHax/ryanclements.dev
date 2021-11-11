import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { ThemeSelect } from '.'

const Template: Story<Parameters<typeof ThemeSelect>[0]> = props => (
  <ThemeSelect {...props} />
)
const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

export default {
  title: 'components/ThemeSelect',
  component: ThemeSelect,
  parameters: {
    layout: 'centered'
  }
} as Meta
