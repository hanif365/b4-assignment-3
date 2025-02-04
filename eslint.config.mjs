import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // Variables
      'no-unused-vars': 'error',
      'no-undef': 'error',

      // Imports
      'no-duplicate-imports': 'error',

      // Variables declaration
      'no-var': 'error',
      'prefer-const': 'error',
      'no-const-assign': 'error',

      // Code style
      'no-unused-expressions': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      'comma-dangle': ['error', 'always-multiline'],

      // Console usage
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },
];
