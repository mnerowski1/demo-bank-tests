import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);
    const paymentPage = new PaymentPage(page);

    await page.goto('/');
    await loginPage.login(userId, userPassword);
    await paymentPage.paymentPage.click();
  });

  test('simple payment', async ({ page }) => {
    //Arrange
    const transferReviever = 'Jan Nowak';
    const transferAccount = '12 3456 7890';
    const transferAmount = '400';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReviever}`;
    const paymentPage = new PaymentPage(page);

    //Act
    await paymentPage.makePayment(
      transferReviever,
      transferAccount,
      transferAmount,
    );

    //Assert
    await expect(paymentPage.confirmationMessage).toHaveText(expectedMessage);
  });
});
