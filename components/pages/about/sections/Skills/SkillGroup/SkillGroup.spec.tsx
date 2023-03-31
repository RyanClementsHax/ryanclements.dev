import { render, screen } from 'tests/utils'
import { ProficiencyLevel, SkillInfo } from 'lib/content/skills'
import { SkillGroup } from './SkillGroup'

describe('SkillGroup', () => {
  it('sorts the skills alphabetically', async () => {
    const skills = [
      createSkillInfo({
        name: 'b'
      }),
      createSkillInfo({
        name: 'c'
      }),
      createSkillInfo({
        name: 'a'
      })
    ]
    const expectedSkillOrder = [
      createSkillInfo({
        name: 'a'
      }),
      createSkillInfo({
        name: 'b'
      }),
      createSkillInfo({
        name: 'c'
      })
    ]
    render(<SkillGroup skillGroup={{ name: 'Skills', skills }} />)

    const renderedSkills = await getSkillsInDom()
    expect(renderedSkills.map(extractSkillName)).toEqual(
      expectedSkillOrder.map(x => x.name)
    )
  })

  it('sorts the skills case insensitively', async () => {
    const skills = [
      createSkillInfo({
        name: 'A'
      }),
      createSkillInfo({
        name: 'a'
      })
    ]
    const expectedSkillOrder = [
      createSkillInfo({
        name: 'A'
      }),
      createSkillInfo({
        name: 'a'
      })
    ]
    render(<SkillGroup skillGroup={{ name: 'Skills', skills }} />)

    const renderedSkills = await getSkillsInDom()
    expect(renderedSkills.map(extractSkillName)).toEqual(
      expectedSkillOrder.map(x => x.name)
    )
  })

  it('sorts the skills ignoring the . character', async () => {
    const skills = [
      createSkillInfo({
        name: '.NET'
      }),
      createSkillInfo({
        name: 'a'
      }),
      createSkillInfo({
        name: 'nest'
      })
    ]
    const expectedSkillOrder = [
      createSkillInfo({
        name: 'a'
      }),
      createSkillInfo({
        name: 'nest'
      }),
      createSkillInfo({
        name: '.NET'
      })
    ]
    render(<SkillGroup skillGroup={{ name: 'Skills', skills }} />)

    const renderedSkills = await getSkillsInDom()
    expect(renderedSkills.map(extractSkillName)).toEqual(
      expectedSkillOrder.map(x => x.name)
    )
  })
})

const createSkillInfo = (skillInfo: Partial<SkillInfo>): SkillInfo => ({
  name: 'test',
  logoSrc: { src: 'https://example.com', height: 10, width: 10 },
  proficiency: ProficiencyLevel.Comfortable,
  ...skillInfo
})

const getSkillsInDom = async () => await screen.findAllByTestId(/skill/i)

const extractSkillName = (el: HTMLElement) =>
  el.getAttribute('data-testid')?.replace('skill-', '')
