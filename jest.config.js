module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: './src/setup-jest.ts',
  "testResultsProcessor": "./node_modules/jest-html-reporter",	
  coverageReporters: [
    'html', 'text'
  ]
}
