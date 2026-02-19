import { Locator, Page } from '@playwright/test';

export class PaymentPage {
  paymentPage: Locator;
  transferReceiverInput: Locator;
  transferAccountInput: Locator;
  transferAmountInput: Locator;
  executeTransferButton: Locator;
  confirmationMessage: Locator;

  constructor(private page: Page) {
    this.paymentPage = this.page.getByRole('link', { name: 'płatności' });
    this.transferReceiverInput = this.page.getByTestId('transfer_receiver');
    this.transferAccountInput = this.page.getByTestId('form_account_to');
    this.transferAmountInput = this.page.getByTestId('form_amount');
    this.executeTransferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.confirmationMessage = this.page.locator('#show_messages');
  }

  async makePayment(
    receiver: string,
    account: string,
    amount: string,
  ): Promise<void> {
    await this.transferReceiverInput.fill(receiver);
    await this.transferAccountInput.fill(account);
    await this.transferAmountInput.fill(amount);
    await this.executeTransferButton.click();
  }
}
