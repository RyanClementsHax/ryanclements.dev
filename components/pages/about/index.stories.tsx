import { Meta, StoryFn } from '@storybook/nextjs'
import { About } from '.'
import { createDefaultStories } from 'stories/storyUtils'

const Template: StoryFn = props => <About {...props} />

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: About,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/about'
      }
    }
  }
} as Meta
