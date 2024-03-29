import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import post from 'posts/post-design-system.md'

import { PostDetails, PostDetailsProps } from '.'

const Template: StoryFn<PostDetailsProps> = props => <PostDetails {...props} />

Template.args = {
  post
}

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: PostDetails,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/posts/post-design-system'
      }
    }
  }
} as Meta
