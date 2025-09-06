import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'
import { setProjectAnnotations } from '@storybook/nextjs'
import * as globalStorybookConfig from '../.storybook/preview'
import { LinkProps } from 'next/link'

setProjectAnnotations(globalStorybookConfig)

expect.extend(toHaveNoViolations)

jest.mock('../.storybook/decorators/theme')
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, ...props }: LinkProps) => (
    <a href={href.toString()} {...props} />
  )
}))
jest.mock('lib/utils/useIsScrolledToTop', () => ({
  // if not mocked, causes act(...) errors in console
  useIsScrolledToTop: () => true
}))

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))
