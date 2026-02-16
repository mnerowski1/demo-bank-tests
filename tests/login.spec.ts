import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with the correct credentials', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const expectedUserName = 'Jan Demobankowy';

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short user name', async ({ page }) => {
    //Arrange
    const incorrectUserId = 'tester';
    const charNumber = '8';
    const expectedMessage = `identyfikator ma min. ${charNumber} znaków`;

    //Act
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedMessage,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const incorrectPassword = '1234567';
    const charNumber = '8';
    const expectedMessage = `hasło ma min. ${charNumber} znaków`;

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedMessage,
    );
  });
});
