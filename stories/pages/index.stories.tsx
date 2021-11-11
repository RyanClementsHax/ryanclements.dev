import { Meta, Story } from '@storybook/react'
import { Layout } from 'components/Layout'

import Index from 'pages/index'
import {
  asDarkTheme,
  asMobile,
  withFigmaUrl,
  compose,
  asDarkThemedMobile
} from 'stories/storyUtils'

const Template: Story<Parameters<typeof Index>[0]> = props => (
  <Index {...props} />
)

export const Primary = Template.bind({})
withFigmaUrl(
  'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1202%3A1174'
)(Primary)

export const Mobile = compose(
  asMobile,
  withFigmaUrl(
    'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1202%3A1177'
  )
)(Template)

export const DarkTheme = compose(
  asDarkTheme,
  withFigmaUrl(
    'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1213%3A50'
  )
)(Template)

export const DarkThemedMobile = compose(
  asDarkThemedMobile,
  withFigmaUrl(
    'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1213%3A52'
  )
)(Template)

export default {
  title: 'pages/landing',
  component: Index,
  decorators: [
    Story => (
      <Layout>
        <Story />
      </Layout>
    )
  ]
} as Meta
