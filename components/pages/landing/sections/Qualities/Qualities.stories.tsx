import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import graphic from 'public/graphic.jpg'

import { Qualities } from '.'
import { qualities } from 'lib/qualities'

const Template: Story = () => (
  <Qualities
    title="A new kind of engineer"
    subtitle="New problems need new solutions. Here's the energy I bring to the table."
    graphicSrc={graphic}
    qualities={qualities}
  />
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: Qualities
} as Meta
