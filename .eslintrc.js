module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ["tsconfig.json"]
  },
  plugins: [
    'react'
  ],
  ignorePatterns: ["reportWebVitals.ts", "react-app-env.d.ts"],
  rules: {
    "@typescript-eslint/semi": [2, "always"],
    "@typescript-eslint/indent": ["error", 4],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/member-delimiter-style": ["error", {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    }]
  }
}
