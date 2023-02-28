import { Meta, StoryFn } from '@storybook/react'
import { postSummaries } from 'stories/posts'
import { createDefaultStories } from 'stories/storyUtils'
import { within, userEvent } from '@storybook/testing-library'

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

const { HoverBase, HoverMobile, HoverDarkTheme, HoverDarkThemedMobile } =
  createDefaultStories(Template, {
    prefix: 'Hover',
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement)

      // TODO: Check if chromatic registers this
      userEvent.hover(
        await canvas.findByRole('link', {
          name: new RegExp(Template.args!.post!.title, 'i')
        })
      )
    }
  })

export { HoverBase, HoverMobile, HoverDarkTheme, HoverDarkThemedMobile }

export default {
  component: PostSummaryCard,
  parameters: {
    layout: 'centered'
  }
} as Meta
