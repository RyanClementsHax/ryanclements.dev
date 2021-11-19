import {
  renderHook,
  RenderResult,
  act
} from '@testing-library/react-hooks/server'
import { when } from 'jest-when'
import { Theme } from './types'
import { usePersistedTheme } from './usePersistedTheme'
import { getCurrentTheme, updateAndPersistTheme } from './utils'

jest.mock('./utils', () => ({
  getCurrentTheme: jest.fn(),
  updateAndPersistTheme: jest.fn()
}))

describe('usePersistedTheme', () => {
  let result: RenderResult<ReturnType<typeof usePersistedTheme>>,
    hydrate: () => void,
    initialTheme: Theme

  beforeEach(() => {
    initialTheme = Theme.light
    when(getCurrentTheme).calledWith().mockReturnValue(initialTheme)
    ;({ result, hydrate } = renderHook(() => usePersistedTheme()))
  })

  describe('before hydration', () => {
    it('sets the theme to undefined', () => {
      expect(result.current[0]).toBeUndefined()
    })
  })

  describe('after hydration', () => {
    beforeEach(() => hydrate())

    it('sets the theme to the result of getCurrentTheme', () => {
      expect(result.current[0]).toBe(initialTheme)
    })

    describe('setTheme', () => {
      it('updates the theme state', () => {
        const newTheme = Theme.dark
        expect(newTheme).not.toBe(initialTheme)

        act(() => {
          result.current[1](newTheme)
        })

        expect(result.current[0]).toBe(newTheme)
      })

      it('persists the theme', () => {
        const newTheme = Theme.dark
        expect(newTheme).not.toBe(initialTheme)

        act(() => {
          result.current[1](newTheme)
        })

        expect(updateAndPersistTheme).toHaveBeenCalledWith(newTheme)
      })
    })
  })
})
