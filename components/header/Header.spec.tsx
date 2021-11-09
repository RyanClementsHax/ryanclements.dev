import React from 'react'
import { render } from 'tests/testUtils'
import { axe } from 'jest-axe'
import { Primary } from './Header.stories'

describe('Header', () => {
  let container: Element

  beforeEach(() => {
    ;({ container } = render(<Primary />))
  })

  it('has no axe violations', async () => {
    expect(await axe(container)).toHaveNoViolations()
  })
})
