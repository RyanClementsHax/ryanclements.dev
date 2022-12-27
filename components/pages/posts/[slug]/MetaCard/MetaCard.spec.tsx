import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import * as stories from './MetaCard.stories'
import { composeStories } from '@storybook/testing-react'
import { format } from 'date-fns'

const { Base, DraftBase } = composeStories(stories)

describe('MetaCard', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Base />)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('displays the date when given a publish date', async () => {
    render(<Base />)

    expect(
      await screen.findByText(format(Base.args!.publishedOn!, 'MMM Do, y'))
    ).toBeInTheDocument()
  })

  it('displays "Draft" when not given a publish date', async () => {
    render(<DraftBase />)

    expect(await screen.findByText(/draft/i)).toBeInTheDocument()
  })
})
