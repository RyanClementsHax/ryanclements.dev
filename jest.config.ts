import nextJest from 'next/jest'

const createJestConfig = nextJest()

export default createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/tests/testSetup.tsx'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
})
