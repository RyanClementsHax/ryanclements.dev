import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { ThemeSelect } from '.'
import { ThemeContext } from '../ThemeContext'

const Template: StoryFn = () => <ThemeSelect />
const { Base, DarkTheme } = createDefaultStories(Template)

export { Base, DarkTheme }

const { LoadingBase, LoadingDarkTheme } = createDefaultStories(
  () => (
    <ThemeContext.Provider value={{ theme: undefined, setTheme: () => {} }}>
      <div className="flex h-[38px]">
        <ThemeSelect />
      </div>
    </ThemeContext.Provider>
  ),
  { prefix: 'Loading' }
)

export { LoadingBase, LoadingDarkTheme }

export default {
  component: ThemeSelect,
  parameters: {
    layout: 'centered'
  }
} as Meta
