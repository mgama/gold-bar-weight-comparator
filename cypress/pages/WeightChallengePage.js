export class WeightChallengePage {
    visit() {
      return cy.visit('https://sdetchallenge.fetch.com/');
    }
   
    get resetButton() {
      return cy.get('button#reset').last(); //They were 2 buttons with same id
    }
   
    get weightButton() {
      return cy.get('button#weigh')
    }

    getCoinNumber(number) {
      const locator = '#coin_' + number;
      return cy.get(locator);
    }

    getLeftBowlSquare(number) {
      const locator = '#left_' + number;
      return cy.get(locator);
    }

    getRightBowlSquare(number) {
        const locator = '#right_' + number;
        return cy.get(locator);
    }

    get lastWeighingsGeneralResult() {
        return cy.get('.game-info > ol > li').last();
  }

  get listOfWeighingsResults() {
    return cy.get('.game-info > ol > li');
  }

    foundEqualWeightResult(currentWeightMeasureText) {
        return currentWeightMeasureText.includes('=');
    }

    foundGreaterThanWeightResult(currentWeightMeasureText) {
        return currentWeightMeasureText.includes('>');
    }

    foundLessThanWeightResult(currentWeightMeasureText) {
        return currentWeightMeasureText.includes('>');
    }
}