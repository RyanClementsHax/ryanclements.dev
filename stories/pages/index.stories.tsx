import { Meta, Story } from '@storybook/react'

import Index from 'pages/index'

const Template: Story<Parameters<typeof Index>[0]> = props => (
  <Index {...props} />
)

export const Primary = Template.bind({})

export default {
  title: 'Index',
  component: Index
} as Meta
