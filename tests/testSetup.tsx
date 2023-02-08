import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'
import { setGlobalConfig } from '@storybook/testing-react'
import * as globalStorybookConfig from '../.storybook/preview'
import { LinkProps } from 'next/link'

setGlobalConfig(globalStorybookConfig)

process.env = {
  ...process.env,
  NEXT_PUBLIC_VERCEL_URL: 'localhost:3000'
}

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, ...props }: LinkProps) => (
    <a href={href.toString()} {...props} />
  )
}))
jest.mock('../.storybook/decorators/ThemeDecorator')
