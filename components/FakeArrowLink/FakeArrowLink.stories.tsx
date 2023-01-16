import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import { FakeArrowLink, FakeArrowLinkProps } from '.'

const Template: StoryFn<FakeArrowLinkProps> = props => (
  <FakeArrowLink {...props} />
)
Template.args = {
  children: 'Click me!'
}

const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

export default {
  component: FakeArrowLink,
  parameters: {
    layout: 'centered'
  }
} as Meta
