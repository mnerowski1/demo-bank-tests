import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../common/side-menu-component';

export class PaymentPage {
  transferReceiverInput: Locator;
  transferAccountInput: Locator;
  transferAmountInput: Locator;
  executeTransferButton: Locator;
  confirmationMessage: Locator;
  closeButton: Locator;

  sideMenuComponent: SideMenuComponent;

  constructor(private page: Page) {
    this.transferReceiverInput = this.page.getByTestId('transfer_receiver');
    this.transferAccountInput = this.page.getByTestId('form_account_to');
    this.transferAmountInput = this.page.getByTestId('form_amount');
    this.executeTransferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.closeButton = this.page.getByTestId('close-button');
    this.confirmationMessage = this.page.locator('#show_messages');
    this.sideMenuComponent = new SideMenuComponent(this.page);
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
    await this.closeButton.click();
  }
}
