import {test, expect} from "@playwright/test";

test.describe('Desktop tests', () => {
    
  test('make a transaction', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester84');
    await page.getByTestId('password-input').fill('12345678');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption('1');
    await page.locator('#widget_1_transfer_amount').fill('120');
    await page.locator('#widget_1_transfer_title').fill('Refund');
    await page.locator('#execute_btn').click();
    //await page.getByRole('button', { name: 'wykonaj' }).click(); też jest poprawne
    await page.getByTestId('close-button').click();
    //await page.getByRole('link', { name: 'Przelew wykonany! Jan' }).click();

    await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Jan Demobankowy - 120,00PLN - Refund');
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