import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import * as stories from './ThemeSelect.stories'
import { getCurrentTheme, Theme } from '..'
import { composeStories } from '@storybook/testing-react'

const { Base } = composeStories(stories)

describe('ThemeSelect', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Base />)

    expect(await axe(container)).toHaveNoViolations()
  })

  describe('open', () => {
    const renderAndOpenMenu = async () => {
      const view = render(<Base />)

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      userEvent.click(await screen.findByRole('button'))

      return view
    }

    it('has no axe violations', async () => {
      const { container } = await renderAndOpenMenu()

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

      const currentTheme = getCurrentTheme()
      const newTheme = Object.keys(Theme).find(x => x !== currentTheme)

      userEvent.click(
        await screen.findByRole('option', {
          name: newTheme
        })
      )

      await waitFor(() => expect(getCurrentTheme()).toBe(newTheme))
    })
  })
})
