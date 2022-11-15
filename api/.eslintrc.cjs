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
      "prettier",
      'plugin:import/typescript',
      'plugin:prettier/recommended'
  ],
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    'max-len': ['error', { code: 150 }],
    'prettier/prettier': 'off',
  },

}
