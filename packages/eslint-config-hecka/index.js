import common from 'eslint-config-neon/flat/common.js'
import edge from 'eslint-config-neon/flat/edge.js'
import node from 'eslint-config-neon/flat/node.js'
import prettier from 'eslint-config-neon/flat/prettier.js'
import react from 'eslint-config-neon/flat/react.js'
import typescript from 'eslint-config-neon/flat/typescript.js'
import tseslint from 'typescript-eslint'
import merge from 'lodash.merge'

const commonFileExtensions = '{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
const commonFileGlob = `**/*${commonFileExtensions}`
const typescriptEslintFiles = ['tsconfig.eslint.json', 'apps/*/tsconfig.eslint.json', 'packages/*/tsconfig.eslint.json']

const commonRuleset = merge(...common, { files: [commonFileGlob]})
const nodeRuleset = merge(...node, { files: [commonFileGlob]})
const edgeRuleset = merge(...edge, { files: [commonFileGlob] })
const prettierRuleset = merge(...prettier, { files: [commonFileGlob] })

const reactRuleset = merge(...react, {
    files: [`apps/**/*${commonFileExtensions}`, `packages/ui/**/*${commonFileExtensions}`],
    rules: {
        'react/react-in-jsx-scope': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }]
    }
})

const typescriptRuleset = merge(...typescript, {
    files: [commonFileGlob],
    languageOptions: {
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
            allowAutomaticSingleRunInference: true,
            project: typescriptEslintFiles
        }
    },
    rules: {
        '@typescript-eslint/consistent-type-definitions': [2, 'interface'],
        '@typescript-eslint/naming-convention': [2, {
            selector: 'typeParameter',
            format: ['PascalCase'],
            custom: {
                regex: '^\\w{3,}',
				match: true
            }
        }]
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: typescriptEslintFiles
            }
        }
    }
})

export default tseslint.config(
    {
        ignores: [
            '**/node_modules/',
            '.git/',
            '**/dist/',
            '**/template/',
            '**/coverage/'
        ]
    },
    commonRuleset,
    nodeRuleset,
    typescriptRuleset,
    reactRuleset,
    edgeRuleset,
    {
        files: ['**/*{js,mjs,cjs,jsx}'],
        rules: { 'tsdoc/syntax': 0 }
    },
    prettierRuleset
)