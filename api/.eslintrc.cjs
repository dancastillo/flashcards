module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      './tsconfig.json'
    ],
  },
  plugins: ['prettier', 'import', '@typescript-eslint'],
  extends: [
      "airbnb-typescript/base",
      "plugin:@typescript-eslint/recommended",
      "prettier"
  ],
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    'prettier/prettier': 'error',
  },

}
