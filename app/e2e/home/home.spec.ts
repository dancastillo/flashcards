import { test, expect } from '@playwright/test';

test('Load home page from new window', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Flashcard App/);

  await page.getByRole('link', { name: 'Flashcard App' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
});

test('Home page loads when click on \'Flashcard App\'', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Flashcard App' }).click();
  await expect(page).toHaveTitle(/Flashcard App/);
  await page.getByRole('link', { name: 'Home' }).click();
});

test('Home page loads when click on \'Home\'', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveTitle(/Flashcard App/);
});

test.describe(() => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/*', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          'data': {
            'flashcards': [
              {
                'id': '6372f9415c9b9d0271953000',
                'question': 'question one',
                'answer': 'answer one',
                'category': 'category one',
                'subcategory': 'subcategory one',
                '__typename': 'Flashcard'
              },
              {
                'id': '6372f9655c9b9d0271953004',
                'question': 'question two',
                'answer': 'answer two',
                'category': 'category two',
                'subcategory': null,
                '__typename': 'Flashcard'
              },
            ]
          }
        })
      })
    });
  });
  
  test('Home page loads two flashcards', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByText('question one').click();
    await page.getByText('answer one').click();
    await page.getByText('question two').click();
    await page.getByText('answer two').click();
  });
});

test('Home page loads no data', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.route('**/graphql', route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        'data': {
          'flashcards': [],
        }
      })
    })
  });
  await expect(page.locator('h1')).toContainText('No flashcards found. Lets add some flashcards....');
});
