import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { PostSummaryCard, PostSummaryCardProps } from '.'

const Template: StoryFn<PostSummaryCardProps> = props => (
  <PostSummaryCard {...props} />
)
Template.args = {
  post: {
    slug: 'post-design-system',
    title: 'Post Design System for ryanclements.dev',
    description:
      'This is a post that contains all of the custom components and styles to make a post look awesome.',
    publishedOn: 'Feb 3rd, 2022'
  }
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
