import { test, expect } from "@playwright/test";

test.describe("TodoMVC Accessibility Tests", () => {
  const appUrl = "https://demo.playwright.dev/todomvc";

  test.beforeEach(async ({ page }) => {
    await page.goto(appUrl);
  });

  test("should allow adding a new todo item", async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");
    await todoInput.fill("Buy groceries");
    await todoInput.press("Enter");

    const todoItem = page.locator("li:has-text('Buy groceries')");
    await expect(todoItem).toBeVisible();
  });

  test("should allow marking a todo item as completed", async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");
    await todoInput.fill("Walk the dog");
    await todoInput.press("Enter");

    const checkbox = page.getByRole("checkbox", { name: "Walk the dog" });
    await checkbox.check();

    const completedItem = page.locator("li:has-text('Walk the dog')");
    await expect(completedItem).toHaveClass(/completed/);
  });

  test("should allow deleting a todo item", async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");
    await todoInput.fill("Read a book");
    await todoInput.press("Enter");

    const todoItem = page.locator("li:has-text('Read a book')");
    await todoItem.hover();
    const deleteButton = todoItem.getByRole("button", { name: "Delete" });
    await deleteButton.click();

    await expect(todoItem).not.toBeVisible();
  });

  test("should allow filtering active todo items", async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");
    await todoInput.fill("Task 1");
    await todoInput.press("Enter");
    await todoInput.fill("Task 2");
    await todoInput.press("Enter");

    const checkbox = page.getByRole("checkbox", { name: "Task 1" });
    await checkbox.check();

    const activeFilter = page.getByRole("link", { name: "Active" });
    await activeFilter.click();

    const activeItem = page.locator("li:has-text('Task 2')");
    await expect(activeItem).toBeVisible();

    const completedItem = page.locator("li:has-text('Task 1')");
    await expect(completedItem).not.toBeVisible();
  });

  test("should allow clearing completed todo items", async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");
    await todoInput.fill("Task 1");
    await todoInput.press("Enter");
    await todoInput.fill("Task 2");
    await todoInput.press("Enter");

    const checkbox = page.getByRole("checkbox", { name: "Task 1" });
    await checkbox.check();

    const clearCompletedButton = page.getByRole("button", {
      name: "Clear completed",
    });
    await clearCompletedButton.click();

    const completedItem = page.locator("li:has-text('Task 1')");
    await expect(completedItem).not.toBeVisible();

    const activeItem = page.locator("li:has-text('Task 2')");
    await expect(activeItem).toBeVisible();
  });
});
