import nextJest from 'next/jest'
import { Config } from 'jest'

export default async function createJestConfig(): Promise<Config> {
  const nextjsJestConfig = await nextJest()({
    setupFilesAfterEnv: ['<rootDir>/tests/testSetup.tsx'],
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jest-environment-jsdom'
  })()
  return {
    ...nextjsJestConfig,
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname'
    ]
  }
}
