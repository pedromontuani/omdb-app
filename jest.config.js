module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: [
    './node_modules',
    './example',
    './lib/',
    '<rootDir>/__tests__/test-utils.tsx',
  ],
  collectCoverageFrom: [
    'src/**/*.[jt]s?(x)',
    '!src/**/*.d.[jt]s?(x)',
    '!src/index.ts',
    '!src/types/index.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 40,
      branches: 40,
      functions: 40,
      lines: 40,
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-native-picker|@react-navigation|redux-persist)',
  ],
};
