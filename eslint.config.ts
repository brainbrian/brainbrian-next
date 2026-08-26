import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import type { Linter } from 'eslint';

const eslintConfig: Linter.FlatConfig[] = [
    ...(nextCoreWebVitals as Linter.FlatConfig[]),
    ...(nextTypescript as Linter.FlatConfig[]),
    {
        // eslint-plugin-react's auto-detection crashes under ESLint 10's flat config
        // context (no more context.getFilename()); pin the version to skip it.
        settings: {
            react: {
                version: '19.2.8',
            },
        },
    },
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
