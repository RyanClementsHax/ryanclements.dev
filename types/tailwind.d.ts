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
  export type OpacityCb = ({
    opacityVariable,
    opacityValue
  }: {
    opacityVariable?: string
    opacityValue?: string
  }) => string
  export type ColorValue =
    | string
    | number
    | { [key: string]: ColorValue }
    | ColorValue[]
    | OpacityCb
  export interface ColorConfig {
    [key: string]: ColorValue
  }
  export type TailwindValue =
    | string
    | number
    | { [key: string]: TailwindValue }
    | TailwindValue[]
  export type Theme = (key: string) => any
  export type ThemeCb<T> = (theme: Theme) => T
  export type WithThemeCb<T> = T | ThemeCb<T>
  export type TailwindExtension = {
    [key: string]: WithThemeCb<TailwindValue>
    colors?: WithThemeCb<ColorConfig>
  }
  export type TailwindTheme = {
    [key: string]:
      | WithThemeCb<TailwindValue>
      | WithThemeCb<ColorConfig>
      | TailwindExtension
    colors?: WithThemeCb<ColorConfig>
    extend?: TailwindExtension
  }
  export type TailwindConfig = {
    [key: string]: any
    theme: TailwindTheme
  }
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
