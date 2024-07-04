const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function example() {
  const chromeOptions = new chrome.Options();
  chromeOptions.setChromeBinaryPath(
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  ); // Example path for Windows
  chromeOptions.setAcceptInsecureCerts(true); // Accept insecure certificates

  const waitTime = 20000; // Wait time for locating elements in milliseconds

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  // Function to safely click an element
  async function safeClick(selector, type = "css") {
    try {
      let element;
      if (type === "css") {
        element = await driver.wait(
          until.elementLocated(By.css(selector)),
          waitTime
        );
      } else if (type === "id") {
        element = await driver.wait(
          until.elementLocated(By.id(selector)),
          waitTime
        );
      }
      await driver.wait(until.elementIsVisible(element), waitTime);
      await element.click();
      console.log(`Clicked element: ${selector}`);
    } catch (error) {
      console.warn(`Element not found: ${selector}. Proceeding to next step.`);
    }
  }

  // Function to check if an element is present
  async function elementExists(selector, type = "css") {
    try {
      if (type === "css") {
        await driver.findElement(By.css(selector));
      } else if (type === "id") {
        await driver.findElement(By.id(selector));
      }
      console.log(`Element exists: ${selector}`);
      return true;
    } catch (error) {
      console.warn(`Element does not exist: ${selector}`);
      return false;
    }
  }

  try {
    await driver.get(
      "https://www.cambridgeone.org/dashboard/learner/dashboard"
    );

    // Wait for the username input field to be present (3 hours timeout)
    await driver.wait(
      until.elementLocated(By.id("gigya-loginID-56269462240752180")),
      3 * 60 * 60 * 1000
    );

    // Enter the username
    await driver
      .findElement(By.id("gigya-loginID-56269462240752180"))
      .sendKeys("drcm9404@gmail.com");

    // Enter the password and submit the form
    await driver
      .findElement(By.id("gigya-password-56383998600152700"))
      .sendKeys("Uisek2023", Key.RETURN);

    // Wait for the redirect to complete (adjust timeout as needed)
    await driver.wait(
      until.urlContains("/dashboard/learner/dashboard"),
      waitTime * 2
    );

    // Click the anchor tag
    await safeClick("a.no-decoration.tile-section-1.d-flex.align-items-center");

    // Add a short wait to ensure the page loads before looking for the task
    await driver.sleep(2000);

    // Check if the task element exists
    if (
      await elementExists("lo-1658983938267/1658983948437/1659077026975", "id")
    ) {
      await safeClick("lo-1658983938267/1658983948437/1659077026975", "id");
    }

    // Wait for the page to load and look for the "Next" button
    await safeClick('a[title="Next"]');

    // Add a short wait to ensure the page loads before looking for the checkboxes
    await driver.sleep(2000);

    // Check if the first checkbox element exists
    if (await elementExists("input-checkbox-s1-c0-2", "id")) {
      await safeClick("input-checkbox-s1-c0-2", "id");
    }

    // Check if the second checkbox element exists
    if (await elementExists("input-checkbox-s1-c0-4", "id")) {
      await safeClick("input-checkbox-s1-c0-4", "id");
    }

    // Locate and click the "Check" button
    await safeClick('a[title="Check"]');

    console.log(
      "Logged in successfully, clicked on the anchor tag, task, 'Next' button, checkboxes, and 'Check' button."
    );
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Quit the driver
    // await driver.quit();
  }
})();
