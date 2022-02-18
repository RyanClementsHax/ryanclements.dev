import { Meta, Story } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import jsLogo from 'public/tech-logos/javascript-logo.svg'
import tsLogo from 'public/tech-logos/typescript-logo.svg'
import reactLogo from 'public/tech-logos/react-logo.svg'
import nextjsLogo from 'public/tech-logos/nextjs-logo.svg'
import gatsbyLogo from 'public/tech-logos/gatsby-logo.svg'
import vueLogo from 'public/tech-logos/vue-logo.svg'
import webpackLogo from 'public/tech-logos/webpack-logo.svg'
import cssLogo from 'public/tech-logos/css-logo.svg'
import htmlLogo from 'public/tech-logos/html-logo.svg'
import sassLogo from 'public/tech-logos/sass-logo.svg'
import tailwindLogo from 'public/tech-logos/tailwindcss-logo.svg'
import jestLogo from 'public/tech-logos/jest-logo.svg'
import cyLogo from 'public/tech-logos/cypress-logo.svg'
import csharpLogo from 'public/tech-logos/csharp-logo.svg'
import dotnetCoreLogo from 'public/tech-logos/dotnet-core-logo.svg'
import aspnetCoreLogo from 'public/tech-logos/aspnet-core-logo.svg'
import efCoreLogo from 'public/tech-logos/ef-core-logo.svg'
import nodeLogo from 'public/tech-logos/node-logo.svg'
import sqlLogo from 'public/tech-logos/sql-logo.svg'
import sqlServerLogo from 'public/tech-logos/sql-server-logo.svg'
import postgresLogo from 'public/tech-logos/postgres-logo.svg'
import rustLogo from 'public/tech-logos/rust-logo.svg'
import denoLogo from 'public/tech-logos/deno-logo.svg'
import auth0Logo from 'public/tech-logos/auth0-logo.svg'
import graphqlLogo from 'public/tech-logos/graphql-logo.svg'
import dockerLogo from 'public/tech-logos/docker-logo.svg'
import githubActionsLogo from 'public/tech-logos/github-actions-logo.svg'
import awsLogo from 'public/tech-logos/aws-logo.svg'
import azureLogo from 'public/tech-logos/azure-logo.svg'
import tfLogo from 'public/tech-logos/terraform-logo.svg'
import { SkillGroup, SkillGroupProps } from '.'

const Template: Story<SkillGroupProps> = props => <SkillGroup {...props} />
Template.args = {
  category: 'Everything',
  skills: [
    // Frontend
    {
      name: 'Javascript',
      proficiency: 'proficient',
      logoSrc: jsLogo
    },
    {
      name: 'Typescript',
      proficiency: 'proficient',
      logoSrc: tsLogo
    },
    {
      name: 'React',
      proficiency: 'proficient',
      logoSrc: reactLogo
    },
    {
      name: 'Next.js',
      proficiency: 'comfortable',
      logoSrc: nextjsLogo
    },
    {
      name: 'Gatsby',
      proficiency: 'exploring',
      logoSrc: gatsbyLogo
    },
    {
      name: 'Vue',
      proficiency: 'proficient',
      logoSrc: vueLogo
    },
    {
      name: 'Webpack',
      proficiency: 'comfortable',
      logoSrc: webpackLogo
    },
    {
      name: 'CSS',
      proficiency: 'comfortable',
      logoSrc: cssLogo
    },
    {
      name: 'HTML',
      proficiency: 'comfortable',
      logoSrc: htmlLogo
    },
    {
      name: 'SASS/SCSS',
      proficiency: 'comfortable',
      logoSrc: sassLogo
    },
    {
      name: 'Tailwindcss',
      proficiency: 'proficient',
      logoSrc: tailwindLogo
    },
    {
      name: 'Jest',
      proficiency: 'proficient',
      logoSrc: jestLogo
    },
    {
      name: 'Cypress',
      proficiency: 'comfortable',
      logoSrc: cyLogo
    },
    // Backend
    {
      name: 'C#',
      proficiency: 'comfortable',
      logoSrc: csharpLogo
    },
    {
      name: '.Net Core',
      proficiency: 'comfortable',
      logoSrc: dotnetCoreLogo
    },
    {
      name: 'ASP.NET Core',
      proficiency: 'comfortable',
      logoSrc: aspnetCoreLogo
    },
    {
      name: 'Entity Framework Core',
      proficiency: 'comfortable',
      logoSrc: efCoreLogo
    },
    {
      name: 'Node.js',
      proficiency: 'comfortable',
      logoSrc: nodeLogo
    },
    {
      name: 'SQL',
      proficiency: 'novice',
      logoSrc: sqlLogo
    },
    {
      name: 'Postgres',
      proficiency: 'novice',
      logoSrc: postgresLogo
    },
    {
      name: 'SQL Server',
      proficiency: 'novice',
      logoSrc: sqlServerLogo
    },
    {
      name: 'Rust',
      proficiency: 'learning',
      logoSrc: rustLogo
    },
    {
      name: 'Deno',
      proficiency: 'learning',
      logoSrc: denoLogo
    },
    {
      name: 'Auth0',
      proficiency: 'comfortable',
      logoSrc: auth0Logo
    },
    {
      name: 'GraphQL',
      proficiency: 'exploring',
      logoSrc: graphqlLogo
    },
    // devops
    {
      name: 'Docker',
      proficiency: 'comfortable',
      logoSrc: dockerLogo
    },
    {
      name: 'Github Actions',
      proficiency: 'comfortable',
      logoSrc: githubActionsLogo
    },
    {
      name: 'AWS',
      proficiency: 'novice',
      logoSrc: awsLogo
    },
    {
      name: 'Azure',
      proficiency: 'novice',
      logoSrc: azureLogo
    },
    {
      name: 'Terraform',
      proficiency: 'learning',
      logoSrc: tfLogo
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
