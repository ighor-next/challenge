import { test, expect } from '@playwright/test';

test.describe('CreateTaskForm', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page containing the CreateTaskForm component
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

  test('should create a new task', async ({ page }) => {
    // Fill in the form fields
    await page.fill('input#titulo', 'Test Task');
    await page.fill('input#descricao', 'This is a test task description');
    await page.selectOption('select#status', 'Pendente');

    // Submit the form
    await page.click('button[type="submit"]');

    // // Wait for the task card to appear
    // await page.waitForSelector('div h3', { timeout: 60000  });

    // Verify that the new task appears in the task list
    const taskTitle = await page.getByTestId('titulo').first().textContent();
    const taskDescription = await page.getByTestId('descricao').first().textContent();
    expect(taskTitle).toBe('Test Task');
    expect(taskDescription).toBe('This is a test task description');
  });
});