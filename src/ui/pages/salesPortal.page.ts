import { BasePage } from "./base.page";

export abstract class SalesPortalPage extends BasePage {
  readonly Notification = ".toast-body";
  readonly Spinner = ".spinner-border";

  abstract waitForPageOpened(): Promise<void>;

  async getNotificationText() {
    await this.waitForDisplayed(this.Notification);
    return await this.getText(this.Notification);
  }

  async waitForSpinnersToBeHidden(page: string) {
    const spinners = await this.findArrayOfElements(this.Spinner);
    await browser.waitUntil(
      async () => {
        const result = await spinners.every(async (spinner) => !(await spinner.isDisplayed()));
        return result;
      },
      {
        timeout: 30000,
        timeoutMsg: `Spinners are still displayed on ${page} Page after 30 seconds`,
      }
    );
  }
}
