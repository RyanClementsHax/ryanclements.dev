/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { socialAccounts, SocialPlatform } from 'lib/content/socialAccounts'
import { SocialLink } from './SocialLink'

describe('SocialLink', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <SocialLink
        socialAccount={
          socialAccounts.find(x => x.platform === SocialPlatform.Github)!
        }
      />
    )

    expect(await axe(container)).toHaveNoViolations()
  })

  it('sets the name of the link using the platform', async () => {
    render(
      <SocialLink
        socialAccount={
          socialAccounts.find(x => x.platform === SocialPlatform.Github)!
        }
      />
    )

    expect(await screen.findByRole('link')).toHaveAccessibleName(
      `Link to ${SocialPlatform.Github}`
    )
  })
})
