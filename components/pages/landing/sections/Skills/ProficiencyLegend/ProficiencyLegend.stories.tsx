import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'

import { ProficiencyLegend } from '.'

const Template: Story = () => <ProficiencyLegend />

const { Base, DarkTheme } = createDefaultStories(Template)
export { Base, DarkTheme }

export default {
  component: ProficiencyLegend,
  parameters: {
    layout: 'centered'
  }
} as Meta
