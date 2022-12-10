/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'
import { setGlobalConfig } from '@storybook/testing-react'
import * as globalStorybookConfig from '../.storybook/preview' // path of your preview.js file

setGlobalConfig(globalStorybookConfig)

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/link', () => ({
  __esModule: true,
  default: (props: any) => <a {...props} />
}))
jest.mock('../.storybook/decorators/ThemeDecorator')
