import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Expect {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      func: <T = (...params: any[]) => any>(cb?: (fn: T) => void) => void
    }
  }
}

expect.extend(toHaveNoViolations)
expect.extend({
  func(received, cb) {
    if (typeof received !== 'function') {
      return {
        pass: false,
        message: () => 'expected received to be a function'
      }
    } else {
      cb?.(received)
      return {
        pass: true,
        message: () => 'expected received not to be a function'
      }
    }
  }
})

jest.mock('next/router', () => require('next-router-mock'))
