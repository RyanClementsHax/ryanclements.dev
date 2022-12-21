import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import * as stories from './Footer.stories'
import { composeStories } from '@storybook/testing-react'
import { getCurrentYear } from 'lib/util/dates'
import { INITIAL_YEAR } from 'lib/constants'

const { Base } = composeStories(stories)

jest.mock('lib/util/dates', () => ({
  getCurrentYear: jest.fn()
}))

describe('Footer', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Base />)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('displays a year range when the current year isnt the initial year', async () => {
    const currentYear = 2023
    expect(currentYear).not.toEqual(INITIAL_YEAR)
    jest.mocked(getCurrentYear).mockReturnValue(currentYear)
    const expectedText = new RegExp(
      `© ${INITIAL_YEAR} - ${currentYear} Ryan Clements`
    )

    render(<Base />)

    expect(await screen.findByText(expectedText)).toBeInTheDocument()
  })

  it('displays just the current year when the current year is the initial year', async () => {
    const currentYear = INITIAL_YEAR
    expect(currentYear).toEqual(INITIAL_YEAR)
    jest.mocked(getCurrentYear).mockReturnValue(currentYear)
    const expectedText = new RegExp(`© ${currentYear} Ryan Clements`)

    render(<Base />)

    expect(await screen.findByText(expectedText)).toBeInTheDocument()
  })
})
