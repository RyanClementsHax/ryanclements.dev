import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import { within, userEvent } from '@storybook/testing-library'

import { Header } from '.'

const Template: StoryFn = () => <Header />

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

const { OpenMobile, OpenDarkThemedMobile } = createDefaultStories(Template, {
  prefix: 'Open',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    userEvent.click(await canvas.findByRole('button'))
  }
})

export { OpenMobile, OpenDarkThemedMobile }

export default {
  component: Header
} as Meta
