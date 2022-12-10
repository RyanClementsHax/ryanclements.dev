import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Hero } from '.'

const Template: Story = () => (
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
  />
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: Hero
} as Meta
