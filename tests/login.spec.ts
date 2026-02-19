import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with the correct credentials', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    //Assert
    await expect(loginPage.userName).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short user name', async ({ page }) => {
    //Arrange
    const incorrectUserId = 'tester';
    const charNumber = '8';
    const expectedMessage = `identyfikator ma min. ${charNumber} znaków`;
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.userPasswordInput.click();

    //Assert
    await expect(loginPage.loginErrorMessage).toHaveText(expectedMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const incorrectPassword = '1234567';
    const expectedMessage = `hasło ma min. 8 znaków`;
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.loginInput.fill(userId);
    await loginPage.userPasswordInput.fill(incorrectPassword);
    await loginPage.userPasswordInput.blur();

    //Assert
    await expect(loginPage.passwordErrorMessage).toHaveText(expectedMessage);
  });
});
