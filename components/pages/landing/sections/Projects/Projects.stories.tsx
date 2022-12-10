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

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: Projects
} as Meta
