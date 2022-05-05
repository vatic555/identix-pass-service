const { resolve } = require('path');

module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    '^@/(.*)$': resolve(__dirname, './src/$1'),
  },
}
