// CJS entry point for `eslint -f ./path/to/formatter-entry.cjs`
// ESLint 8 requires `module.exports` to be the formatter function directly.
module.exports = async function format(results) {
  const { formatResults } = await import('./formatter.js');
  const { loadConfig } = await import('./config.js');
  const config = loadConfig();
  return formatResults(results, config);
};
