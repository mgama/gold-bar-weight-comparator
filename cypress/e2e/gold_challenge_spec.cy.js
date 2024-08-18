import { WeightChallengePage } from "../pages/WeightChallengePage";

describe('Solve Gold Bar Weight Challenge', () => {
  const weightChallengePage = new WeightChallengePage();
  let arrayOfSameWeightGoldBars = new Array(8);
  let baseGoldBar = 0;
  let fakeGoldBar = 0;
  let foundEqualWeight = false;

  it('Find Fake Bar', () => {
    weightChallengePage.visit();
    
    //First iteration
    weightChallengePage.getLeftBowlSquare('0').type('0');
    weightChallengePage.getRightBowlSquare('0').type('1');
    weightChallengePage.weightButton.click();

    //Make first Decision on weight value
    weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('firstWeightMeasure');
    cy.get('@firstWeightMeasure').then((text) => {
      cy.log('the firstWeightMeasure is ' + text);
      if (text.includes('=')) {
        arrayOfSameWeightGoldBars.push(0);
        arrayOfSameWeightGoldBars.push(1);
        foundEqualWeight = true;
      }
      cy.log('The current arrayOfGoldBars is' + arrayOfSameWeightGoldBars);
      if (text.includes('>')) {
        cy.log('The left bar weight is greater than the right bar');
        fakeGoldBar = 1;
        cy.log('The fakeGoldBar is ' + fakeGoldBar);
      }

      if (text.includes('<')) {
        cy.log('The left bar weight is less than the right bar');
        fakeGoldBar = 0;
        baseGoldBar = 1;
        cy.log('The fakeGoldBar is ' + fakeGoldBar + ' and the baseGoldBar is ' + baseGoldBar);
      }

      //Second Iteration
      //Reset values of bowls
      weightChallengePage.resetButton.click();

      cy.log('The arrayOfSameWeightGoldBars length is' + arrayOfSameWeightGoldBars.length);
      if(foundEqualWeight == true) {
        cy.log('foundEqualWeight for second iteration start');
        weightChallengePage.getLeftBowlSquare('0').type('0');
        weightChallengePage.getLeftBowlSquare('1').type('1');
        weightChallengePage.getRightBowlSquare('0').type('2');
        weightChallengePage.getRightBowlSquare('1').type('3');
        weightChallengePage.weightButton.click();
      } else {
        
      }

    });

  })
})