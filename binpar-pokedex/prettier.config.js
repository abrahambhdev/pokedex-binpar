/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
module.exports = {
  semi: true,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  trailingComma: "es5",
  bracketSameLine: false,
  quoteProps: "as-needed",
  bracketSpacing: true,
  printWidth: 80,
  endOfLine: "auto",
  arrowParens: "always",
  proseWrap: "preserve",
  overrides: [
    {
      files: "*.yml",
      options: {
        tabWidth: 8,
      }
    }
  ]
}
export default {
  plugins: ["prettier-plugin-tailwindcss"],
};
