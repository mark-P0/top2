/* prettier-ignore */
const words = `
virtuals
`.trim().split('\n')

/** @type {import('@cspell/cspell-types').CSpellSettings} */
const config = {
  words,
  allowCompoundWords: true,
};

module.exports = config;
