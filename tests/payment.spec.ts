import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { DesktopPage } from '../pages/desktop.page';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);
    const desktopPage = new DesktopPage(page);

    await page.goto('/');
    await loginPage.login(userId, userPassword);
    await desktopPage.sideMenuComponent.paymentLink.click();

    paymentPage = new PaymentPage(page);
  });

  test('simple payment', async ({ page }) => {
    //Arrange
    const transferReviever = 'Jan Nowak';
    const transferAccount = '12 3456 7890';
    const transferAmount = '400';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReviever}`;

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
