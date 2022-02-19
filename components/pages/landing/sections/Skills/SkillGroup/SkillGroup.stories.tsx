import { Meta, Story } from '@storybook/react'
import { allSkills } from 'lib/skills'
import { createDefaultStories } from 'stories/storyUtils'
import { SkillGroup } from '.'

const Template: Story = () => (
  <SkillGroup>
    <SkillGroup.Title>Everything</SkillGroup.Title>
    <SkillGroup.Content>
      {allSkills.map(x => (
        <SkillGroup.Skill key={x.name} {...x} />
      ))}
    </SkillGroup.Content>
  </SkillGroup>
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } = createDefaultStories(
  Template,
  {
    base: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1746%3A6475'
    },
    mobile: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1746%3A6473'
    },
    darkTheme: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1746%3A2892'
    },
    darkThemedMobile: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1746%3A2364'
    }
  }
)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  title: 'pages/landing/sections/Skills/SkillGroup',
  component: SkillGroup
} as Meta
