import { Meta, Story } from '@storybook/react'
import { asDarkTheme, asDarkThemedMobile, asMobile } from 'stories/storyUtils'

import { Header } from '.'

const Template: Story<Parameters<typeof Header>[0]> = props => (
  <Header {...props} />
)

export const Primary = Template.bind({})

export const Mobile = asMobile(Template)

export const DarkTheme = asDarkTheme(Template)

export const DarkThemedMobile = asDarkThemedMobile(Template)

export default {
  title: 'components/Header',
  component: Header
} as Meta
