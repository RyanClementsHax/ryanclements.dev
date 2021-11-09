import { Meta, Story } from '@storybook/react'
import { asDarkTheme } from 'stories/storyUtils'

import { ThemeSelect } from '.'

const Template: Story<Parameters<typeof ThemeSelect>[0]> = props => (
  <ThemeSelect {...props} />
)

export const Primary = Template.bind({})

export const DarkTheme = asDarkTheme(Template)

export default {
  title: 'components/ThemeSelect',
  component: ThemeSelect,
  parameters: {
    layout: 'centered'
  }
} as Meta
