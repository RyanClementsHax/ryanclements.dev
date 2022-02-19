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
import { ProficiencyLevel } from './Proficiency'
import { SkillProps } from './Skill'

export const frontendSkills: SkillProps[] = [
  {
    name: 'Javascript',
    proficiency: ProficiencyLevel.Proficient,
    logoSrc: jsLogo
  },
  {
    name: 'Typescript',
    proficiency: ProficiencyLevel.Proficient,
    logoSrc: tsLogo
  },
  {
    name: 'React',
    proficiency: ProficiencyLevel.Proficient,
    logoSrc: reactLogo
  },
  {
    name: 'Next.js',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: nextjsLogo
  },
  {
    name: 'Gatsby',
    proficiency: ProficiencyLevel.Exploring,
    logoSrc: gatsbyLogo
  },
  {
    name: 'Vue',
    proficiency: ProficiencyLevel.Proficient,
    logoSrc: vueLogo
  },
  {
    name: 'Webpack',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: webpackLogo
  },
  {
    name: 'CSS',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: cssLogo
  },
  {
    name: 'HTML',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: htmlLogo
  },
  {
    name: 'SASS/SCSS',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: sassLogo
  },
  {
    name: 'Tailwindcss',
    proficiency: ProficiencyLevel.Proficient,
    logoSrc: tailwindLogo
  },
  {
    name: 'Jest',
    proficiency: ProficiencyLevel.Proficient,
    logoSrc: jestLogo
  },
  {
    name: 'Cypress',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: cyLogo
  }
]

export const backendSkills: SkillProps[] = [
  {
    name: 'C#',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: csharpLogo
  },
  {
    name: '.Net Core',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: dotnetCoreLogo
  },
  {
    name: 'ASP.NET Core',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: aspnetCoreLogo
  },
  {
    name: 'Entity Framework Core',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: efCoreLogo
  },
  {
    name: 'Node.js',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: nodeLogo
  },
  {
    name: 'SQL',
    proficiency: ProficiencyLevel.Novice,
    logoSrc: sqlLogo
  },
  {
    name: 'Postgres',
    proficiency: ProficiencyLevel.Novice,
    logoSrc: postgresLogo
  },
  {
    name: 'SQL Server',
    proficiency: ProficiencyLevel.Novice,
    logoSrc: sqlServerLogo
  },
  {
    name: 'Rust',
    proficiency: ProficiencyLevel.Learning,
    logoSrc: rustLogo
  },
  {
    name: 'Deno',
    proficiency: ProficiencyLevel.Learning,
    logoSrc: denoLogo
  },
  {
    name: 'Auth0',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: auth0Logo
  },
  {
    name: 'GraphQL',
    proficiency: ProficiencyLevel.Exploring,
    logoSrc: graphqlLogo
  }
]

export const devopsSkills: SkillProps[] = [
  {
    name: 'Docker',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: dockerLogo
  },
  {
    name: 'Github Actions',
    proficiency: ProficiencyLevel.Comfortable,
    logoSrc: githubActionsLogo
  },
  {
    name: 'AWS',
    proficiency: ProficiencyLevel.Novice,
    logoSrc: awsLogo
  },
  {
    name: 'Azure',
    proficiency: ProficiencyLevel.Novice,
    logoSrc: azureLogo
  },
  {
    name: 'Terraform',
    proficiency: ProficiencyLevel.Learning,
    logoSrc: tfLogo
  }
]

export const allSkills = [...frontendSkills, ...backendSkills, ...devopsSkills]
