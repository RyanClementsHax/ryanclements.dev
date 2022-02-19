import { renderStory } from 'tests/testUtils'
import { axe } from 'jest-axe'
import { Base } from './Skills.stories'

describe('Skills', () => {
  it('has no axe violations', async () => {
    const { container } = renderStory(Base)

    expect(await axe(container)).toHaveNoViolations()
  })
})
