import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Hero } from '.'
import { heroBannerSrcMap } from 'lib/util/images'

const Template: StoryFn = () => (
  <Hero
    title={
      <>
        {'Hiya! 👋'}
        <br />
        {"I'm Ryan Clements"}
      </>
    }
    subtitle={
      <>
        I 💖 God, my wife and daughter&nbsp;👨‍👩‍👧, and making dope software&nbsp;👨‍💻
      </>
    }
    bannerSrcMap={heroBannerSrcMap}
  />
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: Hero
} as Meta
