import { Story, Parameters } from '@storybook/react'
import { Theme } from 'components/theme'
import merge from 'just-merge'

export interface StoryModifier {
  <T>(story: Story<T>): Story<T>
}

export const withNoop: StoryModifier = story => story

export const compose =
  (...params: StoryModifier[]): StoryModifier =>
  story =>
    params.reverse().reduceRight((y, fn) => fn(y), story)

export const asCopy: StoryModifier = story => story.bind({})

export const withParams: (params: Parameters) => StoryModifier =
  params => story => {
    story.parameters = merge(story.parameters || {}, params)
    return story
  }

export const withDarkTheme: StoryModifier = withParams({ theme: Theme.dark })

export const withMobile: StoryModifier = withParams({
  viewport: {
    defaultViewport: 'mobile1'
  }
})

export const withFigmaUrl: (url: string) => StoryModifier = url =>
  withParams({
    design: {
      type: 'figma',
      url
    }
  })

export interface DefaultStoryConfig {
  figmaUrl?: string
}

export const withDefaults: (config?: DefaultStoryConfig) => StoryModifier =
  config =>
    compose(asCopy, config?.figmaUrl ? withFigmaUrl(config.figmaUrl) : withNoop)

export const createDefaultStories = <T>(
  template: Story<T>,
  {
    base,
    mobile,
    darkTheme,
    darkThemedMobile
  }: {
    base?: DefaultStoryConfig
    mobile?: DefaultStoryConfig
    darkTheme?: DefaultStoryConfig
    darkThemedMobile?: DefaultStoryConfig
  } = {}
): {
  Base: Story<T>
  Mobile: Story<T>
  DarkTheme: Story<T>
  DarkThemedMobile: Story<T>
} => ({
  Base: withDefaults(base)(template),
  Mobile: compose(withDefaults(mobile), withMobile)(template),
  DarkTheme: compose(withDefaults(darkTheme), withDarkTheme)(template),
  DarkThemedMobile: compose(
    withDefaults(darkThemedMobile),
    withMobile,
    withDarkTheme
  )(template)
})
