import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Qualities } from '.'
import { qualities } from 'lib/content'
import { qualitiesImageData } from 'lib/util'

const Template: StoryFn = () => (
  <Qualities
    title="A new kind of engineer"
    subtitle="New problems need new solutions. Here's the energy I bring to the table."
    graphicSrc={qualitiesImageData}
    qualities={qualities}
  />
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: Qualities
} as Meta
