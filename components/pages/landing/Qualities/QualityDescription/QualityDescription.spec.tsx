import { renderStory } from 'tests/testUtils'
import { axe } from 'jest-axe'
import { Base } from './QualityDescription.stories'

describe('QualityDescription', () => {
  it('has no axe violations', async () => {
    const { container } = renderStory(Base)

    expect(await axe(container)).toHaveNoViolations()
  })
})
