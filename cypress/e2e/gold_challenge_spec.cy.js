import { WeightChallengePage } from "../pages/WeightChallengePage";

describe('Solve Gold Bar Weight Challenge', () => {
  const weightChallengePage = new WeightChallengePage();
  let arrayOfSameWeightGoldBars = new Array(8);
  let baseGoldBar = 0;
  let fakeGoldBar = 0;
  let foundEqualWeight = false;
  let possibleFakeBars = new Array(2);
  let foundFinalFakeBar = false;

  it('Find Fake Bar', () => {
    weightChallengePage.visit();
    weightChallengePage.listOfWeighingsResults.should('not.exist'); //Verify no weights have been measured yet
    
    //First iteration
    weightChallengePage.getLeftBowlSquare('0').type('0');
    weightChallengePage.getRightBowlSquare('0').type('1');
    weightChallengePage.weightButton.click();

    //Make first Decision on weight value
    weightChallengePage.listOfWeighingsResults.eq(0).should('exist'); //Wait for first weight measure
    weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');
    cy.get('@currentWeightMeasure').then((text) => {
      // cy.log('the firstWeightMeasure is ' + text);
      if(weightChallengePage.foundEqualWeightResult(text) == true) {
        cy.log('Current weight measure found equal');
        arrayOfSameWeightGoldBars.push(0);
        arrayOfSameWeightGoldBars.push(1);
        foundEqualWeight = true;
      }
      cy.log('The current arrayOfGoldBars is' + arrayOfSameWeightGoldBars);

      if(weightChallengePage.foundGreaterThanWeightResult(text) == true) {
        cy.log('The left bar weight is greater than the right bar');
        fakeGoldBar = 1;
        cy.log('The fakeGoldBar is ' + fakeGoldBar);
      }

      if(weightChallengePage.foundLessThanWeightResult(text) == true) {
        cy.log('The left bar weight is less than the right bar');
        fakeGoldBar = 0;
        baseGoldBar = 1;
        cy.log('The fakeGoldBar is ' + fakeGoldBar + ' and the baseGoldBar is ' + baseGoldBar);
      }

      //Second Iteration
      //Reset values of bowls
      weightChallengePage.resetButton.click();

      if(foundEqualWeight == true) {
        cy.log('foundEqualWeight for second iteration start');
        weightChallengePage.getLeftBowlSquare('0').type('0');
        weightChallengePage.getLeftBowlSquare('1').type('1');
        weightChallengePage.getRightBowlSquare('0').type('2');
        weightChallengePage.getRightBowlSquare('1').type('3');
        weightChallengePage.weightButton.click();
        cy.log('Waiting for Second Iteration Weight');
        weightChallengePage.listOfWeighingsResults.eq(1).should('exist'); //Wait for second weight measure
        weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');
        cy.get('@currentWeightMeasure').then((text) => {
          // cy.log('the firstWeightMeasure is ' + text);
          if(weightChallengePage.foundEqualWeightResult(text) == true) {
            cy.log('Second Iteration: Current weight measure found equal');
            arrayOfSameWeightGoldBars.push(2);
            arrayOfSameWeightGoldBars.push(3);
            foundEqualWeight = true;
          }
          cy.log('The current arrayOfGoldBars is' + arrayOfSameWeightGoldBars);
    
          if(weightChallengePage.foundGreaterThanWeightResult(text) == true) {
            foundEqualWeight = false;
            cy.log('Second Iteration: The left bar weight is greater than the right bar');
            possibleFakeBars.push(2);
            possibleFakeBars.push(3);
            cy.log('The possibleFakeBars are ' + possibleFakeBars);

            //Find faker bar from 2 possible fakebars
            weightChallengePage.resetButton.click(); 
            weightChallengePage.getLeftBowlSquare('0').type(0);
            weightChallengePage.getRightBowlSquare('0').type(2);
            weightChallengePage.weightButton.click();
            weightChallengePage.listOfWeighingsResults.eq(2).should('exist'); //Wait for third weight measure
            weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');

            cy.get('@currentWeightMeasure').then((text) => {
              // cy.log('the firstWeightMeasure is ' + text);
              if(weightChallengePage.foundEqualWeightResult(text) == true) {
                cy.log('Found equal bar 0 and 2, the fakebar should be 3');
                foundFinalFakeBar = true;
                fakeGoldBar = 3;
              }

              if(weightChallengePage.foundGreaterThanWeightResult(text) == true) {
                cy.log('Found bar 0 greater than 2, the fakebar should be 2');
                foundFinalFakeBar = true;
                fakeGoldBar = 2;
              }
            });
          }
    
          // if(weightChallengePage.foundLessThanWeightResult(text) == true) {
          //   foundEqualWeight = false;
          //   cy.log('Second Iteration: The left bar weight is less than the right bar');
          //   fakeGoldBar = 0;
          //   baseGoldBar = 1;
          //   cy.log('The fakeGoldBar is ' + fakeGoldBar + ' and the baseGoldBar is ' + baseGoldBar);
          // }

          //Third Iteration
          if(foundEqualWeight == true) { //So far here, 0,1,2,3 are equal. Need to analyze 4,5,6,7,8
            //Reset values of bowls
            weightChallengePage.resetButton.click();
            cy.log('foundEqualWeight for third iteration start');
            weightChallengePage.getLeftBowlSquare('0').type('2');
            weightChallengePage.getLeftBowlSquare('1').type('3');
            weightChallengePage.getRightBowlSquare('0').type('4');
            weightChallengePage.getRightBowlSquare('1').type('5');
            weightChallengePage.weightButton.click();
            cy.log('Waiting for Third Iteration Weight');
            weightChallengePage.listOfWeighingsResults.eq(2).should('exist'); //Wait for third weight measure
            weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');
            cy.get('@currentWeightMeasure').then((text) => {
              // cy.log('the firstWeightMeasure is ' + text);
              if(weightChallengePage.foundEqualWeightResult(text) == true) {
                cy.log('Third Iteration: Current weight measure found equal');
                arrayOfSameWeightGoldBars.push(4);
                arrayOfSameWeightGoldBars.push(5);
                foundEqualWeight = true;

                //Find faker bar from 2 possible fakebars
                weightChallengePage.resetButton.click(); 
                weightChallengePage.getLeftBowlSquare('0').type(0);
                weightChallengePage.getRightBowlSquare('0').type(4);
                weightChallengePage.weightButton.click();
                weightChallengePage.listOfWeighingsResults.eq(3).should('exist'); //Wait for fourth weight measure
                weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');

                cy.get('@currentWeightMeasure').then((text) => {
                  // cy.log('the firstWeightMeasure is ' + text);
                  if(weightChallengePage.foundEqualWeightResult(text) == true) {
                    cy.log('Found equal bar 0 and 4, the fakebar should be 5');
                    foundFinalFakeBar = true;
                    fakeGoldBar = 5;
                  }

                  if(weightChallengePage.foundGreaterThanWeightResult(text) == true) {
                    cy.log('Found bar 0 greater than 5, the fakebar should be 4');
                    foundFinalFakeBar = true;
                    fakeGoldBar = 4;
                  }
                });
              }
              cy.log('The current arrayOfGoldBars is' + arrayOfSameWeightGoldBars);
        
              if(weightChallengePage.foundGreaterThanWeightResult(text) == true) {
                foundEqualWeight = false;
                cy.log('Third Iteration: The left bar weight is greater than the right bar');
                possibleFakeBars.push(4);
                possibleFakeBars.push(5);
                cy.log('The possibleFakeBars are ' + possibleFakeBars);
              }
        
              // if(weightChallengePage.foundLessThanWeightResult(text) == true) {
              //   foundEqualWeight = false;
              //   cy.log('Third Iteration: The left bar weight is less than the right bar');
              //   fakeGoldBar = 0;
              //   baseGoldBar = 1;
              //   cy.log('The fakeGoldBar is ' + fakeGoldBar + ' and the baseGoldBar is ' + baseGoldBar);
              // }

              //Fourth Iteration
              if(foundEqualWeight == true) { //So far here, 0,1,2,3,4,5 are equal. Need to analyze 6,7,8
                //Reset values of bowls
                weightChallengePage.resetButton.click();
                cy.log('foundEqualWeight for fourth iteration start');
                weightChallengePage.getLeftBowlSquare('0').type('4');
                weightChallengePage.getLeftBowlSquare('1').type('5');
                weightChallengePage.getRightBowlSquare('0').type('6');
                weightChallengePage.getRightBowlSquare('1').type('7');
                weightChallengePage.weightButton.click();
                cy.log('Waiting for Fourth Iteration Weight');
                weightChallengePage.listOfWeighingsResults.eq(3).should('exist'); //Wait for fourth weight measure
                weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');
                cy.get('@currentWeightMeasure').then((text) => {
                  // cy.log('the firstWeightMeasure is ' + text);
                  if(weightChallengePage.foundEqualWeightResult(text) == true) {
                    cy.log('Fourth Iteration: Current weight measure found equal');
                    arrayOfSameWeightGoldBars.push(6);
                    arrayOfSameWeightGoldBars.push(7);
                    foundEqualWeight = true;
                    foundFinalFakeBar = true;
                    fakeGoldBar = 8;
                    cy.log('The fake bar should be 8');
                  }
                  cy.log('The current arrayOfGoldBars is' + arrayOfSameWeightGoldBars);
            
                  if(weightChallengePage.foundGreaterThanWeightResult(text) == true) {
                    foundEqualWeight = false;
                    cy.log('Fourth Iteration: The left bar weight is greater than the right bar');
                    possibleFakeBars.push(6);
                    possibleFakeBars.push(7);
                    cy.log('The possibleFakeBars are ' + possibleFakeBars);
                  }
            
                  // if(weightChallengePage.foundLessThanWeightResult(text) == true) {
                  //   foundEqualWeight = false;
                  //   cy.log('Third Iteration: The left bar weight is less than the right bar');
                  //   fakeGoldBar = 0;
                  //   baseGoldBar = 1;
                  //   cy.log('The fakeGoldBar is ' + fakeGoldBar + ' and the baseGoldBar is ' + baseGoldBar);
                  // }
                  
                });
              }
            });
          }
        });
      } else {

      }

    });

  })
})