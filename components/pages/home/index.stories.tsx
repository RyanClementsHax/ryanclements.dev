import { Meta, StoryFn } from '@storybook/react'
import { Home, HomeProps } from '.'
import { createDefaultStories } from 'stories/storyUtils'
import { postSummaries } from 'stories/posts'

const Template: StoryFn<HomeProps> = props => <Home {...props} />
Template.args = {
  recentPostSummaries: postSummaries
}

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: Home,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/'
      }
    }
  }
} as Meta
