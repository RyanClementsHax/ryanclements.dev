import { when } from 'jest-when'
import { mock } from 'jest-mock-extended'
import { ContentMeta, Theme, themeToContentMetaMap } from './types'
import {
  initTheme,
  updateAndPersistTheme,
  getCurrentTheme,
  updateTheme
} from './utils'

describe('theme utils', () => {
  beforeEach(() => {
    document.documentElement.className = ''
    global.localStorage.clear()
    global.matchMedia = jest.fn()
    const colorSchemeMeta = document.createElement('meta')
    colorSchemeMeta.name = 'color-scheme'
    colorSchemeMeta.content = 'normal'
    document.getElementsByTagName('head')[0].appendChild(colorSchemeMeta)
  })

  afterEach(() => {
    for (const meta of Array.from(document.getElementsByTagName('meta'))) {
      document.getElementsByTagName('head')[0].removeChild(meta)
    }
  })

  describe('initTheme', () => {
    it('preserves other classes on the document', () => {
      const themePreference = Theme.dark
      global.localStorage.setItem('themePreference', themePreference)
      const otherClass = 'otherClass'
      document.documentElement.classList.add(otherClass)

      initTheme(Theme, themeToContentMetaMap)

      expect(document.documentElement).toHaveClass(themePreference)
      expect(document.documentElement).toHaveClass(otherClass)
    })

    it('sets the color-scheme meta according to the map', () => {
      expect(getColorSchemeMeta()).toHaveAttribute('content', 'normal')
      const themePreference = Theme.dark
      global.localStorage.setItem('themePreference', themePreference)
      let map = {
        [Theme.dark]: ContentMeta.dark,
        [Theme.light]: ContentMeta.light
      }

      initTheme(Theme, map)

      expect(getColorSchemeMeta()).toHaveAttribute(
        'content',
        map[themePreference]
      )

      map = {
        [Theme.dark]: ContentMeta.light,
        [Theme.light]: ContentMeta.dark
      }

      initTheme(Theme, map)

      expect(getColorSchemeMeta()).toHaveAttribute(
        'content',
        map[themePreference]
      )
    })

    describe('when there is a theme preference', () => {
      let themePreference: Theme

      beforeEach(() => {
        themePreference = Theme.dark
        global.localStorage.setItem('themePreference', themePreference)
      })

      it('sets the theme to that preference', () => {
        initTheme(Theme, themeToContentMetaMap)

        expect(document.documentElement).toHaveClass(themePreference)
      })
    })

    describe('when there is no theme preference saved but there is an OS preference', () => {
      it(`sets the theme to ${Theme.dark} when the preference is "dark"`, () => {
        when(global.matchMedia)
          .calledWith('(prefers-color-scheme: dark)')
          .mockReturnValue(
            mock<MediaQueryList>({
              matches: true
            })
          )

        initTheme(Theme, themeToContentMetaMap)

        expect(document.documentElement).toHaveClass(Theme.dark)
      })

      it(`sets the theme to ${Theme.light} when the preference is "light"`, () => {
        when(global.matchMedia)
          .calledWith('(prefers-color-scheme: dark)')
          .mockReturnValue(
            mock<MediaQueryList>({
              matches: false
            })
          )

        initTheme(Theme, themeToContentMetaMap)

        expect(document.documentElement).toHaveClass(Theme.light)
      })
    })

    describe('when there is neither a persisted theme nor an OS preference', () => {
      beforeEach(() => {
        when(global.matchMedia)
          .calledWith('(prefers-color-scheme: dark)')
          .mockReturnValue(
            mock<MediaQueryList>({
              matches: undefined
            })
          )
      })

      it(`defaults to ${Theme.light}`, () => {
        initTheme(Theme, themeToContentMetaMap)

        expect(document.documentElement).toHaveClass(Theme.light)
      })
    })
  })

  describe('getCurrentTheme', () => {
    it('gets the current theme off of the document', () => {
      const themePreference = Theme.dark
      document.documentElement.classList.add(themePreference)

      const theme = getCurrentTheme()

      expect(theme).toBe(themePreference)
    })

    it(`defaults to the ${Theme.light} if there is no theme on the document`, () => {
      expect(document.documentElement.className).toBe('')

      const theme = getCurrentTheme()

      expect(theme).toBe(Theme.light)
    })
  })

  describe('updateTheme', () => {
    let oldTheme: Theme, newTheme: Theme

    beforeEach(() => {
      oldTheme = Theme.dark
      newTheme = Theme.light
      document.documentElement.classList.add(oldTheme)
    })

    it('adds the new theme to the document', () => {
      updateTheme(newTheme)

      expect(document.documentElement).toHaveClass(newTheme)
    })

    it('removes other themes from the document', () => {
      updateTheme(newTheme)

      expect(document.documentElement).not.toHaveClass(oldTheme)
    })
  })

  describe('updateAndPersistTheme', () => {
    let oldTheme: Theme, newTheme: Theme

    beforeEach(() => {
      oldTheme = Theme.dark
      newTheme = Theme.light
      document.documentElement.classList.add(oldTheme)
    })

    it('adds the new theme to the document', () => {
      updateAndPersistTheme(newTheme)

      expect(document.documentElement).toHaveClass(newTheme)
    })

    it('removes other themes from the document', () => {
      updateAndPersistTheme(newTheme)

      expect(document.documentElement).not.toHaveClass(oldTheme)
    })

    it('persists the theme in local storage', () => {
      updateAndPersistTheme(newTheme)

      expect(global.localStorage.getItem('themePreference')).toBe(newTheme)
    })

    it('sets the color-scheme meta according to the map', () => {
      expect(getColorSchemeMeta()).toHaveAttribute('content', 'normal')

      updateAndPersistTheme(newTheme)

      expect(getColorSchemeMeta()).toHaveAttribute(
        'content',
        themeToContentMetaMap[newTheme]
      )
    })
  })
})

const getColorSchemeMeta = () =>
  document.querySelector('meta[name="color-scheme"]')
