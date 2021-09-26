import { render, screen, act } from 'tests/testUtils'
import { axe } from 'jest-axe'
import { ProfileProps } from './Profile'
import { Primary } from './Profile.stories'

describe('Profile', () => {
  let container: Element

  beforeEach(() => {
    ;({ container } = render(<Primary {...(Primary.args as ProfileProps)} />))
  })

  it('has no axe violations', async () => {
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  it('displays the users avatar', () => {
    const profilePic = screen.getByRole('img')

    expect(profilePic).toHaveAttribute(
      'src',
      expect.stringContaining('data:image/gif;base64')
    )
  })
})
