import { GetTextMethod } from "../../data/types/base.types";
import signInPage from "../pages/signIn.page";

export abstract class SalesPortalPageService {
  private basePage = signInPage;
  async validateNotification(text: string, method: GetTextMethod = "with") {
    const notification = await this.basePage.getNotificationText(text, method);
    expect(notification).toBe(text);
  }

  async signOut() {
    await this.basePage.deleteCookies(["Authorization"]);
  }
}
