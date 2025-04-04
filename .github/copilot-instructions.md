## Vitest

We use Vitest for unit testing.

We use `@testing-library/react` for testing React components via Vitest.

We extend Vitest with custom matchers from `@testing-library/jest-dom`.

We don't use `fireEvent`. We use `@testing-library/user-event` for simulating user interactions in Vitest tests. We run `userEvent.setup()` before render.

We have Vitest configured to run in a browser-like environment using `jsdom`.

We don't have globals enabled in Vitest, so we import `it` and `expect` from Vitest in each test file.

We store all Vitest tests in `/src` alongside the file under test and the test's filename should end with `.test.ts`.

We import `import "@testing-library/jest-dom/vitest"` at the top of each test file.

We check for element visibility via `toBeVisible`.

We check for absence of elements via `not.toBeInTheDocument`.

We do NOT use a `describe` block at the top level of the test file.

## Playwright

We use Playwright for end-to-end testing.

We store all Playwright tests in `/tests`.

We name our Playwright test files with the `.spec.ts` extension.

We use Playwright's recommended locators when possible, as documented here: https://playwright.dev/docs/locators#quick-guide
