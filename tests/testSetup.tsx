import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'
import { setProjectAnnotations } from '@storybook/testing-react'
import * as globalStorybookConfig from '../.storybook/preview'
import { LinkProps } from 'next/link'

setProjectAnnotations(globalStorybookConfig)

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => require('next-router-mock'))
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
