import { Locator, Page } from '@playwright/test';

export class GoldBarWeightChallengePage {
  page: Page;
  resetButton: Locator;
  weighButton: Locator;
  coinZero: Locator;
  coinOne: Locator;
  coinTwo: Locator;
  coinThree: Locator;
  coinFour: Locator;
  coinFive: Locator;
  coinSix: Locator;
  coinSeven: Locator;
  coinEight: Locator;
  leftBowlSquareZero: Locator;
  leftBowlSquareOne: Locator;
  leftBowlSquareTwo: Locator;
  leftBowlSquareThree: Locator;
  leftBowlSquareFour: Locator;
  leftBowlSquareFive: Locator;
  leftBowlSquareSix: Locator;
  leftBowlSquareSeven: Locator;
  leftBowlSquareEight: Locator;
  rightBowlSquareZero: Locator;
  rightBowlSquareOne: Locator;
  rightBowlSquareTwo: Locator;
  rightBowlSquareThree: Locator;
  rightBowlSquareFour: Locator;
  rightBowlSquareFive: Locator;
  rightBowlSquareSix: Locator;
  rightBowlSquareSeven: Locator;
  rightBowlSquareEight: Locator;
  weighingsGeneralResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resetButton = page.locator('button#reset');
    this.weighButton = page.locator('button#weigh');
    this.coinZero = page.locator('#coin_0');
    this.coinOne = page.locator('#coin_1');
    this.coinTwo = page.locator('#coin_2');
    this.coinThree = page.locator('#coin_3');
    this.coinFour = page.locator('#coin_4');
    this.coinFive = page.locator('#coin_5');
    this.coinSix = page.locator('#coin_6');
    this.coinSeven = page.locator('#coin_7');
    this.coinEight = page.locator('#coin_8');
    this.leftBowlSquareZero = page.locator('#left_0');
    this.leftBowlSquareOne = page.locator('#left_1');
    this.leftBowlSquareTwo = page.locator('#left_2');
    this.leftBowlSquareThree = page.locator('#left_3');
    this.leftBowlSquareFour = page.locator('#left_4');
    this.leftBowlSquareFive = page.locator('#left_5');
    this.leftBowlSquareSix = page.locator('#left_6');
    this.leftBowlSquareSeven = page.locator('#left_7');
    this.leftBowlSquareEight = page.locator('#left_8');
    this.rightBowlSquareZero = page.locator('#right_0');
    this.rightBowlSquareOne = page.locator('#right_1');
    this.rightBowlSquareTwo = page.locator('#right_2');
    this.rightBowlSquareThree = page.locator('#right_3');
    this.rightBowlSquareFour = page.locator('#right_4');
    this.rightBowlSquareFive = page.locator('#right_5');
    this.rightBowlSquareSix = page.locator('#right_6');
    this.rightBowlSquareSeven = page.locator('#right_7');
    this.rightBowlSquareEight = page.locator('#right_8');
    this.weighingsGeneralResult = page.locator('.game-info > ol > li');
  }

  async visitChallengeSite() {
    await this.page.goto('https://sdetchallenge.fetch.com/');
  }

  async getLatestWeighingResult() {
    return await this.weighingsGeneralResult.last();
  }


}