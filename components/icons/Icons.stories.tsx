import { Meta } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { GithubIcon } from './GithubIcon'
import { TwitterIcon } from './TwitterIcon'
import { LinkedInIcon } from './LinkedInIcon'

const { GithubIconBase, GithubIconDarkTheme } = createDefaultStories(
  () => <GithubIcon />,
  {
    prefix: 'GithubIcon'
  }
)

export { GithubIconBase, GithubIconDarkTheme }

const { TwitterIconBase, TwitterIconDarkTheme } = createDefaultStories(
  () => <TwitterIcon />,
  {
    prefix: 'TwitterIcon'
  }
)

export { TwitterIconBase, TwitterIconDarkTheme }

const { LinkedInIconBase, LinkedInIconDarkTheme } = createDefaultStories(
  () => <LinkedInIcon />,
  {
    prefix: 'LinkedInIcon'
  }
)

export { LinkedInIconBase, LinkedInIconDarkTheme }

export default {
  parameters: {
    layout: 'centered'
  }
} as Meta
