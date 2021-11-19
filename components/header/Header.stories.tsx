import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Header } from '.'

const Template: Story<Parameters<typeof Header>[0]> = props => (
  <Header {...props} />
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } = createDefaultStories(
  Template,
  {
    base: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1319%3A102'
    },
    mobile: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1319%3A100'
    },
    darkTheme: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1329%3A144'
    },
    darkThemedMobile: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1329%3A142'
    }
  }
)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  title: 'components/Header',
  component: Header
} as Meta
