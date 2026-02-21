import { expect, Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../common/side-menu-component';

export class DesktopPage {
  transferReceiverInput: Locator;
  transferAmountInput: Locator;
  transferTitleInput: Locator;
  executeTransferButton: Locator;
  closeButton: Locator;
  successMessage: Locator;
  topUpTransferRecievierInput: Locator;
  topUpAmountInput: Locator;
  topUpAgreementCheckbox: Locator;
  topUpExecuteButton: Locator;
  moneyValueInfo: Locator;

  sideMenuComponent: SideMenuComponent;

  constructor(private page: Page) {
    this.transferReceiverInput = this.page.locator(
      '#widget_1_transfer_receiver',
    );
    this.transferAmountInput = this.page.locator('#widget_1_transfer_amount');
    this.transferTitleInput = this.page.locator('#widget_1_transfer_title');
    this.executeTransferButton = this.page.locator('#execute_btn');
    this.closeButton = this.page.getByTestId('close-button');
    this.successMessage = this.page.locator('#show_messages');
    this.topUpTransferRecievierInput = this.page.locator(
      '#widget_1_topup_receiver',
    );
    this.topUpAmountInput = this.page.locator('#widget_1_topup_amount');
    this.topUpAgreementCheckbox = this.page.locator(
      '#uniform-widget_1_topup_agreement',
    );
    this.topUpExecuteButton = this.page.locator('#execute_phone_btn');
    this.moneyValueInfo = this.page.locator('#money_value');
    this.sideMenuComponent = new SideMenuComponent(this.page);
  }

  async makeTransfer(
    receiverId: string,
    amount: string,
    title: string,
  ): Promise<void> {
    await this.transferReceiverInput.selectOption(receiverId);
    await this.transferAmountInput.fill(amount);
    await this.transferTitleInput.fill(title);
    await this.executeTransferButton.click();
    await this.closeButton.click();
  }

  async makeTopUpTransfer(
    receiverPhone: string,
    amount: string,
  ): Promise<void> {
    await this.topUpTransferRecievierInput.selectOption(receiverPhone);
    await this.topUpAmountInput.fill(amount);
    await this.topUpAgreementCheckbox.click();
    await this.topUpExecuteButton.click();
    await this.closeButton.click();
  }
}
