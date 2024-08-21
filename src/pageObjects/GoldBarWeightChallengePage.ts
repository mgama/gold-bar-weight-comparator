import { Locator, Page, expect } from '@playwright/test';

export class GoldBarWeightChallengePage {
  page: Page;
  resetButton: Locator;
  weighButton: Locator;
  listOfWeighingsResults: Locator;
  lastWeighingsGeneralResult: Locator;
  gameInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resetButton = page.locator('button#reset').last(); //They were 2 buttons with same id;
    this.weighButton = page.locator('button#weigh');
    this.listOfWeighingsResults = page.locator('.game-info > ol > li');
    this.lastWeighingsGeneralResult = page.locator('.game-info > ol > li').last();
    this.gameInfo = page.locator('.game-info');
  }

  async visitChallengeSite() {
    await this.page.goto('https://sdetchallenge.fetch.com/');
  }

  async getCoinNumber(number) {
    const locator = '#coin_' + number;
    return this.page.locator(locator);
  }

  async getLeftBowlSquare(number) {
    const locator = '#left_' + number;
    return this.page.locator(locator);
  }

  async getRightBowlSquare(number) {
    const locator = '#right_' + number;
    return this.page.locator(locator);
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

  assertAlertMessage(alertMessageToAssert: string) {
  // cy.on('window:alert', (str) => {
  //     expect(str).to.equal(alertMessageToAssert)
  //   })
    this.page.on("dialog", async (alert) => {
      const text = alert.message();
      console.log(text);;
      await alert.accept();
  })
  }

  async compareSingleLeftValueAndSingleRightValue(leftValue: number, rightValue: number) {
    await this.resetButton.click();
    //Wait for Bowls to be cleaned up
    expect (await (await this.getLeftBowlSquare(0)).textContent()).toEqual('');
    expect (await (await this.getLeftBowlSquare(1)).textContent()).toEqual('');
    expect (await (await this.getRightBowlSquare(0)).textContent()).toEqual('');
    expect (await (await this.getRightBowlSquare(1)).textContent()).toEqual('');
    //Enter values on bowls
    await (await this.getLeftBowlSquare(0)).fill(leftValue.toString());
    await (await this.getRightBowlSquare(0)).fill(rightValue.toString());
    await this.weighButton.click();
  }

  async compareDoubleLeftValueAndDoubleRightValue(leftValues: [number, number], rightValues: [number, number]){
    await this.resetButton.click();
    //Wait for Bowls to be cleaned up
    expect (await (await this.getLeftBowlSquare(0)).textContent()).toEqual('');
    expect (await (await this.getLeftBowlSquare(1)).textContent()).toEqual('');
    expect (await (await this.getRightBowlSquare(0)).textContent()).toEqual('');
    expect (await (await this.getRightBowlSquare(1)).textContent()).toEqual('');
      //Enter values on bowls
    await (await this.getLeftBowlSquare(0)).fill(leftValues[0].toString());
    await (await this.getLeftBowlSquare(1)).fill(leftValues[1].toString());
    await (await this.getRightBowlSquare(0)).fill(rightValues[0].toString());
    await (await this.getRightBowlSquare(1)).fill(rightValues[1].toString());
    await  this.weighButton.click();
  }

  async compareThreeLeftValuesAndThreeRightValues(leftValues: [number, number, number], rightValues: [number, number, number]){
    await this.resetButton.click();
    //Wait for Bowls to be cleaned up
    expect (await (await this.getLeftBowlSquare(0)).textContent()).toEqual('');
    expect (await (await this.getLeftBowlSquare(1)).textContent()).toEqual('');
    expect (await (await this.getRightBowlSquare(0)).textContent()).toEqual('');
    expect (await (await this.getRightBowlSquare(1)).textContent()).toEqual('');
      //Enter values on bowls
    await (await this.getLeftBowlSquare(0)).fill(leftValues[0].toString());
    await (await this.getLeftBowlSquare(1)).fill(leftValues[1].toString());
    await (await this.getLeftBowlSquare(2)).fill(leftValues[2].toString());
    await (await this.getRightBowlSquare(0)).fill(rightValues[0].toString());
    await (await this.getRightBowlSquare(1)).fill(rightValues[1].toString());
    await (await this.getRightBowlSquare(2)).fill(rightValues[2].toString());
    await  this.weighButton.click();
  }

  async compareFourLeftValuesAndFourRightValues(leftValues: [number, number, number, number], rightValues: [number, number, number, number]) {
    await this.resetButton.click();
    //Wait for Bowls to be cleaned up
    expect (await (await this.getLeftBowlSquare(0)).textContent()).toEqual('');
    expect (await (await this.getLeftBowlSquare(1)).textContent()).toEqual('');
    expect (await (await this.getRightBowlSquare(0)).textContent()).toEqual('');
    expect (await (await this.getRightBowlSquare(1)).textContent()).toEqual('');
    //Enter values on bowls
    await (await this.getLeftBowlSquare(0)).fill(leftValues[0].toString());
    await (await this.getLeftBowlSquare(1)).fill(leftValues[1].toString());
    await (await this.getLeftBowlSquare(2)).fill(leftValues[2].toString());
    await (await this.getLeftBowlSquare(3)).fill(leftValues[3].toString());
    await (await this.getRightBowlSquare(0)).fill(rightValues[0].toString());
    await (await this.getRightBowlSquare(1)).fill(rightValues[1].toString());
    await (await this.getRightBowlSquare(2)).fill(rightValues[2].toString());
    await (await this.getRightBowlSquare(3)).fill(rightValues[3].toString());
    await  this.weighButton.click();
  }

  async clickOnCoinNumberAndAssertAlertMessage(finalFakeBar: Number) {
    await (await this.getCoinNumber(finalFakeBar)).click();
    this.page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Yay! You find it!');
      await dialog.accept();
    });
  }

  async assertAlertMessageWinGame(){
    this.page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Yay! You find it!');
      await dialog.accept();
    });
  }

  async printFinalFakeBar(finalFakeBar: Number){
    process.stdout.write('The final fakebar found was ' + finalFakeBar);
  }

  async printOutListOfAllWeighinsPerformed() {
    process.stdout.write('The weighings performed during this test run were: ');
    let numberOfPerformedWeights = await (await this.listOfWeighingsResults).count();
    for(let i = 1; i != numberOfPerformedWeights + 1; i++) {
      let currentWeightText = await (await this.page.locator('.game-info > ol > li:nth-of-type(' + i + ')').textContent());
      if(currentWeightText != null){
        process.stdout.write(currentWeightText);
      }
    }
  }
}