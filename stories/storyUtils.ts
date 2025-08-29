import { ReactRenderer, StoryFn } from '@storybook/react'
import { BaseAnnotations, StoryAnnotations } from '@storybook/types'
import { Theme } from 'components/theme'
import merge from 'just-merge'
import clone from 'just-clone'

export interface StoryModifier<T> {
  (story: StoryFn<T>): StoryFn<T>
}

type StorybookArgs<T> = BaseAnnotations<ReactRenderer, T>['args']
type StorybookPlay<T> = StoryAnnotations<ReactRenderer, T>['play']

export type Args<T> =
  | StorybookArgs<T>
  | ((args: NonNullable<StorybookArgs<T>>) => StorybookArgs<T>)

type DefaultStory = 'Base' | 'Mobile' | 'DarkTheme' | 'DarkThemedMobile'
type PrefixedDefaultStory<TPrefix extends string> = `${TPrefix}${DefaultStory}`

export const createDefaultStories = <T, TPrefix extends string = ''>(
  template: StoryFn<T>,
  options?: {
    additionalArgs?: Args<T>
    play?: StorybookPlay<T>
    prefix?: TPrefix
  }
): Record<PrefixedDefaultStory<TPrefix>, StoryFn<T>> => {
  const prefix = options?.prefix ?? ('' as TPrefix)
  return {
    [`${prefix}Base`]: createStory(
      template,
      options?.additionalArgs,
      options?.play
    ),
    [`${prefix}Mobile`]: createStory(
      template,
      options?.additionalArgs,
      options?.play,
      withMobile
    ),
    [`${prefix}DarkTheme`]: createStory(
      template,
      options?.additionalArgs,
      options?.play,
      withDarkTheme
    ),
    [`${prefix}DarkThemedMobile`]: createStory(
      template,
      options?.additionalArgs,
      options?.play,
      withMobile,
      withDarkTheme
    )
  } as Record<PrefixedDefaultStory<TPrefix>, StoryFn<T>>
}

export const createStory = <T>(
  template: StoryFn<T>,
  args: Args<T>,
  play?: StorybookPlay<T>,
  ...modifiers: StoryModifier<T>[]
): StoryFn<T> => compose(withDefaults({ args, play }), ...modifiers)(template)

export const asCopy = <T>(story: StoryFn<T>): StoryFn<T> => {
  const newStory = story.bind({}) as typeof story
  newStory.args = story.args ? clone(story.args) : story.args
  return newStory
}

export const withArgs: <T>(args?: Args<T>) => StoryModifier<T> =
  args => story => {
    const nextArgs = typeof args === 'function' ? args(story.args ?? {}) : args
    story.args = merge(story.args || {}, nextArgs || {})
    return story
  }

export const withPlay: <T>(play?: StorybookPlay<T>) => StoryModifier<T> =
  play => story => {
    story.play = play
    return story
  }

export const withNoop = <T>(story: StoryFn<T>): StoryFn<T> => story

export const compose =
  <T>(...params: StoryModifier<T>[]): StoryModifier<T> =>
  story =>
    params.reverse().reduceRight((y, fn) => fn(y), story)

type StorybookParameters<T> = BaseAnnotations<ReactRenderer, T>['parameters']

export const withParams: <T>(
  params?: StorybookParameters<T>
) => StoryModifier<T> = params => story => {
  story.parameters = merge(story.parameters || {}, params || {})
  return story
}

export const withDarkTheme = <T>(story: StoryFn<T>): StoryFn<T> =>
  withParams<T>({
    theming: {
      themeOverride: Theme.dark
    }
  })(story)

export const withMobile = <T>(story: StoryFn<T>): StoryFn<T> =>
  withParams<T>({
    viewport: {
      defaultViewport: 'iphone6'
    },
    // https://github.com/chromaui/chromatic-cli/issues/611
    chromatic: { viewports: [375] }
  })(story)

export const withDefaults = <T>({
  args,
  play
}: {
  args?: Args<T>
  play?: StorybookPlay<T>
}): StoryModifier<T> => compose(asCopy, withArgs<T>(args), withPlay<T>(play))
