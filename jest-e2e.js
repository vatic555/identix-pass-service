const { resolve } = require('path');

module.exports = {
  "moduleFileExtensions": ["js", "json", "ts"],
  "roots": [
  "."
  ],
  "testEnvironment": "node",
  "testMatch": ['**/+(*.)+(e2e-spec|e2e-test).+(ts|js)?(x)'],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    '^@/(.*)$': resolve(__dirname, './src/$1'),
  },
}