import { StoryFn, Parameters } from '@storybook/react'
import { Theme } from 'components/theme'
import merge from 'just-merge'

export interface StoryModifier {
  <T>(story: StoryFn<T>): StoryFn<T>
}

export const createDefaultStories = <T>(
  template: StoryFn<T>
): {
  Base: StoryFn<T>
  Mobile: StoryFn<T>
  DarkTheme: StoryFn<T>
  DarkThemedMobile: StoryFn<T>
} => ({
  Base: withDefaults(template),
  Mobile: compose(withDefaults, withMobile)(template),
  DarkTheme: compose(withDefaults, withDarkTheme)(template),
  DarkThemedMobile: compose(withDefaults, withMobile, withDarkTheme)(template)
})

export const asCopy: StoryModifier = story => {
  const copiedStory = story.bind({}) as typeof story
  copiedStory.args = {
    ...story.args
  }
  return copiedStory
}

export const withNoop: StoryModifier = story => story

export const compose =
  (...params: StoryModifier[]): StoryModifier =>
  story =>
    params.reverse().reduceRight((y, fn) => fn(y), story)

export const withParams: (params: Parameters) => StoryModifier =
  params => story => {
    story.parameters = merge(story.parameters || {}, params)
    return story
  }

export const withDarkTheme = withParams({ theme: Theme.dark })

export const withMobile = withParams({
  viewport: {
    defaultViewport: 'iphone6'
  },
  // https://github.com/chromaui/chromatic-cli/issues/611
  chromatic: { viewports: [375] }
})

export const withDefaults = compose(asCopy)
