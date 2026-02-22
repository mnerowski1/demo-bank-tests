import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { DesktopPage } from '../pages/desktop.page';

test.describe('Desktop tests', () => {
  let desktopPage: DesktopPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);
    desktopPage = new DesktopPage(page);

    await page.goto('/');
    await loginPage.login(userId, userPassword);
  });

  test('make a transaction', async ({ page }) => {
    //Arrange
    const receiverId = '1';
    const transferAmount = '120';
    const transferTitle = 'Refund';
    const expectedMessage = `Przelew wykonany! Jan Demobankowy - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    await desktopPage.makeTransfer(receiverId, transferAmount, transferTitle);

    //Assert
    await expect(desktopPage.successMessage).toHaveText(expectedMessage);
  });

  test('successful phone top-up', async ({ page }) => {
    //Arrange
    const receiverPhone = '502 xxx xxx';
    const transferAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${transferAmount},00PLN na numer ${receiverPhone}`;

    //Act
    await desktopPage.makeTopUpTransfer(receiverPhone, transferAmount);

    //Assert
    await expect(desktopPage.successMessage).toHaveText(expectedMessage);
  });

  test('correct balance after successful phone top-up', async ({ page }) => {
    //Arrange
    const receiverPhone = '502 xxx xxx';
    const transferAmount = '50';
    const initialBalance = await desktopPage.moneyValueInfo.innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);

    //Act
    await desktopPage.makeTopUpTransfer(receiverPhone, transferAmount);

    //Assert
    await expect(desktopPage.moneyValueInfo).toHaveText(`${expectedBalance}`);
  });
});
