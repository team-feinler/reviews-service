module.exports = {
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig'] //when using jest --watch flag, changes to globalConfig.json can cause an infinite loop. In order to avoid this unwanted behaviour, add globalConfig to ignored files in watch mode in the Jest configuation
};