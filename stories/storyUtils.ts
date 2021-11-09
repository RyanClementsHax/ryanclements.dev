import { Story } from '@storybook/react'
import { Theme } from 'components/theme'

export const asDarkTheme = <T>(story: Story<T>): Story<T> => {
  const darkThemedStory = story.bind({})
  darkThemedStory.parameters = {
    theme: Theme.dark
  }
  return darkThemedStory
}

export const asMobile = <T>(story: Story<T>): Story<T> => {
  const mobileStory = story.bind({})
  mobileStory.parameters = {
    viewport: { defaultViewport: 'mobile1' }
  }
  return mobileStory
}
