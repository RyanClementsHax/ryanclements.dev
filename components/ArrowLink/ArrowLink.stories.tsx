import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import { ArrowLink, ArrowLinkProps } from '.'

const Template: StoryFn<ArrowLinkProps> = props => <ArrowLink {...props} />
Template.args = {
  href: '/test',
  children: 'Click me!'
}

const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

export default {
  component: ArrowLink,
  parameters: {
    layout: 'centered'
  }
} as Meta
