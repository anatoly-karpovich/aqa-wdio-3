import { ICredentials } from "../../data/types/signIn.types";
import homePage from "../pages/home.page";
import signInPage from "../pages/signIn.page";
import { SalesPortalPageService } from "./salesPortalPage.service";

class SignInPageService extends SalesPortalPageService {
  private signInPage = signInPage;
  private homePage = homePage;

  async openSalesPortal() {
    await this.signInPage.open();
  }

  async login(credentials: ICredentials) {
    await this.signInPage.fillCredentials(credentials);
    await this.signInPage.clickOnLoginButton();
    await this.homePage.waitForPageOpened();
  }

  async loginAsAdmin() {
    await this.login({
      email: "aqacourse@gmail.com",
      password: "password",
    });
  }
}

export default new SignInPageService();
