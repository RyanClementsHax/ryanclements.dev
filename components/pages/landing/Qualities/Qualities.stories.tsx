import {
  CubeIcon,
  PresentationChartLineIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import graphic from 'public/graphic.jpg'

import { Qualities } from '.'

const Template: Story = () => (
  <Qualities
    title="A new kind of engineer"
    subtitle="New problems need new solutions. Here's the energy I bring to the table."
    graphicSrc={graphic}
  >
    <Qualities.Description
      Icon={<UserGroupIcon />}
      title="People first"
      description="I see people as beloved by God and worth going the extra mile for. At work, I always try to help my coworkers and solve real problems for users."
    />
    <Qualities.Description
      Icon={<CubeIcon />}
      title="Modern"
      description="Up to date with the latest trends in industry, I synthesize custom solutions using the best of what modern software engineering has available to us."
    />
    <Qualities.Description
      Icon={<PresentationChartLineIcon />}
      title="Always improving"
      description="“Whether you think you can, or you think you can't - you're right” - Henry Ford. I seek to always be improving in all areas of my life, at home and work, on soft and hard skills."
    />
  </Qualities>
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } = createDefaultStories(
  Template,
  {
    base: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1404%3A362'
    },
    mobile: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1404%3A352'
    },
    darkTheme: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1413%3A597'
    },
    darkThemedMobile: {
      figmaUrl:
        'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1413%3A595'
    }
  }
)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  title: 'pages/landing/Qualities',
  component: Qualities
} as Meta
