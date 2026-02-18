import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Desktop tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);

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
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.locator('#execute_btn').click();
    //await page.getByRole('button', { name: 'wykonaj' }).click(); też jest poprawne
    await page.getByTestId('close-button').click();
    //await page.getByRole('link', { name: 'Przelew wykonany! Jan' }).click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('successful phone top-up', async ({ page }) => {
    //Arrange
    const receiverPhone = '502 xxx xxx';
    const transferAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${transferAmount},00PLN na numer ${receiverPhone}`;

    //Act
    await page.locator('#widget_1_topup_receiver').selectOption(receiverPhone);
    await page.locator('#widget_1_topup_amount').fill(transferAmount);
    await page.locator('#uniform-widget_1_topup_agreement').click();
    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('correct balance after successful phone top-up', async ({ page }) => {
    //Arrange
    const receiverPhone = '502 xxx xxx';
    const transferAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);

    //Act
    await page.locator('#widget_1_topup_receiver').selectOption(receiverPhone);
    await page.locator('#widget_1_topup_amount').fill(transferAmount);
    await page.locator('#uniform-widget_1_topup_agreement').click();
    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
