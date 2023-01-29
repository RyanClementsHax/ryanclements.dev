import { Meta, StoryFn } from '@storybook/react'
import { postSummaries } from 'stories/posts'
import { createDefaultStories } from 'stories/storyUtils'

import { RecentlyPublished, RecentlyPublishedProps } from '.'

const Template: StoryFn<RecentlyPublishedProps> = props => (
  <RecentlyPublished {...props} />
)
Template.args = {
  postSummaries: postSummaries,
  title: 'Recently published posts',
  subtitle: 'Just my thoughts on software engineering'
}

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: RecentlyPublished
} as Meta
