import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import sbLogo from 'public/tech-logos/storybook-logo.svg'
import nextjsLogo from 'public/tech-logos/nextjs-logo.svg'
import tsLogo from 'public/tech-logos/typescript-logo.svg'
import webpackLogo from 'public/tech-logos/webpack-logo.svg'
import { Project, ProjectProps } from '.'

const Template: Story<ProjectProps> = props => <Project {...props} />
Template.args = {
  name: 'Storybook Addon Next',
  description:
    'A no config Storybook addon that makes Next.js features just work in Storybook',
  githubUrl: 'https://github.com/RyanClementsHax/storybook-addon-next',
  siteUrl: 'https://www.npmjs.com/package/storybook-addon-next',
  techs: [
    { name: 'Typescript', logoSrc: tsLogo },
    { name: 'Storybook', logoSrc: sbLogo },
    { name: 'Webpack', logoSrc: webpackLogo },
    { name: 'Next.js', logoSrc: nextjsLogo }
  ]
}

const { Base, DarkTheme } = createDefaultStories(Template, {
  base: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1820%3A3077'
  },
  darkTheme: {
    figmaUrl:
      'https://www.figma.com/file/PdMqvzKJHKcSHXkdQ2SEp3/Personal-Website?node-id=1820%3A3079'
  }
})

export { Base, DarkTheme }

export default {
  title: 'pages/landing/sections/Projects/Project',
  component: Project,
  parameters: {
    layout: 'centered'
  }
} as Meta
