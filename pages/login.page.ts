import { Locator, Page } from '@playwright/test';

export class LoginPage {
  loginInput: Locator;
  userPasswordInput: Locator;
  loginButton: Locator;
  loginErrorMessage: Locator;
  passwordErrorMessage: Locator;
  userName: Locator;

  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId('login-input');
    this.userPasswordInput = this.page.getByTestId('password-input');
    this.loginButton = this.page.getByTestId('login-button');
    this.loginErrorMessage = this.page.getByTestId('error-login-id');
    this.passwordErrorMessage = this.page.getByTestId('error-login-password');
    this.userName = this.page.getByTestId('user-name');
  }

  async login(userId: string, userPassword: string): Promise<void> {
    await this.loginInput.fill(userId);
    await this.userPasswordInput.fill(userPassword);
    await this.loginButton.click();
  }
}
