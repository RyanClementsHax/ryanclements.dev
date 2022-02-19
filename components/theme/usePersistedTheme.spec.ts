import {
  renderHook,
  RenderResult,
  act
} from '@testing-library/react-hooks/server'
import { Theme } from './types'
import { usePersistedTheme } from './usePersistedTheme'
import { getCurrentTheme } from './utils'

describe('usePersistedTheme', () => {
  let result: RenderResult<ReturnType<typeof usePersistedTheme>>,
    hydrate: () => void,
    initialTheme: Theme

  const renderBaseHook = () => {
    ;({ result, hydrate } = renderHook(() => usePersistedTheme()))
  }
  const renderBaseHookHydrated = () => {
    renderBaseHook()
    hydrate()
  }

  beforeEach(() => {
    initialTheme = Theme.light
  })

  describe('before hydration', () => {
    it('sets the theme to undefined', () => {
      renderBaseHook()

      expect(result.current[0]).toBeUndefined()
    })
  })

  describe('after hydration', () => {
    it('sets the theme to the result of getCurrentTheme', () => {
      renderBaseHookHydrated()

      expect(result.current[0]).toBe(initialTheme)
    })

    describe('setTheme', () => {
      it('updates the theme state', () => {
        renderBaseHookHydrated()
        const newTheme = Theme.dark
        expect(newTheme).not.toBe(initialTheme)

        act(() => {
          result.current[1](newTheme)
        })

        expect(result.current[0]).toBe(newTheme)
      })

      it('persists the theme', () => {
        renderBaseHookHydrated()
        const newTheme = Theme.dark
        expect(newTheme).not.toBe(initialTheme)

        act(() => {
          result.current[1](newTheme)
        })

        expect(getCurrentTheme()).toBe(newTheme)
      })
    })
  })
})
