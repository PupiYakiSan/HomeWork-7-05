module.exports = {
  choiceDayAndSeances: async function (page, day, seances) {
    try {
      await page.waitForSelector(".page-header");
      const dayPage = await page.$$(".page-nav__day");
      await dayPage[day].click();
      const seancesPage = await page.$$(".movie-seances__time-block");
      await seancesPage[seances].click();
    } catch (error) {
      throw new Error("Ошибка при выборе дня и сеанса");
    }
  },

  choiceOneChairOrderHallTwo: async function (page, countStart) {
    try {
      await page.waitForSelector(".buying");
      const chair = await page.$$(".buying-scheme__chair");
      let number = 0;
      for (let i = countStart; i < 100; i++) {
        await chair[i].click();
        const selectedChair = chair[i];
        const classNameProperty = await selectedChair.getProperty("className");
        const classNameValue = await classNameProperty.jsonValue();
        number = i;
        if (classNameValue.indexOf("buying-scheme__chair_taken") == -1) {
          break;
        }
      }
      return number;
    } catch (error) {
      throw new Error("Ошибка при выборе места");
    }
  },

  buyTickets: async function (page) {
    try {
      await page.click(".acceptin-button");
      await page.waitForSelector(".ticket");
      await page.click(".acceptin-button");
      await page.waitForSelector(".ticket__info-qr");
    } catch (error) {
      throw new Error("Ошибка при покупке билета");
    }
  },
};
