import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import * as stories from './IconBadge.stories'
import { composeStories } from '@storybook/testing-react'

const { Base } = composeStories(stories)

describe('IconBadge', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Base />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
