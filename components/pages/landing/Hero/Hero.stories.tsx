import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Hero } from '.'

const Template: Story = () => (
  <Hero
    title={"Hiya! 👋\nI'm Ryan Clements"}
    subtitle={'I 💖 God, my wife and daughter 👨‍👩‍👧,\nand making dope software 👨‍💻'}
  />
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } = createDefaultStories(
  Template,
  {
    base: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1319%3A70'
    },
    mobile: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1319%3A65'
    },
    darkTheme: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1319%3A63'
    },
    darkThemedMobile: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1319%3A67'
    }
  }
)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  title: 'pages/landing/Hero',
  component: Hero
} as Meta
