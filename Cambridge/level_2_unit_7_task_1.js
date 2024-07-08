const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function example() {
  const chromeOptions = new chrome.Options();
  chromeOptions.setChromeBinaryPath(
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  );
  chromeOptions.setAcceptInsecureCerts(true);

  const waitTime = 30000;

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

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
    await driver.wait(
      until.elementLocated(
        By.css("a.no-decoration.tile-section-1.d-flex.align-items-center")
      ),
      waitTime
    );
    const anchorTag = await driver.findElement(
      By.css("a.no-decoration.tile-section-1.d-flex.align-items-center")
    );
    await anchorTag.click();
    console.log("Clicked anchor tag");

    // Add a short wait to ensure the page loads before looking for the task
    await driver.sleep(2000);
    console.log("Waited for 2 seconds after clicking anchor tag");

    // Check if the task element exists
    const taskId = "lo-1658983938267/1658983948437/1659077026975";
    await driver.wait(until.elementLocated(By.id(taskId)), waitTime);
    const taskElement = await driver.findElement(By.id(taskId));
    await taskElement.click();
    console.log(`Clicked task element: ${taskId}`);

    // Add a longer wait to ensure the page loads before looking for the checkbox
    await driver.sleep(10000);
    console.log("Waited for 10 seconds");

    // await clickElement("a[title='Next']", "css");

    // // Use the function to click the checkbox inside the iframe
    // await clickElementInsideIframe(
    //   "iframe_1658983938267-1658983948437-1659077026975",
    //   "input-checkbox-s1-c0-4"
    // );

    // await clickElementInsideIframe(
    //   "iframe_1658983938267-1658983948437-1659077026975",
    //   "input-checkbox-s1-c0-2"
    // );

    // // Use the function to click the "Check" button
    // await clickElement("a[title='Check']", "css");
    // await clickElement("a[title='Next']", "css");

    // await driver.sleep(2000);

    // await clickElementInsideIframe(
    //   "iframe_1658983938267-1658983948437-1659077026975",
    //   "input-checkbox-s2-c0-1"
    // );
    // await clickElementInsideIframe(
    //   "iframe_1658983938267-1658983948437-1659077026975",
    //   "input-checkbox-s2-c0-0"
    // );
    // await clickElementInsideIframe(
    //   "iframe_1658983938267-1658983948437-1659077026975",
    //   "input-checkbox-s2-c0-3"
    // );

    // await clickElement("a[title='Check']", "css");
    // await clickElement("a[title='Next']", "css");

    await driver.sleep(10000);
    console.log("Waited for 10 seconds");

     await clickButtonNextToSpanWithText("catch", "034");

    console.log("Clicked on the sibling button next to the span element");

    await clickElement("a[title='Check']", "css");
    await clickElement("a[title='Next']", "css");

    await driver.sleep(2000);

    await clickElementInsideIframe(
      "iframe_1658983938267-1658983948437-1659077026975",
      "content-1720425200741054"
    );

    await clickElement("a[title='Check']", "css");
    await clickElement("a[title='Next']", "css");

    await driver.sleep(2000);

    await clickElementInsideIframe(
      "iframe_1658983938267-1658983948437-1659077026975",
      "input-checkbox-s5-c0-0"
    );
    await clickElementInsideIframe(
      "iframe_1658983938267-1658983948437-1659077026975",
      "input-checkbox-s5-c0-2"
    );
    await clickElementInsideIframe(
      "iframe_1658983938267-1658983948437-1659077026975",
      "input-checkbox-s5-c0-3"
    );

    await clickElement("a[title='Check']", "css");
    await clickElement("a[title='Next']", "css");

    await driver.sleep(2000);

    await clickElementInsideIframe(
      "iframe_1658983938267-1658983948437-1659077026975",
      "input-radio-s6-c0-1"
    );

    await clickElement("a[title='Check']", "css");
    await clickElement("a[title='Next']", "css");

    await driver.sleep(2000);

    await clickElementInsideIframe(
      "iframe_1658983938267-1658983948437-1659077026975",
      "content-1720425200818072"
    );

    await clickElement("a[title='Check']", "css");
    await clickElement("a[title='Next']", "css");

    await driver.sleep(2000);

    console.log("Script executed successfully");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Quit the driver
    // await driver.quit();
    console.log("Driver quit successfully");
  }

  // Function to check if an element is present
  async function elementExists(selector, type = "id") {
    try {
      if (type === "id") {
        await driver.findElement(By.id(selector));
      } else if (type === "css") {
        await driver.findElement(By.css(selector));
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

  // Function to click an element inside an iframe
  async function clickElementInsideIframe(iframeId, elementId) {
    try {
      await driver.wait(until.elementLocated(By.id(iframeId)), waitTime);
      await driver.switchTo().frame(driver.findElement(By.id(iframeId)));
      console.log("Switched to the iframe");

      await driver.wait(until.elementLocated(By.id(elementId)), waitTime);
      const element = await driver.findElement(By.id(elementId));
      await driver.wait(until.elementIsVisible(element), waitTime);
      await driver.wait(until.elementIsEnabled(element), waitTime);

      // Scroll the element into view
      await driver.executeScript("arguments[0].scrollIntoView(true);", element);

      // Use JavaScript to click the element
      await driver.executeScript("arguments[0].click();", element);
      console.log(`Clicked element inside iframe: ${elementId}`);

      // Switch back to the default content
      await driver.switchTo().defaultContent();
      console.log("Switched back to default content");
    } catch (error) {
      console.error(`Failed to click element inside iframe: ${error}`);
    }
  }

  // Function to click an element
  async function clickElement(selector, type = "css") {
    try {
      let element;
      if (type === "id") {
        element = await driver.findElement(By.id(selector));
      } else if (type === "css") {
        element = await driver.findElement(By.css(selector));
      } else if (type === "xpath") {
        element = await driver.findElement(By.xpath(selector));
      }
      await driver.wait(until.elementIsVisible(element), waitTime);
      await driver.wait(until.elementIsEnabled(element), waitTime);

      // Scroll the element into view
      await driver.executeScript("arguments[0].scrollIntoView(true);", element);

      // Use JavaScript to click the element
      await driver.executeScript("arguments[0].click();", element);
      console.log(`Clicked element: ${selector}`);
    } catch (error) {
      console.error(`Failed to click element: ${error}`);
    }
  }

  // Function to click an li element with a specific data-model-id attribute inside an iframe
  async function clickButtonNextToSpanWithText(text, endingId) {
    try {
      // Find all elements with class 'firstword'
      const elements = await driver.findElements(By.className("firstword"));

      // Iterate over each element
      for (const element of elements) {
        // Check if the element's text content matches the provided text
        const elementText = await element.getText();
        if (elementText.trim() === text) {
          // Find the parent element with an ID ending in the provided endingId
          const parentElement = await element.findElement(
            By.xpath(`ancestor::*[contains(@id, '${endingId}')]`)
          );

          // Find the sibling button element
          const buttonElement = await parentElement.findElement(
            By.xpath(`following-sibling::button`)
          );

          // Click on the button element
          await buttonElement.click();
          console.log(
            `Clicked on the sibling button next to the span element with text: ${text}`
          );

          // Break out of the loop if you only want to click the first matching element
          break;
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }



})();
