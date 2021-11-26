import React from 'react'
import { render } from 'tests/testUtils'
import { axe } from 'jest-axe'
import { Base } from './Hero.stories'

describe('Hero', () => {
  let container: Element

  const renderBase = () => {
    ;({ container } = render(<Base />))
  }

  it('has no axe violations', async () => {
    renderBase()

    expect(await axe(container)).toHaveNoViolations()
  })
})
