/* eslint-disable @typescript-eslint/no-explicit-any */

// tailwind doesn't have type definitions so we need to create them on our own until types are added

type KnownKeys<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K]
}

type OmitFromKnownKeys<T, K extends keyof T> = KnownKeys<T> extends infer U
  ? keyof U extends keyof T
    ? Pick<T, Exclude<keyof U, K>> &
        Pick<T, Exclude<keyof T, keyof KnownKeys<T>>>
    : never
  : never

declare module 'tailwindcss' {
  export type WithExtensions<T, U = any> = T & { [key: string]: T[keyof T] | U }

  export type OpacityCb = ({
    opacityVariable,
    opacityValue
  }: {
    opacityVariable?: string
    opacityValue?: string
  }) => string

  export type ExtensionValue =
    | string
    | number
    | { [key: string]: ExtensionValue }
    | ExtensionValue[]

  export type Theme = (key: string) => any
  export type ThemeCb<T> = (theme: Theme) => T
  export type WithThemeCb<T> = T | ThemeCb<T>

  export type TailwindExtension = WithExtensions<
    Partial<{
      colors?: WithThemeCb<ExtensionValue>
    }>,
    WithThemeCb<ExtensionValue>
  >
  export type TailwindTheme = WithExtensions<
    Partial<{
      colors: WithThemeCb<ExtensionValue>
      extend: TailwindExtension
    }>,
    WithThemeCb<ExtensionValue>
  >
  export type TailwindConfig = WithExtensions<{
    theme: TailwindTheme
  }>
}

declare module 'tailwindcss/plugin' {
  import { TailwindConfig } from 'tailwindcss'

  export type AddVariantCb = (
    modifySelectors: ({
      className,
      selector
    }: {
      className: string
      selector: string
    }) => void,
    separator: string,
    container: any
  ) => void
  export interface Helpers {
    theme(key: string): any
    addVariant(variant: string, cb: AddVariantCb): void
    config(key: string): any
    addBase(styles: Record<string, any>)
    e(selector: string): string
  }

  export type PluginCb = (helpers: Helpers) => void
  export type PluginWithOptionsCb<TOptions> = (options: TOptions) => PluginCb
  export type PluginTailwindExtensionWithOptionsCb<TOptions> = (
    options: TOptions
  ) => TailwindConfig

  declare const plugin: {
    withOptions<TOptions>(
      pluginWithOptionsCb: PluginWithOptionsCb<TOptions>,
      pluginTailwindExtensionWithOptionsCb: PluginTailwindExtensionWithOptionsCb<TOptions>
    ): any
  }

  export = plugin
}

declare module 'tailwindcss/lib/util/pluginUtils' {
  export function transformAllSelectors(
    cb: (selector: string) => void
  ): AddVariantCb
  export function updateLastClasses(
    selector: string,
    cb: (className: string) => string
  ): string
}

declare module 'tailwindcss/lib/util/prefixSelector' {
  declare function prefixSelector(prefix: string, selector: string): string
  export default prefixSelector
}
