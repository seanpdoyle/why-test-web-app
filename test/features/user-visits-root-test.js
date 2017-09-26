const assert = require("assert");

describe("User visits root", () => {
  describe("posting a message", () => {
    it("saves the message with the author information", () => {
      browser.url("/");
      browser.setValue("input[name=author]", "Inquisitive User");
      browser.setValue("input[name=message]", "Why test?");
      browser.click("input[type=submit]");

      assert.ok(browser.getText("[data-role=messages]").match(/Why test\?/));
      assert.ok(browser.getText("[data-role=messages]").match(/Inquisitive User/));
    });
  });
});
