import React from 'react'
import { render, screen } from 'tests/testUtils'
import { Primary } from 'stories/pages/index.stories'

jest.mock('next/router', () => require('next-router-mock'))

describe('Index page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Primary />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('has a link to login', () => {
    render(<Primary />)
    expect(
      screen.getByRole('button', { name: 'index:login-btn' })
    ).toHaveAttribute('href', '/api/auth/login?returnTo=/home')
  })
})
