import { Meta, StoryFn } from '@storybook/react'
import { me } from 'lib/content/authors'
import { createDefaultStories } from 'stories/storyUtils'

import { AuthorInfo } from '.'

const Template: StoryFn = () => <AuthorInfo author={me} />

const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

export default {
  component: AuthorInfo,
  parameters: {
    layout: 'centered'
  }
} as Meta
