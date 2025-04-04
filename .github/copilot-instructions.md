## Vitest

We use Vitest for unit testing.

We use `@testing-library/react` for testing React components via Vitest.

We extend Vitest with custom matchers from `@testing-library/jest-dom`.

We use `@testing-library/user-event` for simulating user interactions in Vitest tests.

We have Vitest configured to run in a browser-like environment using `jsdom`.

We don't have globals enabled in Vitest, so we need to import `describe`, `it`, and `expect` from Vitest in each test file.

We store all Vitest tests in `/src` alongside the file under test, and name the file the same as the file under test, but with a `.test.ts` extension.

## Playwright

We use Playwright for end-to-end testing.

We use Playwright's recommended locators when possible, as documented here: https://playwright.dev/docs/locators#quick-guide

We name our Playwright test files with the `.spec.ts` extension.

We store all Playwright tests in `/tests`.
