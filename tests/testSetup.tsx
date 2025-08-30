import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'
import { setProjectAnnotations } from '@storybook/react'
import * as globalStorybookConfig from '../.storybook/preview'
import { LinkProps } from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: type correctly for Storybook v8
setProjectAnnotations(globalStorybookConfig as any) // TODO: type correctly for Storybook v8

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
