import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },

  // Test File Settings
  modulePathIgnorePatterns: ['lib', 'dist'],
  testMatch: ['**/*.(unit|spec|test).(j|t)s'],

  // Code Coverage Settings
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',

    // Ignore Coverage For these Files
    '!src/__tests__/**/*.ts',
    '!src/app.ts',
  ],
  coverageReporters: ['html', 'json', 'text'],
  reporters: ['default'],
};
export default config;