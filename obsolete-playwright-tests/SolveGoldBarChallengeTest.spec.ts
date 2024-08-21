import { test, expect } from '@playwright/test';
import { GoldBarWeightChallengePage } from '../src/pageObjects/GoldBarWeightChallengePage';

test.describe('Solve Gold Bar Weight Challenge', () => {
    const allValuesArray = [0,1,2,3,4,5,6,7,8];
    let arrayOfSameWeightGoldBars = new Array<Number>();
    let foundEqualWeight = false;
    let currentFakeGolbar: Number;
    let finalFakeBar: Number;
    let i = 0;
    
    test('Try Solving The Challenge', async ({ page }) => {
        const goldBarWeightChallengePage = new GoldBarWeightChallengePage(page);
        goldBarWeightChallengePage.visitChallengeSite();
        await expect(goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(0);
        //First iteration
        await goldBarWeightChallengePage.compareSingleLeftValueAndSingleRightValue(0,1);
        await expect(await goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(1);
        //Make first Decision on weight value
        const firstWeightValue = await (await goldBarWeightChallengePage.lastWeighingsGeneralResult).textContent();
        if(goldBarWeightChallengePage.foundEqualWeightResult(firstWeightValue) == true) {
            //0 = 1
            arrayOfSameWeightGoldBars.push(0);
            arrayOfSameWeightGoldBars.push(1);
            foundEqualWeight = true;

            //Second iteration
            // Compare [0,1] and [2,3]
            goldBarWeightChallengePage.compareDoubleLeftValueAndDoubleRightValue([0,1], [2,3]);
            await expect(await goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(2);
            //Make first Decision on weight value
            const secondWeightValue = await (await goldBarWeightChallengePage.lastWeighingsGeneralResult).textContent();
        } else {
            if(goldBarWeightChallengePage.foundGreaterThanWeightResult(firstWeightValue) == true) { // 0 > 1
                currentFakeGolbar = 1;
            }
            if(goldBarWeightChallengePage.foundLessThanWeightResult(firstWeightValue) == true) { // 0 < 1
                currentFakeGolbar = 0;
            }
            //Second iteration
            // Compare 0 and 2
            goldBarWeightChallengePage.compareSingleLeftValueAndSingleRightValue(0,2);
            await expect(await goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(2);
            const secondWeightValue = await (await goldBarWeightChallengePage.lastWeighingsGeneralResult).textContent();
            if(goldBarWeightChallengePage.foundEqualWeightResult(secondWeightValue) == true) {//0 = 2
                // This means that 1 is less than both 0 and 2, so it should be the fake goldbar
                finalFakeBar = 1;
                (await goldBarWeightChallengePage.getCoinNumber(1)).click();
            }
            if(goldBarWeightChallengePage.foundGreaterThanWeightResult(secondWeightValue) == true) {// 0 > 2
                if(currentFakeGolbar == 1) {

                }
                if(currentFakeGolbar == 0) {

                }
            }
            if(goldBarWeightChallengePage.foundLessThanWeightResult(secondWeightValue) == true) {// 0 < 2
                if(currentFakeGolbar == 0) { // This means that 0 is less than both 1 and 2
                    finalFakeBar = 0;
                    (await goldBarWeightChallengePage.getCoinNumber(0)).click();
                    await goldBarWeightChallengePage.assertAlertMessageWinGame();
                }
            }
        }
    });

});