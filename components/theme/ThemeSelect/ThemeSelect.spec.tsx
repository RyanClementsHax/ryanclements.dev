import React from 'react'
import { render, screen } from 'tests/testUtils'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Primary } from 'stories/pages/index.stories'
import { Theme, ThemeContext, ThemeContextType } from '..'

describe('ThemeSelect', () => {
  let container: Element,
    theme: Theme,
    setTheme: jest.MockedFunction<ThemeContextType['setTheme']>

  beforeEach(() => {
    theme = Theme.light
    setTheme = jest.fn()
    ;({ container } = render(
      <ThemeContext.Provider value={{ theme: Theme.light, setTheme }}>
        <Primary />
      </ThemeContext.Provider>
    ))
  })

  it('has no axe violations', async () => {
    expect(await axe(container)).toHaveNoViolations()
  })

  describe('open', () => {
    const openMenu = async () => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

      userEvent.click(await screen.findByRole('button'))
    }

    beforeEach(async () => {
      await openMenu()
    })

    it('has no axe violations', async () => {
      expect(await axe(container)).toHaveNoViolations()
    })

    it('is opened by clicking the button', async () => {
      expect(screen.queryByRole('listbox')).toBeInTheDocument()
    })

    it('shows all theme options', async () => {
      for (const theme of Object.keys(Theme)) {
        expect(
          await screen.findByRole('option', {
            name: theme
          })
        ).toBeInTheDocument()
      }
    })

    it('sets the theme when an option is clicked', async () => {
      const newTheme = Object.keys(Theme).find(x => x !== theme)

      userEvent.click(
        await screen.findByRole('option', {
          name: newTheme
        })
      )

      expect(setTheme).toHaveBeenCalledWith(newTheme)
    })
  })
})
