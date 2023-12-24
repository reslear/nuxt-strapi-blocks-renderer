module.exports = {
    root: true,
    extends: [
        '@nuxt/eslint-config',
    ],
    plugins: [
        '@stylistic',
    ],
    env: {
        node: true,
    },
    parser: 'vue-eslint-parser',
    ignorePatterns: ['dist/', 'node_modules/'],
    parserOptions: {
        ecmaVersion: 8,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    rules: {
        'func-style': ['warn'],
        'vue/multi-word-component-names': 'off',
        'vue/no-setup-props-destructure': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/html-indent': ['warn', 4],
        'vue/script-indent': ['warn', 4, {
            'baseIndent': 1,
        }],
        '@stylistic/arrow-parens': ['warn'],
        '@stylistic/arrow-spacing': ['warn'],
        '@stylistic/max-len': ['warn', 120 ],
        '@stylistic/semi': ['warn', 'always'],
        '@stylistic/brace-style': ['warn', 'stroustrup'],
        '@stylistic/quotes': ['warn', 'single'],
        '@stylistic/func-call-spacing': ['warn'],
        '@stylistic/block-spacing': ['warn'],
        '@stylistic/comma-spacing': ['warn'],
        '@stylistic/keyword-spacing': ['warn'],
        '@stylistic/type-annotation-spacing': ['warn'],
        '@stylistic/object-curly-spacing': ['warn', 'always'],
        '@stylistic/comma-dangle': ['warn', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'only-multiline',
            'exports': 'only-multiline',
            'functions': 'only-multiline',
        }],
        '@typescript-eslint/prefer-function-type': ['warn'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-import-type-side-effects': ['warn'],
        '@typescript-eslint/explicit-function-return-type': ['warn'],
    },
};
