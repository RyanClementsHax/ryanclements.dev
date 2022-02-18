import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import jsLogo from 'public/tech-logos/javascript-logo.png'
import { SkillGroup, SkillGroupProps } from '.'

const Template: Story<SkillGroupProps> = props => <SkillGroup {...props} />
Template.args = {
  category: 'Frontend',
  skills: [
    {
      name: 'Javascript',
      proficiency: 'proficient',
      logoSrc: jsLogo
    },
    {
      name: 'Typescript',
      proficiency: 'proficient',
      logoSrc: jsLogo
    },
    {
      name: 'React',
      proficiency: 'proficient',
      logoSrc: jsLogo
    },
    {
      name: 'Next.js',
      proficiency: 'comfortable',
      logoSrc: jsLogo
    },
    {
      name: 'Gatsby',
      proficiency: 'exploring',
      logoSrc: jsLogo
    }
  ]
}

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
  title: 'pages/landing/Skills/SkillGroup',
  component: SkillGroup
} as Meta
