import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { ThemeSelect } from '.'
import { ThemeContext } from '../ThemeContext'
import { Theme } from '../types'

const Template: StoryFn = () => <ThemeSelect />
const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

const { LoadingBase, LoadingDarkTheme } = createDefaultStories(
  () => (
    <ThemeContext.Provider value={{ theme: undefined, setTheme: () => {} }}>
      <ThemeSelect />
    </ThemeContext.Provider>
  ),
  { prefix: 'Loading' }
)

export { LoadingBase, LoadingDarkTheme }

const { OpenBase, OpenDarkTheme } = createDefaultStories(Template, {
  prefix: 'Open',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(await canvas.findByRole('button'))

    for (const theme of Object.values(Theme)) {
      expect(
        await canvas.findByRole('option', {
          name: new RegExp(theme, 'i')
        })
      ).toBeInTheDocument()
    }
  }
})

export { OpenBase, OpenDarkTheme }

export default {
  component: ThemeSelect,
  parameters: {
    layout: 'centered'
  }
} as Meta
