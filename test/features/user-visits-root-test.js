const assert = require("chai").assert;

describe("User visits root", () => {
  describe("posting a message", () => {
    it("saves the message with the author information", () => {
      const author = "Inquisitive User";
      const message = "Why test?";

      browser.url("/");
      browser.setValue("input[name=author]", "Inquisitive User");
      browser.setValue("input[name=message]", "Why test?");
      browser.click("input[type=submit]");

      assert.include(messagesText(), message);
      assert.include(messagesText(), author);
    });
  });

  const messagesText = () => browser.getText("[data-role=messages]");
});
