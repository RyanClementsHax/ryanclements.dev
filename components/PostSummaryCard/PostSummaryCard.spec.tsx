import { render, screen } from 'tests/utils'
import { axe } from 'jest-axe'
import * as stories from './PostSummaryCard.stories'
import { composeStories } from '@storybook/testing-react'

const { Base, DraftBase } = composeStories(stories)

describe('PostSummaryCard', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Base />)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('displays the date when given a publish date', async () => {
    render(<Base />)

    expect(
      await screen.findByText(Base.args!.post!.publishedOn!)
    ).toBeInTheDocument()
  })

  it('displays "Draft" when not given a publish date', async () => {
    render(<DraftBase />)

    expect(await screen.findByText(/draft/i)).toBeInTheDocument()
  })
})
