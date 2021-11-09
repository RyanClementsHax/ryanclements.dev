import { Meta, Story } from '@storybook/react'

import Index from 'pages/index'
import { asDarkTheme, asMobile } from 'stories/storyUtils'

const Template: Story<Parameters<typeof Index>[0]> = props => (
  <Index {...props} />
)

export const Primary = Template.bind({})

export const Mobile = asMobile(Template)

export const DarkTheme = asDarkTheme(Template)

export default {
  title: 'pages/landing',
  component: Index
} as Meta
