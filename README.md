# gold-bar-weight-comparator
Gold Bar Weight Challenge

Game Challenge
Given a balance scale and 9 gold bars of the same size and look. You don’t know the exact weight of each bar,
but you know they all weigh the same, except for one fake bar. It weighs less than others. You need to find the fake
gold bar by only bars and balance scales.
You can only place gold bars on scale plates (bowls) and find which scale weighs more or less

Solution
Main test framework to use for solving the challenge is Playwright
- NOTE: Cypress was also used, but it turned out to be more challenging to use for retrieving textcontent value. The test and page objects for the Cypress solution are incomplete

Main Test:
tests/FinalSolutionSolveGoldBarChallengeTest.spec.ts

Main Page Object:
src/pageObjects/GoldBarWeightChallengePage.ts

To install Playwright:
- Clone this repository
- Run: npm install
- Run: npx playwright install

To execute the tests thru the terminal headed (with browser UI)
- npm run test

To execute the tests headless (without browser UI)
- npm run test-headless

To execute the tests using the Playwright UI
- npm run open-playwright-ui

To see the latest test report
- npm run show-test-report

Example output on terminal when a test finishes and the Fake Gold bar is found:

The final fakebar found was 4
The weighings performed during this test run were: 
[0] = [1]
[0,1] = [2,3]
[0,1,2,3] > [4,5,6,7]
[0,1,2] > [4,5,6]
[0,1] > [4,5]
[0] > [4]