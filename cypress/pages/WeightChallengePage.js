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
        return currentWeightMeasureText.includes('<');
    }

    assertAlertMessage(alertMessageToAssert) {
    cy.on('window:alert', (str) => {
        expect(str).to.equal(alertMessageToAssert)
      })
    }

    compareSingleLeftValueAndSingleRightValue(leftValue, rightValue) {
        this.resetButton.click();
        //Wait for Bowls to be cleaned up
        this.getLeftBowlSquare(0).invoke('text').should('eq', '');
        this.getLeftBowlSquare(1).invoke('text').should('eq', '');
        this.getRightBowlSquare(0).invoke('text').should('eq', '');
        this.getRightBowlSquare(1).invoke('text').should('eq', '');
        //Enter values on bowls
        this.getLeftBowlSquare(0).type(leftValue);
        this.getRightBowlSquare(0).type(rightValue);
        this.weightButton.click();
    }

    compareDoubleLeftValueAndDoubleRightValue(leftValues, rightValues){
        this.resetButton.click();
        //Wait for Bowls to be cleaned up
        this.getLeftBowlSquare(0).invoke('text').should('eq', '');
        this.getLeftBowlSquare(1).invoke('text').should('eq', '');
        this.getRightBowlSquare(0).invoke('text').should('eq', '');
        this.getRightBowlSquare(1).invoke('text').should('eq', '');
        //Enter values on bowls
        this.getLeftBowlSquare(0).type(leftValues[0]);
        this.getLeftBowlSquare(1).type(leftValues[1]);
        this.getRightBowlSquare(0).type(rightValues[0]);
        this.getRightBowlSquare(1).type(rightValues[1]);
        this.weightButton.click();
    }
}