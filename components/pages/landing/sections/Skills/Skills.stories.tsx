import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { Skills } from '.'
import { Subtitle } from '../../headings/Subtitle'
import { Title } from '../../headings/Title'
import { ProficiencyLegend } from './ProficiencyLegend'
import { SkillGroup } from './SkillGroup'
import { backendSkills, devopsSkills, frontendSkills } from './storyUtils'

const Template: Story = () => (
  <Skills>
    <hgroup>
      <Title>A lifelong learner</Title>
      <Subtitle>Here is the tech I know and love</Subtitle>
    </hgroup>
    <ProficiencyLegend />
    <SkillGroup>
      <SkillGroup.Title>Frontend</SkillGroup.Title>
      <SkillGroup.Content>
        {frontendSkills.map(x => (
          <SkillGroup.Skill key={x.name} {...x} />
        ))}
      </SkillGroup.Content>
    </SkillGroup>
    <SkillGroup>
      <SkillGroup.Title>Backend</SkillGroup.Title>
      <SkillGroup.Content>
        {backendSkills.map(x => (
          <SkillGroup.Skill key={x.name} {...x} />
        ))}
      </SkillGroup.Content>
    </SkillGroup>
    <SkillGroup>
      <SkillGroup.Title>Devops</SkillGroup.Title>
      <SkillGroup.Content>
        {devopsSkills.map(x => (
          <SkillGroup.Skill key={x.name} {...x} />
        ))}
      </SkillGroup.Content>
    </SkillGroup>
  </Skills>
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } = createDefaultStories(
  Template,
  {
    base: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1714%3A7318'
    },
    mobile: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1712%3A1820'
    },
    darkTheme: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1710%3A507'
    },
    darkThemedMobile: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1714%3A22912'
    }
  }
)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  title: 'pages/landing/sections/Skills',
  component: Skills
} as Meta
