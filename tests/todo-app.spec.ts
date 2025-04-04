import { test, expect } from "@playwright/test";

test.describe("TodoMVC App", () => {
  const appUrl = "https://demo.playwright.dev/todomvc";

  test.beforeEach(async ({ page }) => {
    await page.goto(appUrl);
  });

  test("should allow adding a new todo", async ({ page }) => {
    await page.locator(".new-todo").fill("Buy groceries");
    await page.locator(".new-todo").press("Enter");
    const todoText = await page.locator(".todo-list li").first().textContent();
    expect(todoText).toBe("Buy groceries");
  });

  test("should allow marking a todo as completed", async ({ page }) => {
    await page.locator(".new-todo").fill("Complete assignment");
    await page.locator(".new-todo").press("Enter");
    await page.locator(".todo-list li .toggle").click();
    const isCompleted = await page
      .locator(".todo-list li")
      .first()
      .getAttribute("class");
    expect(isCompleted).toContain("completed");
  });

  test("should allow deleting a todo", async ({ page }) => {
    await page.locator(".new-todo").fill("Clean the house");
    await page.locator(".new-todo").press("Enter");
    await page.locator(".todo-list li").hover();
    await page.locator(".todo-list li .destroy").click();
    const todoCount = await page.locator(".todo-list li").count();
    expect(todoCount).toBe(0);
  });

  test("should filter active todos", async ({ page }) => {
    await page.locator(".new-todo").fill("Task 1");
    await page.locator(".new-todo").press("Enter");
    await page.locator(".new-todo").fill("Task 2");
    await page.locator(".new-todo").press("Enter");
    await page.locator(".todo-list li .toggle").first().click();
    await page.locator("text=Active").click();
    const visibleTodos = await page.locator(".todo-list li").count();
    expect(visibleTodos).toBe(1);
    const todoText = await page.locator(".todo-list li").first().textContent();
    expect(todoText).toBe("Task 2");
  });

  test("should filter completed todos", async ({ page }) => {
    await page.locator(".new-todo").fill("Task 1");
    await page.locator(".new-todo").press("Enter");
    await page.locator(".new-todo").fill("Task 2");
    await page.locator(".new-todo").press("Enter");
    await page.locator(".todo-list li .toggle").first().click();
    await page.locator("text=Completed").click();
    const visibleTodos = await page.locator(".todo-list li").count();
    expect(visibleTodos).toBe(1);
    const todoText = await page.locator(".todo-list li").first().textContent();
    expect(todoText).toBe("Task 1");
  });

  test("should clear completed todos", async ({ page }) => {
    await page.locator(".new-todo").fill("Task 1");
    await page.locator(".new-todo").press("Enter");
    await page.locator(".todo-list li .toggle").click();
    await page.locator("text=Clear completed").click();
    const todoCount = await page.locator(".todo-list li").count();
    expect(todoCount).toBe(0);
  });
});
