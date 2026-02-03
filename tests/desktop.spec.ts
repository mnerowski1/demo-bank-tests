import { test, expect } from "@playwright/test";

test.describe('Desktop tests', () => {

  test('make a transaction', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'tester84';
    const userPassword = '12345678';;

    const receiverId = '1';
    const transferAmount = '120';
    const transferTitle = 'Refund';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.locator('#execute_btn').click();
    //await page.getByRole('button', { name: 'wykonaj' }).click(); też jest poprawne
    await page.getByTestId('close-button').click();
    //await page.getByRole('link', { name: 'Przelew wykonany! Jan' }).click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! Jan Demobankowy - ${transferAmount},00PLN - ${transferTitle}`);
  });

  test('successful phone top-up', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester84');
    await page.getByTestId('password-input').fill('12345678');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption('502 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('50');
    await page.locator('#uniform-widget_1_topup_agreement').click();
    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 50,00PLN na numer 502 xxx xxx');
  });

});