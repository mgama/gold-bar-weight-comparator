import { test, expect } from '@playwright/test';
import { GoldBarWeightChallengePage } from '../src/pageObjects/GoldBarWeightChallengePage';

test.describe('Solve Gold Bar Weight Challenge', () => {
    const allValuesArray = [0,1,2,3,4,5,6,7,8];
    let arrayOfSameWeightGoldBars = new Array<Number>();
    let foundEqualWeight = false;
    let currentFakeGoldbar: Number;
    let possibleFakeGoldbars = new Array<Number>();
    let finalFakeBar: Number;
    let foundFinalFakeBar = false;
    let i = 0;
    let oneToOneLastCompared = false;
    let twoToTwoLastCompared = false;
    let cycleCounter = 0;
    let firstValueToCompare = allValuesArray[0];
    let secondValueToCompare = allValuesArray[1];
    
    test('Try Solving The Challenge', async ({ page }) => {
        const goldBarWeightChallengePage = new GoldBarWeightChallengePage(page);
        goldBarWeightChallengePage.visitChallengeSite();
        await expect(goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(0);
        for(let i = 0; foundFinalFakeBar == false; i++) {
            if(foundEqualWeight == false && oneToOneLastCompared == false && twoToTwoLastCompared == false) {
                // if(currentFakeGoldbar)
                await goldBarWeightChallengePage.compareSingleLeftValueAndSingleRightValue(allValuesArray[i], allValuesArray[i+1]);
                oneToOneLastCompared = true;
                twoToTwoLastCompared = false;
            }
            if(foundEqualWeight == false && oneToOneLastCompared == true && twoToTwoLastCompared == false && possibleFakeGoldbars.length == 0 && currentFakeGoldbar == 0){
                await goldBarWeightChallengePage.compareDoubleLeftValueAndDoubleRightValue([allValuesArray[i],allValuesArray[i+1]], [allValuesArray[i+2],allValuesArray[i+3]]);
                oneToOneLastCompared = false;
                twoToTwoLastCompared = true;
            }

            //Make decision on weight value
            await expect(await goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(cycleCounter+1);
            const currentWeightValue = await (await goldBarWeightChallengePage.lastWeighingsGeneralResult).textContent();
            if(goldBarWeightChallengePage.foundEqualWeightResult(currentWeightValue) == true) {
                if(oneToOneLastCompared == true) {
                    arrayOfSameWeightGoldBars.push(allValuesArray[i]);
                    arrayOfSameWeightGoldBars.push(allValuesArray[i+1]);
                }
                if(twoToTwoLastCompared == true) {
                    arrayOfSameWeightGoldBars.push(allValuesArray[i]);
                    arrayOfSameWeightGoldBars.push(allValuesArray[i+1]);
                    arrayOfSameWeightGoldBars.push(allValuesArray[i+2]);
                    arrayOfSameWeightGoldBars.push(allValuesArray[i+3]);
                }
                foundEqualWeight = true;
                foundFinalFakeBar = true;
                finalFakeBar = 0; //To stop loop Debug
            }
            if(goldBarWeightChallengePage.foundGreaterThanWeightResult(currentWeightValue) == true) { // Example 0 > 1 or [0,1] > [2,3]
                if(oneToOneLastCompared == true) {
                    currentFakeGoldbar = allValuesArray[i+1];
                }
                if(twoToTwoLastCompared == true){
                    possibleFakeGoldbars.push(allValuesArray[i+2]);
                    possibleFakeGoldbars.push(allValuesArray[i+3]);
                }
                foundFinalFakeBar = true;
                finalFakeBar = 1; //To stop loop Debug
            }
            if(goldBarWeightChallengePage.foundLessThanWeightResult(currentWeightValue) == true) { // Example 0 < 1 or [0,1] < [2,3]
                if(oneToOneLastCompared == true) {
                    currentFakeGoldbar = allValuesArray[i];
                }
                if(twoToTwoLastCompared == true){
                    possibleFakeGoldbars.push(allValuesArray[i]);
                    possibleFakeGoldbars.push(allValuesArray[i+1]);
                }
                foundFinalFakeBar = true;
                finalFakeBar = 2; //To stop loop Debug
            } 
        }

        if(foundFinalFakeBar == true) {
            (await goldBarWeightChallengePage.getCoinNumber(finalFakeBar)).click();
            await goldBarWeightChallengePage.assertAlertMessageWinGame();
        }
    });

});