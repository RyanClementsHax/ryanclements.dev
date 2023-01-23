import { Meta, StoryFn } from '@storybook/react'
import { postSummaries } from 'stories/posts'
import { createDefaultStories } from 'stories/storyUtils'

import { PostSummaryCard, PostSummaryCardProps } from '.'

const Template: StoryFn<PostSummaryCardProps> = props => (
  <PostSummaryCard {...props} />
)
Template.args = {
  post: postSummaries[1]
}

const { Base, DarkTheme, Mobile, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, DarkTheme, Mobile, DarkThemedMobile }

const { DraftBase, DraftMobile, DraftDarkTheme, DraftDarkThemedMobile } =
  createDefaultStories(Template, {
    prefix: 'Draft',
    additionalArgs: args => ({
      post: {
        ...args.post!,
        publishedOn: undefined
      }
    })
  })

export { DraftBase, DraftMobile, DraftDarkTheme, DraftDarkThemedMobile }

export default {
  component: PostSummaryCard,
  parameters: {
    layout: 'centered'
  }
} as Meta
