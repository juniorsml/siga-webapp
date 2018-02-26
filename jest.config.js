module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: './src/setup-jest.ts',
  coverageReporters: [
    'html', 'text'
  ]
}