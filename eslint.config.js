const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.{js,ts}"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-inferrable-types": [
        "warn",
        {
          "ignoreParameters": true,
        },
      ],
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    // Global ignores (equivalent to .eslintignore)
    ignores: [
      "dist/**/*",
      "coverage/**/*",
      "**/*.d.ts",
      "src/public/**/*",
      "src/types/**/*",
      "node_modules/**/*",
      ".husky/**/*",
      "*.config.js",
    ],
  },
];
