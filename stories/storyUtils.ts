import { Story, Parameters } from '@storybook/react'
import { Theme } from 'components/theme'
import merge from 'just-merge'

export interface StoryModifier {
  <T>(story: Story<T>): Story<T>
}

export const compose =
  (...params: StoryModifier[]): StoryModifier =>
  story =>
    params.reverse().reduceRight((y, fn) => fn(y), story)

export const asCopy: StoryModifier = story => story.bind({})

export const withParams: (params: Parameters) => StoryModifier =
  params => story => {
    story.parameters = merge(story.parameters || {}, params || {})
    return story
  }

export const withDarkTheme: StoryModifier = withParams({ theme: Theme.dark })

export const withMobile: StoryModifier = withParams({
  viewport: {
    defaultViewport: 'mobile1'
  }
})

export const withFigmaUrl: (url?: string) => StoryModifier = url =>
  withParams(
    url
      ? {
          design: {
            type: 'figma',
            url
          }
        }
      : {}
  )

export interface DefaultStoryConfig {
  figmaUrl?: string
}

export const withDefaults: (config?: DefaultStoryConfig) => StoryModifier =
  config => compose(asCopy, withFigmaUrl(config?.figmaUrl))

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
  Primary: withDefaults(primary)(template),
  Mobile: compose(withDefaults(mobile), withMobile)(template),
  DarkTheme: compose(withDefaults(darkTheme), withDarkTheme)(template),
  DarkThemedMobile: compose(
    withDefaults(darkThemedMobile),
    withMobile,
    withDarkTheme
  )(template)
})
