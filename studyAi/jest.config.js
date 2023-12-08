const nextJest = require("next/jest");
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const clientConfig = {
  displayName: "client",
  // Add more setup options before each test is run
  moduleDirectories: ["node_modules", "<rootDir>/"],
  // testMatch: ["**/__tests__/client/*.[jt]s?(x)"],
  setupFiles: ["./jest/mock/test-utils.tsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
};
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = async () => {
  const clientNextConfig = await createJestConfig(clientConfig)();
  const config = {
    projects: [
      clientNextConfig,
    ],
  };
  return config;
};