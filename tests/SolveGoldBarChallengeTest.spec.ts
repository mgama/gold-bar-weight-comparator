import { test, expect } from '@playwright/test';
import { GoldBarWeightChallengePage } from '../src/pageObjects/GoldBarWeightChallengePage';

test.describe('Solve Gold Bar Weight Challenge', () => {
    let arrayOfSameWeightGoldBars = new Array<Number>();
    test('Try Solving The Challenge', async ({ page }) => {
        const goldBarWeightChallengePage = new GoldBarWeightChallengePage(page);
        goldBarWeightChallengePage.visitChallengeSite();
        await expect(await goldBarWeightChallengePage.getLatestWeighingResult()).toHaveCount(0);
        //First iteration
        await goldBarWeightChallengePage.leftBowlSquareZero.click();
        await goldBarWeightChallengePage.leftBowlSquareZero.fill('0');
        await goldBarWeightChallengePage.rightBowlSquareZero.click();
        await goldBarWeightChallengePage.rightBowlSquareZero.fill('1');
        await goldBarWeightChallengePage.weighButton.click();
        await expect(await goldBarWeightChallengePage.getLatestWeighingResult()).toHaveCount(1);
        //Make first Decision on weight value
        const firstWeightValue = await (await goldBarWeightChallengePage.getLatestWeighingResult()).textContent();
        if (firstWeightValue?.includes('=')) {
            arrayOfSameWeightGoldBars.push(0);
            arrayOfSameWeightGoldBars.push(1);
        }
        console.log('The current arrayOfSameWeightGoldBars is ' + arrayOfSameWeightGoldBars);

    });

});