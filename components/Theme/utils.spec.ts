import { when } from 'jest-when'
import { mock } from 'jest-mock-extended'
import { Theme } from './types'
import {
  getInitialTheme,
  setInitialTheme,
  updateAndPersistTheme,
  getCurrentTheme,
  updateTheme
} from './utils'

describe('theme utils', () => {
  beforeEach(() => {
    document.documentElement.className = ''
    global.localStorage.clear()
    global.matchMedia = jest.fn()
  })

  describe('getInitialTheme', () => {
    describe('when there is a theme preference', () => {
      let themePreference: Theme

      beforeEach(() => {
        themePreference = Theme.dark
        global.localStorage.setItem('themePreference', themePreference)
      })

      it('returns that preference', () => {
        const result = getInitialTheme()

        expect(result).toBe(themePreference)
      })

      it('makes no call to the "prefers-color-scheme" media query', () => {
        expect(global.matchMedia).not.toHaveBeenCalled()
      })
    })

    describe('when there is no theme preference saved but there is an OS preference', () => {
      it(`returns ${Theme.dark} when the preference is "dark"`, () => {
        when(global.matchMedia)
          .calledWith('(prefers-color-scheme: dark)')
          .mockReturnValue(
            mock<MediaQueryList>({
              matches: true
            })
          )

        const result = getInitialTheme()

        expect(result).toBe(Theme.dark)
      })

      it(`returns ${Theme.light} when the preference is "light"`, () => {
        when(global.matchMedia)
          .calledWith('(prefers-color-scheme: dark)')
          .mockReturnValue(
            mock<MediaQueryList>({
              matches: false
            })
          )

        const result = getInitialTheme()

        expect(result).toBe(Theme.light)
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
        const result = getInitialTheme()

        expect(result).toBe(Theme.light)
      })
    })
  })

  describe('setInitialTheme', () => {
    let themePreference: Theme

    beforeEach(() => {
      themePreference = Theme.dark
      global.localStorage.setItem('themePreference', themePreference)
    })

    it('sets the theme as a class on the document', () => {
      setInitialTheme()

      expect(document.documentElement).toHaveClass(themePreference)
    })

    it('preserves other classes on the document', () => {
      const otherClass = 'otherClass'
      document.documentElement.classList.add(otherClass)

      setInitialTheme()

      expect(document.documentElement).toHaveClass(themePreference)

      expect(document.documentElement).toHaveClass(otherClass)
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
  })
})
