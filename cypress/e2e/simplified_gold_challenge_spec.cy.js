import { WeightChallengePage } from "../pages/WeightChallengePage";

describe('Solve Gold Bar Weight Challenge', () => {
  const weightChallengePage = new WeightChallengePage();
  let arrayOfSameWeightGoldBars = new Array(8);
  let baseGoldBar = 0;
  let fakeGoldBar = 0;
  let foundEqualWeight = false;
  let possibleFakeBars = new Array(2);
  let foundFinalFakeBar = false;
  let finishLogic = false;

  it('Find Fake Bar', () => {
    weightChallengePage.visit();
    weightChallengePage.listOfWeighingsResults.should('not.exist'); //Verify no weights have been measured yet
    
    //First iteration
    weightChallengePage.compareSingleLeftValueAndSingleRightValue(0,1);

    //Make first Decision on weight value
    weightChallengePage.listOfWeighingsResults.eq(0).should('exist'); //Wait for first weight measure
    weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');
    cy.get('@currentWeightMeasure').then((text) => {
      // cy.log('the firstWeightMeasure is ' + text);
      if(weightChallengePage.foundEqualWeightResult(text) == true) {
        cy.log('Current weight measure:  ' + text + ' found equal');
        arrayOfSameWeightGoldBars.push(0);
        arrayOfSameWeightGoldBars.push(1);
        foundEqualWeight = true;
        cy.log('The current arrayOfGoldBars is' + arrayOfSameWeightGoldBars);
      }

      if(weightChallengePage.foundGreaterThanWeightResult(text) == true) {
        cy.log('The left bar weight is greater than the right bar');
        fakeGoldBar = 1;
        cy.log('The fakeGoldBar is ' + fakeGoldBar);

        //Proceed to compare 0 and 2; if equal, then 1 is the fakegoldbar
        weightChallengePage.compareSingleLeftValueAndSingleRightValue(0,2);
        weightChallengePage.listOfWeighingsResults.eq(1).should('exist'); //Wait for second weight measure
        weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');
        cy.get('@currentWeightMeasure').then((text) => {
          if(weightChallengePage.foundEqualWeightResult(text) == true) {
            foundFinalFakeBar = true;
            fakeGoldBar = 1;
            cy.log('THE FAKE GOLBAR SHOULD BE 1');
            weightChallengePage.getCoinNumber(fakeGoldBar).click();
            weightChallengePage.assertAlertMessage('Yay! You find it!');
            finishLogic = true;
          }
        });
      }

      if(weightChallengePage.foundLessThanWeightResult(text) == true) {
        cy.log('The left bar weight is less than the right bar');
        fakeGoldBar = 0;
        baseGoldBar = 1;
        cy.log('The fakeGoldBar is ' + fakeGoldBar + ' and the baseGoldBar is ' + baseGoldBar);

        ///Proceed to compare 0 and 2; if 0 is less than 2, then it is the fake bar
        weightChallengePage.compareSingleLeftValueAndSingleRightValue(0,2);
        weightChallengePage.listOfWeighingsResults.eq(1).should('exist'); //Wait for second weight measure
        weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');
        cy.get('@currentWeightMeasure').then((text) => {
          if(weightChallengePage.foundLessThanWeightResult(text) == true) {
            foundFinalFakeBar = true;
            fakeGoldBar = 0;
            cy.log('THE FAKE GOLBAR SHOULD BE 0');
            weightChallengePage.getCoinNumber(fakeGoldBar).click();
            weightChallengePage.assertAlertMessage('Yay! You find it!');
            finishLogic = true;
          }
        });
      }

      //Second Iteration
      if(foundEqualWeight == true && finishLogic == false) {
        cy.log('foundEqualWeight for second iteration start');
        weightChallengePage.compareDoubleLeftValueAndDoubleRightValue([0,1],[2,3]);
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
            weightChallengePage.compareSingleLeftValueAndSingleRightValue(0,2);
            weightChallengePage.listOfWeighingsResults.eq(2).should('exist'); //Wait for third weight measure
            weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');

            cy.get('@currentWeightMeasure').then((text) => {
              // cy.log('the firstWeightMeasure is ' + text);
              if(weightChallengePage.foundEqualWeightResult(text) == true) {
                cy.log('Found equal bar 0 and 2, the fakebar should be 3');
                foundFinalFakeBar = true;
                fakeGoldBar = 3;
                weightChallengePage.getCoinNumber(fakeGoldBar).click();
                weightChallengePage.assertAlertMessage('Yay! You find it!');
                finishLogic = true;
              }

              if(weightChallengePage.foundGreaterThanWeightResult(text) == true) {
                cy.log('Found bar 0 greater than 2, the fakebar should be 2');
                foundEqualWeight = false;
                foundFinalFakeBar = true;
                fakeGoldBar = 2;
                weightChallengePage.getCoinNumber(fakeGoldBar).click();
                weightChallengePage.assertAlertMessage('Yay! You find it!');
                finishLogic = true;
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
            cy.log('foundEqualWeight for third iteration start');
            weightChallengePage.compareDoubleLeftValueAndDoubleRightValue([2,3],[4,5]);
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

                //Move to Fourth Weight Measure //So far, 0,1,2,3,4,5 are equal. Need to analyze 6,7,8
                weightChallengePage.compareDoubleLeftValueAndDoubleRightValue([4,5],[6,7]);
                weightChallengePage.listOfWeighingsResults.eq(3).should('exist'); //Wait for fourth weight measure
                weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');

                cy.get('@currentWeightMeasure').then((text) => {
                  // cy.log('the firstWeightMeasure is ' + text);
                  if(weightChallengePage.foundEqualWeightResult(text) == true) {
                    cy.log('Found 4,5 to equal 6,7; the fakebar should be 8');
                    foundFinalFakeBar = true;
                    fakeGoldBar = 8;
                    cy.log('We should try to click on the 8');
                    weightChallengePage.getCoinNumber('8').click();
                    weightChallengePage.assertAlertMessage('Yay! You find it!');
                    finishLogic = true;
                  }

                  if(weightChallengePage.foundGreaterThanWeightResult(text) == true) {
                    cy.log('Found 4,5 greater than 6,7, the fakebar is either 6 or 7');
                    possibleFakeBars.push(6);
                    possibleFakeBars.push(7);
                    // Compare 4 to 6. If equal, then the fake bar is 7
                    weightChallengePage.compareSingleLeftValueAndSingleRightValue(4,6);
                    weightChallengePage.listOfWeighingsResults.eq(4).should('exist'); //Wait for fifth weight measure
                    weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');

                    cy.get('@currentWeightMeasure').then((text) => {
                      // cy.log('the firstWeightMeasure is ' + text);
                      if(weightChallengePage.foundEqualWeightResult(text) == true) {
                        cy.log('Found 4 and 6 to be equal; the fakebar should be 7');
                        foundFinalFakeBar = true;
                        fakeGoldBar = 7;
                        cy.log('We should try to click on the 7');
                        weightChallengePage.getCoinNumber(fakeGoldBar).click();
                        weightChallengePage.assertAlertMessage('Yay! You find it!');
                        finishLogic = true;
                      }

                      if(weightChallengePage.foundGreaterThanWeightResult(text) == true) {
                        cy.log('Found 4 is greater than 6; the fakebar should be 7');
                        foundFinalFakeBar = true;
                        fakeGoldBar = 7;
                        cy.log('We should try to click on the 7');
                        weightChallengePage.getCoinNumber(fakeGoldBar).click();
                        weightChallengePage.assertAlertMessage('Yay! You find it!');
                        finishLogic = true;
                      }
                    });
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

                //Find faker bar from 2 possible fakebars
                weightChallengePage.compareSingleLeftValueAndSingleRightValue(0,4);
                weightChallengePage.listOfWeighingsResults.eq(3).should('exist'); //Wait for fifth weight measure
                weightChallengePage.lastWeighingsGeneralResult.invoke('text').as('currentWeightMeasure');

                cy.get('@currentWeightMeasure').then((text) => {
                  // cy.log('the firstWeightMeasure is ' + text);
                  if(weightChallengePage.foundEqualWeightResult(text) == true) {
                    cy.log('Found equal bar 0 and 4, the fakebar should be 5');
                    foundFinalFakeBar = true;
                    fakeGoldBar = 5;
                    weightChallengePage.getCoinNumber(fakeGoldBar).click();
                    weightChallengePage.assertAlertMessage('Yay! You find it!');
                    finishLogic = true;
                  }

                  if(weightChallengePage.foundGreaterThanWeightResult(text) == true) {
                    cy.log('Found bar 0 greater than 5, the fakebar should be 4');
                    foundFinalFakeBar = true;
                    fakeGoldBar = 4;
                    weightChallengePage.getCoinNumber(fakeGoldBar).click();
                    weightChallengePage.assertAlertMessage('Yay! You find it!');
                    finishLogic = true;
                  }
                });
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
                cy.log('foundEqualWeight for fourth iteration start, So far here, 0,1,2,3,4,5 are equal. Need to analyze 6,7,8');
                weightChallengePage.compareDoubleLeftValueAndDoubleRightValue([4,5],[6,7]);
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
                    weightChallengePage.getCoinNumber(fakeGoldBar).click();
                    weightChallengePage.assertAlertMessage('Yay! You find it!');
                    finishLogic = true;
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
        cy.log('More logic to do');
      }

    });

  })
})