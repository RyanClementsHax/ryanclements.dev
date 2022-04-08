import tsLogo from 'public/tech-logos/typescript-logo.svg'
import nextjsLogo from 'public/tech-logos/nextjs-logo.svg'
import webpackLogo from 'public/tech-logos/webpack-logo.svg'
import tailwindLogo from 'public/tech-logos/tailwindcss-logo.svg'
import sbLogo from 'public/tech-logos/storybook-logo.svg'
import jestLogo from 'public/tech-logos/jest-logo.svg'
import aspnetCoreLogo from 'public/tech-logos/aspnet-core-logo.svg'
import postgresLogo from 'public/tech-logos/postgres-logo.svg'
import auth0Logo from 'public/tech-logos/auth0-logo.svg'
import csharpLogo from 'public/tech-logos/csharp-logo.svg'
import { StaticImageData } from 'next/image'

export interface Tech {
  name: string
  logoSrc: StaticImageData
}

export interface ProjectInfo {
  name: string
  description: string
  githubUrl?: string
  siteUrl?: string
  techs: Tech[]
}

export const projects: ProjectInfo[] = [
  {
    name: 'nPool',
    description:
      'A side business of mine designed to help NKN (a crypto coin) miners pool earnings',
    techs: [
      { name: 'Next.js', logoSrc: nextjsLogo },
      { name: 'Typescript', logoSrc: tsLogo },
      { name: 'C#', logoSrc: csharpLogo },
      { name: 'ASP.NET Core', logoSrc: aspnetCoreLogo },
      { name: 'Postgres', logoSrc: postgresLogo },
      { name: 'Auth0', logoSrc: auth0Logo }
    ]
  },
  {
    name: 'ryanclements.dev',
    description: 'My personal website that I built from scratch! 😁',
    githubUrl: 'https://github.com/RyanClementsHax/ryanclements.dev',
    siteUrl: 'https://ryanclements.dev',
    techs: [
      { name: 'Next.js', logoSrc: nextjsLogo },
      { name: 'Typescript', logoSrc: tsLogo },
      { name: 'Storybook', logoSrc: sbLogo },
      { name: 'Tailwindcss', logoSrc: tailwindLogo },
      { name: 'Jest', logoSrc: jestLogo }
    ]
  },
  {
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
  },
  {
    name: 'Tailwind Themer',
    description: 'An unopinionated, scalable, tailwindcss theming solution',
    githubUrl: 'https://github.com/RyanClementsHax/tailwindcss-themer',
    siteUrl: 'https://www.npmjs.com/package/tailwindcss-themer',
    techs: [
      { name: 'Typescript', logoSrc: tsLogo },
      { name: 'Tailwindcss', logoSrc: tailwindLogo },
      { name: 'Jest', logoSrc: jestLogo }
    ]
  }
]
