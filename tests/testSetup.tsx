/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'
import { setGlobalConfig } from '@storybook/testing-react'
import * as globalStorybookConfig from '../.storybook/preview' // path of your preview.js file

setGlobalConfig(globalStorybookConfig)

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ objectFit, priority, objectPosition, ...props }: any) => (
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element,
    <img {...props} />
  )
}))
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => (
    <children.type {...children.props} href={href} />
  )
}))
jest.mock('../.storybook/decorators/ThemeDecorator')
