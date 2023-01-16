import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Hero } from '.'
import { aboutImageData } from 'lib/content'

const Template: StoryFn = () => (
  <Hero
    title="A little bit about Ryan Clements..."
    subtitle={
      <>
        I&apos;m a Catholic ✝️ who lives in Florida 🦩🌴 with his wife and
        daughter 👨‍👩‍👧 where I work on my craft as a software engineer 👨‍💻.
      </>
    }
    bannerSrc={aboutImageData}
  />
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: Hero
} as Meta
