import React from 'react'
import { render } from 'tests/testUtils'
import { axe } from 'jest-axe'
import { Base } from './Header.stories'

describe('Header', () => {
  let container: Element

  const renderBase = () => {
    ;({ container } = render(<Base />))
  }

  it('has no axe violations', async () => {
    renderBase()

    expect(await axe(container)).toHaveNoViolations()
  })
})
