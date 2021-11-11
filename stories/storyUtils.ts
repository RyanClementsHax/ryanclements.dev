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

export interface DefaultStoryConfig {
  figmaUrl: string
}
export const createDefaultStories = <T>(
  template: Story<T>,
  {
    primary,
    mobile,
    darkTheme,
    darkThemedMobile
  }: {
    primary: DefaultStoryConfig
    mobile: DefaultStoryConfig
    darkTheme: DefaultStoryConfig
    darkThemedMobile: DefaultStoryConfig
  }
): {
  Primary: Story<T>
  Mobile: Story<T>
  DarkTheme: Story<T>
  DarkThemedMobile: Story<T>
} => ({
  Primary: withFigmaUrl(primary.figmaUrl)(template),
  Mobile: compose(asMobile, withFigmaUrl(mobile.figmaUrl))(template),
  DarkTheme: compose(asDarkTheme, withFigmaUrl(darkTheme.figmaUrl))(template),
  DarkThemedMobile: compose(
    asDarkThemedMobile,
    withFigmaUrl(darkThemedMobile.figmaUrl)
  )(template)
})
