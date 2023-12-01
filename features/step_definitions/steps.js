const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const {
  choiceDayAndSeances,
  choiceOneChairOrderHallTwo,
  buyTickets,
} = require("../../lib/commands.js");

let browser;
let page;
let number;
let chair;

Before(async function () {
  browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});

Given("user is on page {string}", async function (string) {
  await this.page.goto(string);
});

When(
  "user selects the day {string} and session {string}",
  async function (string, string2) {
    await choiceDayAndSeances(this.page, string, string2);
  }
);

When(
  "user chooses place {string} in the second hall",
  { timeout: 20000 },
  async function (string) {
    number = await choiceOneChairOrderHallTwo(this.page, string);
  }
);

When(
  "user chooses second place in the second hall",
  { timeout: 20000 },
  async function () {
    await choiceOneChairOrderHallTwo(this.page, number + 1);
  }
);

When("user buys a ticket by clicking on the button", async function () {
  await buyTickets(this.page);
});

When("user2 is on page {string}", async function (string) {
  await this.page.goto(string);
});

When(
  "user2 chose the same location as user",
  { timeout: 20000 },
  async function () {
    await page.waitForSelector(".buying");
    chair = await page.$$(".buying-scheme__chair");
    await chair[number].click();
  }
);

Then("user goes to the page {string}", async function (string) {
  const actual = await this.page.url();
  const expected = string;
  expect(actual).to.include(expected);
});

Then("user2 sees that the button is not activated", async function () {
  const button = await page.$eval("button", (elem) =>
    elem.getAttribute("disabled")
  );
  expect(button).contains(true);
});
