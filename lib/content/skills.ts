import jsLogo from 'public/tech-logos/javascript-logo.svg'
import tsLogo from 'public/tech-logos/typescript-logo.svg'
import reactLogo from 'public/tech-logos/react-logo.svg'
import nextjsLogo from 'public/tech-logos/nextjs-logo.svg'
import androidLogo from 'public/tech-logos/android-logo.svg'
import gradleLogo from 'public/tech-logos/gradle-logo.svg'
import vueLogo from 'public/tech-logos/vue-logo.svg'
import webpackLogo from 'public/tech-logos/webpack-logo.svg'
import cssLogo from 'public/tech-logos/css-logo.svg'
import htmlLogo from 'public/tech-logos/html-logo.svg'
import sassLogo from 'public/tech-logos/sass-logo.svg'
import tailwindLogo from 'public/tech-logos/tailwindcss-logo.svg'
import sbLogo from 'public/tech-logos/storybook-logo.svg'
import figmaLogo from 'public/tech-logos/figma-logo.svg'
import styledComponentsLogo from 'public/tech-logos/styled-components-logo.svg'
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
import dockerLogo from 'public/tech-logos/docker-logo.svg'
import githubActionsLogo from 'public/tech-logos/github-actions-logo.svg'
import awsLogo from 'public/tech-logos/aws-logo.svg'
import azureLogo from 'public/tech-logos/azure-logo.svg'
import javaLogo from 'public/tech-logos/java-logo.svg'
import kotlinLogo from 'public/tech-logos/kotlin-logo.svg'
import jetpackComposeLogo from 'public/tech-logos/jetpack-compose-logo.svg'
import dioxusLogo from 'public/tech-logos/dioxus-logo.png'

import { StaticImageData } from 'next/image'

export interface SkillInfo {
  name: string
  logoSrc: StaticImageData
  proficiency: ProficiencyLevel
}

export interface SkillGroupInfo {
  name: string
  skills: SkillInfo[]
}

export enum ProficiencyLevel {
  Proficient = 'Proficient',
  Comfortable = 'Comfortable',
  Novice = 'Novice',
  Learning = 'Learning',
  Exploring = 'Exploring'
}

export const skillGroups: SkillGroupInfo[] = [
  {
    name: 'Frontend',
    skills: [
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
        name: 'Android',
        proficiency: ProficiencyLevel.Comfortable,
        logoSrc: androidLogo
      },
      {
        name: 'Jetpack Compose',
        proficiency: ProficiencyLevel.Comfortable,
        logoSrc: jetpackComposeLogo
      },
      {
        name: 'Vue',
        proficiency: ProficiencyLevel.Comfortable,
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
        name: 'Styled Components',
        proficiency: ProficiencyLevel.Comfortable,
        logoSrc: styledComponentsLogo
      },
      {
        name: 'Storybook',
        proficiency: ProficiencyLevel.Proficient,
        logoSrc: sbLogo
      },
      {
        name: 'Figma',
        proficiency: ProficiencyLevel.Comfortable,
        logoSrc: figmaLogo
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
      },
      {
        name: 'Dioxus',
        proficiency: ProficiencyLevel.Exploring,
        logoSrc: dioxusLogo
      }
    ]
  },
  {
    name: 'Backend',
    skills: [
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
        name: 'Kotlin',
        proficiency: ProficiencyLevel.Proficient,
        logoSrc: kotlinLogo
      },
      {
        name: 'Gradle',
        proficiency: ProficiencyLevel.Comfortable,
        logoSrc: gradleLogo
      },
      {
        name: 'Java',
        proficiency: ProficiencyLevel.Comfortable,
        logoSrc: javaLogo
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
        proficiency: ProficiencyLevel.Novice,
        logoSrc: rustLogo
      },
      {
        name: 'Deno',
        proficiency: ProficiencyLevel.Novice,
        logoSrc: denoLogo
      }
    ]
  },
  {
    name: 'Devops',
    skills: [
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
      }
    ]
  }
]

export const allSkills = skillGroups.flatMap(x => x.skills)
