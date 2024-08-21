import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        exclude: ['**/node_modules', '**/dist', '.git', '.cache'],
        passWithNoTests: true
    },
    typecheck: {
        enabled: true,
        include: ['**/tests/types.test.ts']
    },
    coverage: {
        enabled: true,
        all: true,
        reporter: ['text', 'lcov', 'cobertura'],
        provider: 'v8',
        include: ['src'],
        exclude: [
            // All ts files that only contain types
            '**/*.{interface,type,d}.ts',
            // All index files that should be barrel-files containing only exports
            '**/*index.{js,ts}',
            // All export files that make subpackages available as submodules
            '**/exports/*.{js,ts}'
        ]
    }
})