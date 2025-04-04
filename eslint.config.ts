import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import type { Linter } from 'eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig: Linter.FlatConfig[] = [
    ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
    {
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            'prettier/prettier': 'error',
            ...eslintConfigPrettier.rules, // Ensure Prettier rules are applied correctly
        },
    },
];

export default eslintConfig;
