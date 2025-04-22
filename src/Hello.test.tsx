import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect } from "vitest";
import Hello from "./Hello";

it("renders the Hello component with a heading and paragraph", () => {
  render(<Hello />);

  const heading = screen.getByRole("heading", { name: /hello/i });
  const paragraph = screen.getByText(/this is the hello component\./i);

  expect(heading).toBeVisible();
  expect(paragraph).toBeVisible();
});

it("does not render any unexpected elements", () => {
  render(<Hello />);

  const unexpectedElement = screen.queryByText(/unexpected/i);

  expect(unexpectedElement).not.toBeInTheDocument();
});
