import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import Contact from "./Contact";

describe("Contact Component", () => {
  it("renders the form with all fields and submit button", () => {
    render(<Contact />);
    expect(screen.getByLabelText(/subject/i)).toBeVisible();
    expect(screen.getByLabelText(/message/i)).toBeVisible();
    expect(screen.getByRole("button", { name: /submit/i })).toBeVisible();
  });

  it("shows validation errors when fields are empty and blurred", () => {
    render(<Contact />);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.blur(subjectInput);
    fireEvent.blur(messageInput);

    expect(screen.getByText(/subject is required/i)).toBeVisible();
    expect(screen.getByText(/message is required/i)).toBeVisible();
  });

  it("does not show validation errors initially", () => {
    render(<Contact />);
    expect(screen.queryByText(/subject is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/message is required/i)).not.toBeInTheDocument();
  });

  it("clears validation errors when valid input is provided", () => {
    render(<Contact />);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.blur(subjectInput);
    fireEvent.blur(messageInput);

    expect(screen.getByText(/subject is required/i)).toBeVisible();
    expect(screen.getByText(/message is required/i)).toBeVisible();

    fireEvent.change(subjectInput, { target: { value: "Valid Subject" } });
    fireEvent.change(messageInput, { target: { value: "Valid Message" } });

    expect(screen.queryByText(/subject is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/message is required/i)).not.toBeInTheDocument();
  });

  it.only("submits the form successfully when fields are valid", () => {
    render(<Contact />);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(subjectInput, { target: { value: "Valid Subject" } });
    fireEvent.change(messageInput, { target: { value: "Valid Message" } });
    fireEvent.click(submitButton);

    expect(screen.queryByText(/subject is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/message is required/i)).not.toBeInTheDocument();
    expect(subjectInput).toHaveValue("");
    expect(messageInput).toHaveValue("");
  });
});
