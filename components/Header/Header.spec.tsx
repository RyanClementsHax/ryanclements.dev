import { render } from 'tests/utils'
import { axe } from 'jest-axe'
import * as stories from './Header.stories'
import { composeStories } from '@storybook/react'

const { Base } = composeStories(stories)

describe('Header', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Base />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
