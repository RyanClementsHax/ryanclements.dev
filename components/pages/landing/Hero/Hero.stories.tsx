import { Meta, Story } from '@storybook/react'
import { asDarkTheme, asDarkThemedMobile, asMobile } from 'stories/storyUtils'

import { Hero } from '.'

const Template: Story<Parameters<typeof Hero>[0]> = props => <Hero {...props} />

export const Primary = Template.bind({})

export const Mobile = asMobile(Template)

export const DarkTheme = asDarkTheme(Template)

export const DarkThemedMobile = asDarkThemedMobile(Template)

export default {
  title: 'pages/landing/Hero',
  component: Hero
} as Meta
