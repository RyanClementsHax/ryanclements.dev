import { StoryFn } from '@storybook/react'
import { Theme } from 'components/theme'
import merge from 'just-merge'
import clone from 'just-clone'

export interface StoryModifier<T> {
  (story: StoryFn<T>): StoryFn<T>
}

type DefaultStory = 'Base' | 'Mobile' | 'DarkTheme' | 'DarkThemedMobile'
type PrefixedDefaultStory<TPrefix extends string> = `${TPrefix}${DefaultStory}`

export const createDefaultStories = <T, TPrefix extends string = ''>(
  template: StoryFn<T>,
  options?: {
    additionalArgs?: Args<T>
    prefix?: TPrefix
  }
): Record<PrefixedDefaultStory<TPrefix>, StoryFn<T>> => {
  const prefix = options?.prefix ?? ('' as TPrefix)
  return {
    [`${prefix}Base`]: createStory(template, options?.additionalArgs),
    [`${prefix}Mobile`]: createStory(
      template,
      options?.additionalArgs,
      withMobile
    ),
    [`${prefix}DarkTheme`]: createStory(
      template,
      options?.additionalArgs,
      withDarkTheme
    ),
    [`${prefix}DarkThemedMobile`]: createStory(
      template,
      options?.additionalArgs,
      withMobile,
      withDarkTheme
    )
  } as Record<PrefixedDefaultStory<TPrefix>, StoryFn<T>>
}

export const createStory = <T>(
  template: StoryFn<T>,
  args: Args<T>,
  ...modifiers: StoryModifier<T>[]
): StoryFn<T> => compose(withDefaults({ args }), ...modifiers)(template)

export const asCopy = <T>(story: StoryFn<T>): StoryFn<T> => {
  const newStory = story.bind({})
  newStory.args = story.args ? clone(story.args) : story.args
  return newStory
}

export const withArgs: <T>(args?: Args<T>) => StoryModifier<T> =
  args => story => {
    const nextArgs = typeof args === 'function' ? args(story.args ?? {}) : args
    story.args = merge(story.args || {}, nextArgs || {})
    return story
  }

export const withNoop = <T>(story: StoryFn<T>): StoryFn<T> => story

export const compose =
  <T>(...params: StoryModifier<T>[]): StoryModifier<T> =>
  story =>
    params.reverse().reduceRight((y, fn) => fn(y), story)

export const withParams: <T>(
  params?: StoryFn<T>['parameters']
) => StoryModifier<T> = params => story => {
  story.parameters = merge(story.parameters || {}, params || {})
  return story
}

export const withDarkTheme = <T>(story: StoryFn<T>): StoryFn<T> =>
  withParams<T>({ theme: Theme.dark })(story)

export const withMobile = <T>(story: StoryFn<T>): StoryFn<T> =>
  withParams<T>({
    viewport: {
      defaultViewport: 'iphone6'
    },
    // https://github.com/chromaui/chromatic-cli/issues/611
    chromatic: { viewports: [375] }
  })(story)

export const withDefaults = <T>({
  args
}: {
  args?: Args<T>
}): StoryModifier<T> => compose(asCopy, withArgs<T>(args))

export type Args<T> =
  | StoryFn<T>['args']
  | ((args: NonNullable<StoryFn<T>['args']>) => StoryFn<T>['args'])
