module.exports = {
    globals: {
        'ts-jest': {
            config: 'test/tsconfig-test.json',
            diagnostics: false,
        }
    },
    testEnvironment: 'node',
    transform: {
        // '^.+\\.tsx?$': 'ts-jest'
        "^.+\\.ts$": "ts-jest"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testRegex: '(/unit/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
    testPathIgnorePatterns: ['dist', '/unit/mock-util.ts', '/unit/fixtures'],
    coverageDirectory: 'reports/coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 85,
            lines: 85,
            statements: 85
        }
    },
    rootDir: '../'
};
