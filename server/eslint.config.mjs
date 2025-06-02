import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginSecurity from 'eslint-plugin-security';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginSecurity.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        rules: {
            '@typescript-eslint/no-var-requires': 0,
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];
