import { act, render, screen, waitFor } from 'tests/utils'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import * as stories from './ThemeSelect.stories'
import { getCurrentTheme, Theme } from '..'
import { composeStories } from '@storybook/testing-react'

const { Base, LoadingBase } = composeStories(stories)

jest.mock('@headlessui/react', () => {
  const mod = jest.requireActual('@headlessui/react')
  return {
    ...mod,
    Transition: ({ children }: { children: React.ReactNode }) => children
  }
})

describe('ThemeSelect', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Base />)

    expect(await axe(container)).toHaveNoViolations()
  })

  describe('open', () => {
    const renderAndOpenMenu = async () => {
      const view = render(<Base />)

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      await act(
        async () => await userEvent.click(await screen.findByRole('button'))
      )

      await screen.findByRole('listbox')

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

      await act(
        async () =>
          await userEvent.click(
            await screen.findByRole('option', {
              name: newTheme
            })
          )
      )

      await waitFor(() => expect(getCurrentTheme()).toBe(newTheme))
    })
  })

  describe('loading', () => {
    it('has no axe violations', async () => {
      const { container } = render(<LoadingBase />)

      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
