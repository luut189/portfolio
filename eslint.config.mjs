import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';

const eslintConfig = defineConfig({
  extends: [
    ...nextVitals,
    ...nextTs,
    globalIgnores([
      // Default ignores of eslint-config-next:
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ]),
  ],
  plugins: {
    import: importPlugin,
  },
  rules: {
    'import/no-dynamic-require': 'warn',
    'import/no-nodejs-modules': 'warn',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'internal',
          'external',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
});

export default eslintConfig;
