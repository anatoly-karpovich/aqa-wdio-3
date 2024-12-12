export abstract class BasePage {
  async findElement(selector: string) {
    return $(selector);
  }

  async findArrayOfElements(selector: string) {
    return await $$(selector).getElements();
  }

  async waitForDisplayed(selector: string, reverse = false, timeout = 30000) {
    const element = await this.findElement(selector);
    await element.waitForDisplayed({
      reverse,
      timeout,
    });
    return element;
  }

  async click(selector: string) {
    const element = await this.waitForDisplayed(selector);
    await element.waitForEnabled();
    await element.click();
  }

  async setValue(selector: string, value: string | number) {
    const input = await this.waitForDisplayed(selector);
    await input.setValue(value);
  }

  async selectDropdownValue(selector: string, value: string | number) {
    const select = await this.waitForDisplayed(selector);
    await select.selectByVisibleText(value);
  }

  async getText(selector: string) {
    const element = await this.waitForDisplayed(selector);
    const text = await element.getText();
    return text;
  }

  async openPage(url: string) {
    await browser.url(url);
  }

  async deleteCookies(cookieNames: string[]) {
    await browser.deleteCookies(cookieNames);
  }
}
