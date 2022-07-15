import { Meta, Story } from '@storybook/react'
import { projects } from 'lib/projects'
import { createDefaultStories } from 'stories/storyUtils'

import { Projects } from '.'

const Template: Story = () => (
  <Projects
    title="One Giant Nerd"
    subtitle="I love what I do. Here are some projects I like to work on."
    projects={projects}
  />
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } = createDefaultStories(
  Template,
  {
    base: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1820%3A3071'
    },
    mobile: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1820%3A3064'
    },
    darkTheme: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1820%3A3073'
    },
    darkThemedMobile: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1820%3A3066'
    }
  }
)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  title: 'pages/landing/sections/Projects',
  component: Projects
} as Meta
