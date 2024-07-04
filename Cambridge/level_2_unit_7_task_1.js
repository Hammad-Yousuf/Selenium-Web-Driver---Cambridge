const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function example() {
  const chromeOptions = new chrome.Options();
  chromeOptions.setChromeBinaryPath(
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  ); // Example path for Windows
  chromeOptions.setAcceptInsecureCerts(true); // Accept insecure certificates

  const waitTime = 60000; // Increased wait time for locating elements in milliseconds

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  // Function to safely click an element by CSS selector
  async function safeClick(selector, type = "css") {
    try {
      console.log(`Trying to click element: ${selector}`);
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
      } else if (type === "xpath") {
        element = await driver.wait(
          until.elementLocated(By.xpath(selector)),
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
      } else if (type === "xpath") {
        await driver.findElement(By.xpath(selector));
      }
      console.log(`Element exists: ${selector}`);
      return true;
    } catch (error) {
      console.warn(`Element does not exist: ${selector}`);
      return false;
    }
  }

  // Function to click a checkbox based on the text it contains
  async function clickCheckboxByText(text) {
    try {
      console.log(`Looking for checkbox with text: ${text}`);
      const xpath = `//div[contains(@class, 'choice_interaction')]//span[@class='is-checkbox-choice-text' and text()='${text}']`;
      const checkboxSpan = await driver.wait(
        until.elementLocated(By.xpath(xpath)),
        waitTime
      );
      await driver.wait(until.elementIsVisible(checkboxSpan), waitTime);
      const checkboxDiv = await checkboxSpan.findElement(
        By.xpath('ancestor::div[contains(@class, "input-checkbox")]')
      );
      await checkboxDiv.click();
      console.log(`Clicked checkbox with text: ${text}`);
    } catch (error) {
      console.warn(`Checkbox with text "${text}" not found. Error: ${error}`);
    }
  }

  try {
    console.log("Starting script...");

    await driver.get(
      "https://www.cambridgeone.org/dashboard/learner/dashboard"
    );
    console.log("Opened Cambridge One dashboard");

    // Wait for the username input field to be present (3 hours timeout)
    await driver.wait(
      until.elementLocated(By.id("gigya-loginID-56269462240752180")),
      3 * 60 * 60 * 1000
    );
    console.log("Username input field located");

    // Enter the username
    await driver
      .findElement(By.id("gigya-loginID-56269462240752180"))
      .sendKeys("drcm9404@gmail.com");
    console.log("Entered username");

    // Enter the password and submit the form
    await driver
      .findElement(By.id("gigya-password-56383998600152700"))
      .sendKeys("Uisek2023", Key.RETURN);
    console.log("Entered password and submitted form");

    // Wait for the redirect to complete (adjust timeout as needed)
    await driver.wait(
      until.urlContains("/dashboard/learner/dashboard"),
      waitTime * 2
    );
    console.log("Redirect completed to learner dashboard");

    // Click the anchor tag
    await safeClick("a.no-decoration.tile-section-1.d-flex.align-items-center");
    console.log(
      "Clicked element: a.no-decoration.tile-section-1.d-flex.align-items-center"
    );

    // Add a short wait to ensure the page loads before looking for the task
    await driver.sleep(2000);
    console.log("Waited for 2 seconds after clicking anchor tag");

    // Check if the task element exists
    if (
      await elementExists("lo-1658983938267/1658983948437/1659077026975", "id")
    ) {
      await safeClick("lo-1658983938267/1658983948437/1659077026975", "id");
    }

    // Wait for the page to load and look for the "Next" button
    await safeClick('a[title="Next"]');
    console.log('Clicked "Next" button');

    // Add a longer wait to ensure the page loads before looking for the checkboxes
    await driver.sleep(5000);
    console.log("Waited for 5 seconds after clicking 'Next' button");

    // Explicitly wait for the presence of the choice_interaction elements
    const choiceInteractionExists = await elementExists("content-1", "id");
    if (choiceInteractionExists) {
      console.log("Located choice_interaction elements");

      // Click the checkbox elements with specific text values
      await clickCheckboxByText("comment");
      await clickCheckboxByText("respond to");

      // Locate and click the "Check" button
      await safeClick('a[title="Check"]');
      console.log('Clicked "Check" button');

      console.log(
        "Logged in successfully, clicked on the anchor tag, task, 'Next' button, checkboxes, and 'Check' button."
      );
    } else {
      console.error(
        "Choice interaction elements not found. Script cannot proceed."
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Quit the driver
    // await driver.quit();
    console.log("Driver quit successfully");
  }
})();
