import { Meta } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { GithubIcon } from './GithubIcon'
import { TwitterIcon } from './TwitterIcon'
import { LinkedInIcon } from './LinkedInIcon'

const { Base: GithubIconBase, DarkTheme: GithubIconDarkTheme } =
  createDefaultStories(() => <GithubIcon className="text-on-surface-base" />)

export { GithubIconBase, GithubIconDarkTheme }

const { Base: TwitterIconBase, DarkTheme: TwitterIconDarkTheme } =
  createDefaultStories(() => <TwitterIcon className="text-on-surface-base" />)

export { TwitterIconBase, TwitterIconDarkTheme }

const { Base: LinkedInIconBase, DarkTheme: LinkedInIconDarkTheme } =
  createDefaultStories(() => <LinkedInIcon className="text-on-surface-base" />)

export { LinkedInIconBase, LinkedInIconDarkTheme }

export default {
  component: GithubIcon,
  parameters: {
    layout: 'centered'
  }
} as Meta
