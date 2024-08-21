import { test, expect } from '@playwright/test';
import { GoldBarWeightChallengePage } from '../src/pageObjects/GoldBarWeightChallengePage';

test.describe('Solve Gold Bar Weight Challenge', () => {
    // const allValuesArray = [0,1,2,3,4,5,6,7,8]; //For reference only
    let arrayOfSameWeightGoldBars = new Array<Number>();
    let currentFakeGolbar: Number;
    let finalFakeBar: Number;
    let lastWeightValue: any;
    let numberOfPerformedWeights = 0;
    
    test('Find the fake gold bar', async ({ page }) => {
        const goldBarWeightChallengePage = new GoldBarWeightChallengePage(page);
        goldBarWeightChallengePage.visitChallengeSite();
        await expect(goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(0); 
        //First iteration: Compare 0 to 1
        await goldBarWeightChallengePage.compareSingleLeftValueAndSingleRightValue(0,1);
        await expect(await goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(1); 
        //Make first Decision on weight value
        lastWeightValue = await (await goldBarWeightChallengePage.lastWeighingsGeneralResult).textContent();
        if(goldBarWeightChallengePage.foundEqualWeightResult(lastWeightValue) == true) { //0 = 1
            arrayOfSameWeightGoldBars.push(0);
            arrayOfSameWeightGoldBars.push(1);

            //Second iteration (Shortest path)
            // Compare [0,1] and [2,3]
            goldBarWeightChallengePage.compareDoubleLeftValueAndDoubleRightValue([0,1], [2,3]);
            await expect(await goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(2); 
            //Make second Decision on weight value (shortest path)
            lastWeightValue = await (await goldBarWeightChallengePage.lastWeighingsGeneralResult).textContent();
            if(goldBarWeightChallengePage.foundEqualWeightResult(lastWeightValue) == true) { //[0,1] = [2,3]
                arrayOfSameWeightGoldBars.push(2);
                arrayOfSameWeightGoldBars.push(3);

                //Third iteration (Shortest path)
                //Compare [0,1,2,3] and [4,5,6,7]
                goldBarWeightChallengePage.compareFourLeftValuesAndFourRightValues([0,1,2,3], [4,5,6,7]);
                await expect(await goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(3);
                //Make third Decision on weight value (shortest path)
                lastWeightValue = await (await goldBarWeightChallengePage.lastWeighingsGeneralResult).textContent();
                if(goldBarWeightChallengePage.foundEqualWeightResult(lastWeightValue) == true) { //[0,1,2,3] = [4,5,6,7]
                    arrayOfSameWeightGoldBars.push(4);
                    arrayOfSameWeightGoldBars.push(5);
                    arrayOfSameWeightGoldBars.push(6);
                    arrayOfSameWeightGoldBars.push(7);
                    finalFakeBar = 8;
                    //The fakebar should be 8 (Shortest path)
                    await goldBarWeightChallengePage.clickOnCoinNumberAndAssertAlertMessage(finalFakeBar);
                } else {
                    if(goldBarWeightChallengePage.foundGreaterThanWeightResult(lastWeightValue) == true) { //[0,1,2,3] > [4,5,6,7]
                        //In this scenario, one of the fakebars is 4,5,6 or 7
                        //Fourth Iteration
                        //Compare [0,1,2] and [4,5,6]
                        goldBarWeightChallengePage.compareThreeLeftValuesAndThreeRightValues([0,1,2],[4,5,6]);
                        await expect(await goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(4);
                        //Make fourth Decision on weight value
                        lastWeightValue = await (await goldBarWeightChallengePage.lastWeighingsGeneralResult).textContent();
                        if(goldBarWeightChallengePage.foundEqualWeightResult(lastWeightValue) == true) { //[0,1,2] = [4,5,6]
                            // Since we know that 3 is equal to 0,1 and 2, the fakebar should be 7
                            finalFakeBar = 7;
                            await goldBarWeightChallengePage.clickOnCoinNumberAndAssertAlertMessage(finalFakeBar);
                        } else {
                            if(goldBarWeightChallengePage.foundGreaterThanWeightResult(lastWeightValue) == true) { //[0,1,2] > [4,5,6]
                                //In this scenario, one of the fakebars is 4,5 or 6
                                //Fifth Iteration
                                //Compare [0,1] and [4,5]
                                goldBarWeightChallengePage.compareDoubleLeftValueAndDoubleRightValue([0,1],[4,5]);
                                await expect(await goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(5);
                                //Make fifth decision on weight value
                                lastWeightValue = await (await goldBarWeightChallengePage.lastWeighingsGeneralResult).textContent();
                                if(goldBarWeightChallengePage.foundEqualWeightResult(lastWeightValue) == true) { //[0,1] = [4,5]
                                    //Since we know that 0 and 1 are equal, and 4 and 5 are equal, the remaining value is 6
                                    finalFakeBar = 6;
                                    await goldBarWeightChallengePage.clickOnCoinNumberAndAssertAlertMessage(finalFakeBar);
                                } else {
                                    if(goldBarWeightChallengePage.foundGreaterThanWeightResult(lastWeightValue) == true) { //[0,1] > [4,5]
                                        //In this scenario, one of the fakebars is either 4 or 5
                                        //Sixth iteration
                                        //Compare 0 and 4
                                        goldBarWeightChallengePage.compareSingleLeftValueAndSingleRightValue(0,4);
                                        await expect(await goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(6);//6
                                        //Make Sixth decision on weight value
                                        lastWeightValue = await (await goldBarWeightChallengePage.lastWeighingsGeneralResult).textContent();
                                        if(goldBarWeightChallengePage.foundEqualWeightResult(lastWeightValue) == true) { //0 = 4
                                            //Since we know that 0 and 4 are equal, the remaining value is 5
                                            finalFakeBar = 5;
                                            await goldBarWeightChallengePage.clickOnCoinNumberAndAssertAlertMessage(finalFakeBar);
                                        } else {
                                            if(goldBarWeightChallengePage.foundGreaterThanWeightResult(lastWeightValue) == true) { //0 > 4
                                                finalFakeBar = 4;
                                                await goldBarWeightChallengePage.clickOnCoinNumberAndAssertAlertMessage(finalFakeBar);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(goldBarWeightChallengePage.foundLessThanWeightResult(lastWeightValue) == true) { //[0,1,2,3] < [4,5,6,7]
                        console.error('Found that [0,1,2,3] < [4,5,6,7], but [0,1,2,3] are equal weight');
                    }
                }
            } else {
                if(goldBarWeightChallengePage.foundGreaterThanWeightResult(lastWeightValue) == true) { //[0,1] > [2,3]
                    //Possible fake bars are 2 and 3
                    // Third Iteration
                    //Find whether 2 is the fake bar, use 0 as the reference
                    goldBarWeightChallengePage.compareSingleLeftValueAndSingleRightValue(0,2);
                    await expect(await goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(3); //3
                    //Make third Decision on weight value
                    lastWeightValue = await (await goldBarWeightChallengePage.lastWeighingsGeneralResult).textContent();
                    if(goldBarWeightChallengePage.foundEqualWeightResult(lastWeightValue) == true) { //0 = 2
                        // In this scenario, 0 and 2 are equal. Since 0 and 1 are equal, then 3 weights less and is the fakebar
                        finalFakeBar = 3;
                        await goldBarWeightChallengePage.clickOnCoinNumberAndAssertAlertMessage(finalFakeBar);
                    }
                    if(goldBarWeightChallengePage.foundGreaterThanWeightResult(lastWeightValue) == true) { //0 > 2
                        // In this scenario, 0 is greater than 2. Since 0 and 1 are equal, then 2 weights less and is the fakebar
                        finalFakeBar = 2;
                        await goldBarWeightChallengePage.clickOnCoinNumberAndAssertAlertMessage(finalFakeBar);
                    }
                }
                if(goldBarWeightChallengePage.foundLessThanWeightResult(lastWeightValue) == true) { //[0,1] < [2,3]
                    console.error('Found that 0 and 1 are less than 2 and 3, but 0 and 1 are equal weight');
                }
            }
        } else {
            //Scenarios where 0 and 1 are not equal
            if(goldBarWeightChallengePage.foundGreaterThanWeightResult(lastWeightValue) == true) { // 0 > 1
                currentFakeGolbar = 1;
            }
            if(goldBarWeightChallengePage.foundLessThanWeightResult(lastWeightValue) == true) { // 0 < 1
                currentFakeGolbar = 0;
            }
            //Second iteration
            // Compare 0 and 2
            goldBarWeightChallengePage.compareSingleLeftValueAndSingleRightValue(0,2);
            await expect(await goldBarWeightChallengePage.listOfWeighingsResults).toHaveCount(2); //2
            lastWeightValue = await (await goldBarWeightChallengePage.lastWeighingsGeneralResult).textContent();
            if(goldBarWeightChallengePage.foundEqualWeightResult(lastWeightValue) == true) {//0 = 2
                // This means that 1 is less than both 0 and 2, so it should be the fake goldbar
                finalFakeBar = 1;
                await goldBarWeightChallengePage.clickOnCoinNumberAndAssertAlertMessage(finalFakeBar);
            }
            if(goldBarWeightChallengePage.foundGreaterThanWeightResult(lastWeightValue) == true) {// 0 > 2
                if(currentFakeGolbar == 1) {
                    console.error('Found that 0 is greater than 1 and greater than 2');
                }
                if(currentFakeGolbar == 0) {
                    console.error('Found that 0 is less than 1 but greater than 2');
                }
            }
            if(goldBarWeightChallengePage.foundLessThanWeightResult(lastWeightValue) == true) {// 0 < 2
                if(currentFakeGolbar == 0) { // This means that 0 is less than both 1 and 2
                    finalFakeBar = 0;
                    await goldBarWeightChallengePage.clickOnCoinNumberAndAssertAlertMessage(finalFakeBar);
                }
            }
        }
        await goldBarWeightChallengePage.printFinalFakeBar(finalFakeBar);
        await goldBarWeightChallengePage.printOutListOfAllWeighinsPerformed();
    });

});