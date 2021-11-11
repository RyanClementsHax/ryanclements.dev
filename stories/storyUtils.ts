import { Story } from '@storybook/react'
import { Theme } from 'components/theme'

export interface StoryModifier {
  <T>(story: Story<T>): Story<T>
}

export const asCopy: StoryModifier = story => story.bind({})

export const asDarkTheme: StoryModifier = story => {
  const darkThemedStory = asCopy(story)
  darkThemedStory.parameters = {
    ...story.parameters,
    theme: Theme.dark
  }
  return darkThemedStory
}

export const asMobile: StoryModifier = story => {
  const mobileStory = asCopy(story)
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
  (url?: string) =>
  <T>(story: Story<T>): Story<T> => {
    if (!url) return story

    story.parameters = {
      ...story.parameters,
      design: {
        type: 'figma',
        url
      }
    }
    return story
  }

export const compose =
  (...params: StoryModifier[]): StoryModifier =>
  story =>
    params.reverse().reduceRight((y, fn) => fn(y), story)

export const asDarkThemedMobile = compose(asDarkTheme, asMobile)

export interface DefaultStoryConfig {
  figmaUrl?: string
}
export const createDefaultStories = <T>(
  template: Story<T>,
  {
    primary,
    mobile,
    darkTheme,
    darkThemedMobile
  }: {
    primary?: DefaultStoryConfig
    mobile?: DefaultStoryConfig
    darkTheme?: DefaultStoryConfig
    darkThemedMobile?: DefaultStoryConfig
  } = {}
): {
  Primary: Story<T>
  Mobile: Story<T>
  DarkTheme: Story<T>
  DarkThemedMobile: Story<T>
} => ({
  Primary: compose(asCopy, withFigmaUrl(primary?.figmaUrl))(template),
  Mobile: compose(asMobile, withFigmaUrl(mobile?.figmaUrl))(template),
  DarkTheme: compose(asDarkTheme, withFigmaUrl(darkTheme?.figmaUrl))(template),
  DarkThemedMobile: compose(
    asDarkThemedMobile,
    withFigmaUrl(darkThemedMobile?.figmaUrl)
  )(template)
})
