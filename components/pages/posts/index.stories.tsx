import { Meta, StoryFn } from '@storybook/react'
import { postSummaries } from 'stories/posts'
import { createDefaultStories } from 'stories/storyUtils'

import { Posts, PostsProps } from '.'

const Template: StoryFn<PostsProps> = props => <Posts {...props} />

Template.args = {
  posts: postSummaries
}

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: Posts,
  parameters: {
    nextRouter: {
      pathname: '/posts'
    }
  }
} as Meta
