import { Meta, Story } from '@storybook/react'

import Home from 'pages/home'

const Template: Story<Parameters<typeof Home>[0]> = props => <Home {...props} />

export const Primary = Template.bind({})

export default {
  title: 'Home',
  component: Home
} as Meta
