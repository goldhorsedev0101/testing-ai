import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { it, expect } from "vitest";
import Contact from "./Contact";

it("renders the Contact component with form elements", () => {
  render(<Contact />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Contact"
  );
  expect(screen.getByLabelText("Subject:")).toBeVisible();
  expect(screen.getByLabelText("Message:")).toBeVisible();
  expect(screen.getByRole("button", { name: "Submit" })).toBeVisible();
});

it("shows validation errors when submitting an empty form", async () => {
  const user = userEvent.setup();
  render(<Contact />);
  await user.click(screen.getByRole("button", { name: "Submit" }));
  expect(screen.getByText("Subject is required.")).toBeVisible();
  expect(screen.getByText("Message is required.")).toBeVisible();
});

it("clears validation errors and shows success message on valid form submission", async () => {
  const user = userEvent.setup();
  render(<Contact />);
  await user.type(screen.getByLabelText("Subject:"), "Test Subject");
  await user.type(screen.getByLabelText("Message:"), "Test Message");
  await user.click(screen.getByRole("button", { name: "Submit" }));
  expect(screen.queryByText("Subject is required.")).not.toBeInTheDocument();
  expect(screen.queryByText("Message is required.")).not.toBeInTheDocument();
  expect(screen.getByText("Form submitted successfully!")).toBeVisible();
});

it("shows validation error on blur if a field is empty", async () => {
  const user = userEvent.setup();
  render(<Contact />);
  const subjectInput = screen.getByLabelText("Subject:");
  await user.click(subjectInput);
  await user.tab(); // Move focus away
  expect(screen.getByText("Subject is required.")).toBeVisible();
});

it("does not show success message on subsequent submissions if form is invalid", async () => {
  const user = userEvent.setup();
  render(<Contact />);
  await user.type(screen.getByLabelText("Subject:"), "Test Subject");
  await user.click(screen.getByRole("button", { name: "Submit" }));
  expect(
    screen.queryByText("Form submitted successfully!")
  ).not.toBeInTheDocument();
  expect(screen.getByText("Message is required.")).toBeVisible();
});
