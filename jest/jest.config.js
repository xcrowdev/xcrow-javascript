module.exports = {
    rootDir: process.cwd(),
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    testMatch: ['<rootDir>/**/*.test.ts', '<rootDir>/**/*.test.tsx'],
    testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
    },
};
