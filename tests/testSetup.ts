import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => require('next-router-mock'))
