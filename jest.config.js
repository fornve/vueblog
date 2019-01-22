module.exports = {
  cache: false,
  moduleFileExtensions: [ 'js', 'jsx', 'json', 'vue' ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    ".+\\.(css|styl|less|sass|scss|png|jpg|jpeg|mp3|ttf|woff|woff2)$": "jest-transform-stub",
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  transformIgnorePatterns: ['<rootDir>/node_modules/']
}
