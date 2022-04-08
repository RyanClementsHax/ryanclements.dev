/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next/jest').default} */
const nextJest = /** @type {any} */ (require('next/jest'))

const createJestConfig = nextJest()

module.exports = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/tests/testSetup.tsx'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
})
