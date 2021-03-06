import { Meta, Story } from '@storybook/react'
import { ProficiencyLevel } from 'lib/skills'
import { createDefaultStories } from 'stories/storyUtils'

import { Proficiency, ProficiencyProps } from '.'

const Template: Story<ProficiencyProps> = props => <Proficiency {...props} />

const Proficient = Template.bind({})
Proficient.args = {
  level: ProficiencyLevel.Proficient
}
const { Base: ProficientBase, DarkTheme: ProficientDarkTheme } =
  createDefaultStories(Proficient, {
    base: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1724%3A2044'
    },
    darkTheme: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1724%3A2090'
    }
  })
export { ProficientBase, ProficientDarkTheme }

const Comfortable = Template.bind({})
Comfortable.args = {
  level: ProficiencyLevel.Comfortable
}
const { Base: ComfortableBase, DarkTheme: ComfortableDarkTheme } =
  createDefaultStories(Comfortable, {
    base: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1724%3A2095'
    },
    darkTheme: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1724%3A2097'
    }
  })
export { ComfortableBase, ComfortableDarkTheme }

const Novice = Template.bind({})
Novice.args = {
  level: ProficiencyLevel.Novice
}
const { Base: NoviceBase, DarkTheme: NoviceDarkTheme } = createDefaultStories(
  Novice,
  {
    base: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1724%3A2101'
    },
    darkTheme: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1724%3A2103'
    }
  }
)
export { NoviceBase, NoviceDarkTheme }

const Learning = Template.bind({})
Learning.args = {
  level: ProficiencyLevel.Learning
}
const { Base: LearningBase, DarkTheme: LearningDarkTheme } =
  createDefaultStories(Learning, {
    base: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1724%3A2107'
    },
    darkTheme: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1724%3A2109'
    }
  })
export { LearningBase, LearningDarkTheme }

const Exploring = Template.bind({})
Exploring.args = {
  level: ProficiencyLevel.Exploring
}
const { Base: ExploringBase, DarkTheme: ExploringDarkTheme } =
  createDefaultStories(Exploring, {
    base: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1724%3A2113'
    },
    darkTheme: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1724%3A2115'
    }
  })
export { ExploringBase, ExploringDarkTheme }

export default {
  title: 'pages/landing/sections/Skills/Proficiency',
  component: Proficiency,
  parameters: {
    layout: 'centered'
  }
} as Meta
