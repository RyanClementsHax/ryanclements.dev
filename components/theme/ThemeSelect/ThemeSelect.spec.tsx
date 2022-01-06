import React from 'react'
import { render, screen } from 'tests/testUtils'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Base } from './ThemeSelect.stories'
import { Theme, ThemeContext, ThemeContextType } from '..'

describe('ThemeSelect', () => {
  let container: Element,
    theme: Theme,
    setTheme: jest.MockedFunction<ThemeContextType['setTheme']>

  const renderBase = () => {
    ;({ container } = render(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Base />
      </ThemeContext.Provider>
    ))
  }

  beforeEach(() => {
    theme = Theme.light
    setTheme = jest.fn()
  })

  it('has no axe violations', async () => {
    renderBase()

    expect(await axe(container)).toHaveNoViolations()
  })

  describe('open', () => {
    const renderAndOpenMenu = async () => {
      renderBase()

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

      userEvent.click(await screen.findByRole('button'))
    }

    it('has no axe violations', async () => {
      await renderAndOpenMenu()

      expect(await axe(container)).toHaveNoViolations()
    })

    it('is opened by clicking the button', async () => {
      await renderAndOpenMenu()

      expect(await screen.findByRole('listbox')).toBeInTheDocument()
    })

    it('shows all theme options', async () => {
      await renderAndOpenMenu()

      for (const theme of Object.keys(Theme)) {
        expect(
          await screen.findByRole('option', {
            name: theme
          })
        ).toBeInTheDocument()
      }
    })

    it('sets the theme when an option is clicked', async () => {
      await renderAndOpenMenu()

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
