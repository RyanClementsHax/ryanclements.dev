import React from 'react'
import { render } from 'tests/testUtils'
import { axe } from 'jest-axe'
import { Primary } from 'stories/pages/index.stories'

describe('Index page', () => {
  let container: Element, asFragment: () => DocumentFragment

  beforeEach(() => {
    ;({ container, asFragment } = render(<Primary />))
  })

  it('has no axe violations', async () => {
    expect(await axe(container)).toHaveNoViolations()
  })
  it('matches snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })
})
