import { Meta, Story } from '@storybook/react'
import { Theme } from 'components/Theme'

import Index from 'pages/index'

const Template: Story<Parameters<typeof Index>[0]> = props => (
  <Index {...props} />
)

export const Primary = Template.bind({})

export const DarkTheme = Template.bind({})
DarkTheme.parameters = {
  theme: Theme.dark
}

export default {
  title: 'Index',
  component: Index
} as Meta
