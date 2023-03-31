import { render } from 'tests/utils'
import { axe } from 'jest-axe'
import * as stories from './index.stories'
import { composeStories } from '@storybook/testing-react'

const { Base } = composeStories(stories)

describe('Posts', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Base />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
