import { renderHook, RenderHookResult, act } from 'tests/utils'
import { Theme } from './types'
import { usePersistedTheme } from './usePersistedTheme'
import { getCurrentTheme } from './utils'

describe('usePersistedTheme', () => {
  let result: RenderHookResult<
      ReturnType<typeof usePersistedTheme>,
      void
    >['result'],
    initialTheme: Theme

  const renderBaseHook = () => {
    ;({ result } = renderHook(() => usePersistedTheme()))
  }

  beforeEach(() => {
    initialTheme = Theme.light
  })

  it('sets the theme to the result of getCurrentTheme', () => {
    renderBaseHook()

    expect(result.current[0]).toBe(initialTheme)
  })

  describe('setTheme', () => {
    it('updates the theme state', async () => {
      renderBaseHook()
      const newTheme = Theme.dark
      expect(newTheme).not.toBe(initialTheme)

      await act(() => {
        result.current[1](newTheme)
      })

      expect(result.current[0]).toBe(newTheme)
    })

    it('persists the theme', async () => {
      renderBaseHook()
      const newTheme = Theme.dark
      expect(newTheme).not.toBe(initialTheme)

      await act(() => {
        result.current[1](newTheme)
      })

      expect(getCurrentTheme()).toBe(newTheme)
    })
  })
})
