import { render, screen } from 'tests/utils'
import { axe } from 'jest-axe'
import * as stories from './MetaCard.stories'
import { composeStories } from '@storybook/react'

const { Base, DraftBase, UpdatedBase } = composeStories(stories)

describe('MetaCard', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Base />)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('displays the date when given a publish date', async () => {
    render(<Base />)

    expect(await screen.findByText(Base.args!.publishedOn!)).toBeInTheDocument()
  })

  it('displays "Draft" when not given a publish date', async () => {
    render(<DraftBase />)

    expect(await screen.findByText(/draft/i)).toBeInTheDocument()
  })

  it('displays the date when given an updated date', async () => {
    render(<UpdatedBase />)

    expect(await screen.findByText(/updated/i)).toBeInTheDocument()
  })
})
