export enum Theme {
  dark = 'dark',
  light = 'light'
}

export enum ContentMeta {
  dark = 'dark',
  light = 'light'
}

export const themeToContentMetaMap: Record<Theme, ContentMeta> = {
  [Theme.light]: ContentMeta.light,
  [Theme.dark]: ContentMeta.dark
}
