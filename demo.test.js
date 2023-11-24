const {
  choiceDayAndSeances,
  choiceOneChairOrderHallTwo,
  buyTickets,
} = require("./lib/commands.js");
let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("movie tests", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("happy path buy one ticket", async () => {
    await choiceDayAndSeances(page, 2, 0);
    await choiceOneChairOrderHallTwo(page, 0);
    await buyTickets(page);

    const url = await page.url();
    expect(url).toMatch("://qamid.tmweb.ru/client/ticket.php");
  });

  test("happy path buy two ticket", async () => {
    await choiceDayAndSeances(page, 2, 0);
    let number = await choiceOneChairOrderHallTwo(page, 0);
    await choiceOneChairOrderHallTwo(page, number + 1);
    await buyTickets(page);
    const url = await page.url();
    expect(url).toMatch("://qamid.tmweb.ru/client/ticket.php");
  });

  test("bad path the place is occupied", async () => {
    await choiceDayAndSeances(page, 2, 0);
    let number = await choiceOneChairOrderHallTwo(page, 0);
    await buyTickets(page);
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await choiceDayAndSeances(page, 2, 0);

    await page.waitForSelector(".buying");
    chair = await page.$$(".buying-scheme__chair");
    await chair[number].click();

    const button = await page.$eval("button", (elem) =>
      elem.getAttribute("disabled")
    );
    expect(button).toBeTruthy();
  });
});
