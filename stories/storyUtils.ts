import { Story } from '@storybook/react'
import { Theme } from 'components/theme'

export const asDarkTheme = <T>(story: Story<T>): Story<T> => {
  const darkThemedStory = story.bind({})
  darkThemedStory.parameters = {
    ...story.parameters,
    theme: Theme.dark
  }
  return darkThemedStory
}

export const asMobile = <T>(story: Story<T>): Story<T> => {
  const mobileStory = story.bind({})
  mobileStory.parameters = {
    ...story.parameters,
    viewport: {
      ...story.parameters?.viewport,
      defaultViewport: 'mobile1'
    }
  }
  return mobileStory
}

export const withFigmaUrl =
  (url: string) =>
  <T>(story: Story<T>): Story<T> => {
    story.parameters = {
      ...story.parameters,
      design: {
        type: 'figma',
        url
      }
    }
    return story
  }

type StoryModifier<T> = (story: Story<T>) => Story<T>
export const compose =
  <T>(...params: StoryModifier<T>[]): StoryModifier<T> =>
  story =>
    params.reduceRight((y, fn) => fn(y), story)

export const asDarkThemedMobile = compose(asDarkTheme, asMobile)
