import { GetTextMethod } from "../../data/types/base.types";
import { BasePage } from "./base.page";

export abstract class SalesPortalPage extends BasePage {
  readonly ["Notification container"] = "div.toast-container";
  readonly Notification = `${this["Notification container"]} .toast-body`;
  readonly Spinner = ".spinner-border";

  abstract waitForPageOpened(): Promise<void>;

  async getNotificationByText(text: string, method: GetTextMethod = "with") {
    let notification: WebdriverIO.Element | undefined;
    await browser.waitUntil(
      async () => {
        const notifications = await this.findArrayOfElements(this.Notification);
        const foundNotification = await notifications.find<WebdriverIO.Element>(async (n) => {
          const notificationText = await n.getText();
          return method === "contains" ? notificationText.includes(text) : notificationText === text;
        });
        if (foundNotification) {
          notification = foundNotification;
        }
        return foundNotification;
      },
      {
        timeout: 10000,
        timeoutMsg: `Notification ${method} text ${text} not found`,
      }
    );
    if (!notification) throw notification;

    return notification;
  }

  async getNotificationText(text: string, method: GetTextMethod = "with") {
    const notification = await this.getNotificationByText(text, method);
    return await notification.getText();
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
