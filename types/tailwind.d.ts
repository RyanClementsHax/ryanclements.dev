/* eslint-disable @typescript-eslint/no-explicit-any */

// tailwind doesn't have type definitions so we need to create them on our own until types are added

declare module 'tailwindcss' {
  export type TailwindExtensionValue =
    | string
    | number
    | { [key: string]: TailwindExtensionValue }
    | TailwindExtensionValue[]
  export type TailwindExtensionTopLevelValue =
    TailwindExtension[keyof TailwindExtensionValue]
  export type Theme = (key: string) => TailwindExtensionValue
  export type ThemeCallback = (theme: Theme) => TailwindExtensionValue
  export interface TailwindExtension {
    [key: string]: ThemeCallback | TailwindExtensionValue
  }
  export interface TailwindTheme {
    extend: TailwindExtension
    [key: string]: any
  }
  export interface TailwindConfig {
    theme: TailwindTheme
    [key: string]: any
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
