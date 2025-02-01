import { test, expect } from '@playwright/test';

test.describe('TaskList', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page containing the TaskList component
    await page.goto('http://localhost:3000'); // Adjust the URL as needed

    // Mock local storage
    await page.addInitScript(() => {
      const mockLocalStorage: { [key: string]: string } = {};
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: (key: string) => mockLocalStorage[key] || null,
          setItem: (key: string, value: string) => {
            mockLocalStorage[key] = value;
          },
          removeItem: (key: string) => {
            delete mockLocalStorage[key];
          },
          clear: () => {
            Object.keys(mockLocalStorage).forEach(key => delete mockLocalStorage[key]);
          },
        },
        writable: true,
      });
    });
  });

  test('should create, update, and delete a task', async ({ page }) => {
    // Create a new task
    await page.fill('input#titulo', 'Test Task');
    await page.fill('input#descricao', 'This is a test task description');
    await page.selectOption('select#status', 'Pendente');
    await page.click('button[type="submit"]');

    // Wait for the task card to appear
    // await page.waitForSelector('div h3 div h3', { timeout: 60000 });

    // Verify that the new task appears in the task list
    const taskTitle = await page.getByTestId('titulo').first().textContent();
    const taskDescription = await page.getByTestId('descricao').first().textContent();
    expect(taskTitle).toBe('Test Task');
    expect(taskDescription).toBe('This is a test task description');

    // Update the task status by dragging and dropping the task card
    await page.dragAndDrop('[data-status="Pendente"]', '[data-column="Feito"]');

    // Wait for the task card to appear in the new status column
    await page.waitForSelector('[data-status="Feito"] h3', { timeout: 60000 });

    // Verify that the task status is updated
    const updatedTaskStatus = await page.textContent('[data-status="Feito"] h3');
    expect(updatedTaskStatus).toBe('Test Task');

    // Delete the task
    await page.click('[data-testid="delete-task"]');

    // Wait for the delete confirmation modal to appear
    await page.waitForSelector('[data-testid="confirm-delete"]', { timeout: 60000 });

    // Confirm the deletion in the modal
    await page.click('[data-testid="confirm-delete"]');

    // Verify that the task is deleted
    await page.waitForSelector('[data-status="Feito"]', { state: 'detached', timeout: 60000 });
    const taskList = await page.locator('[data-status="Feito"]');
    expect(taskList.count).toHaveLength(0);
  });
});