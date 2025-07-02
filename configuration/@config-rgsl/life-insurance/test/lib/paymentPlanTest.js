const expect = require('chai').expect;
const _ = require('lodash');
const paymentPlanUtils = require('@config-rgsl/life-insurance/lib/paymentPlanUtils');
const { replaceNullWithUndefinedArray } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

/**
 * Tests should cover following cases:
 * 1. fillPaymentPlan() for cases with different risks end dates and additional risks
 */
describe('Unit tests for paymentPlanUtils library', function () {
    describe('Tests for fillPaymentPlan function', function () {

        it('Should return correct payment plan for Accumulated Life product with different risks end dates', async function () {

            // Arrange
            const body = require('@config-rgsl/life-insurance/test/testData/body-PP-AL-different-risks.json');
            const templatePaymentPlan = require('@config-rgsl/life-insurance/test/testData/expected-PP-AL-different-risks.json');
            const expectedPaymentPlan = replaceNullWithUndefinedArray(templatePaymentPlan);

            // Act
            paymentPlanUtils.fillPaymentPlan(body, {});
            const resultPaymentPlan = body.paymentPlan;
            const isEqual = _.isEqual(resultPaymentPlan, expectedPaymentPlan);

            // Assert
            expect(isEqual).to.equal(true);

        });

        it('Should return correct payment plan for Accumulated Life product with additional risks', async function () {

            // Arrange
            const body = require('@config-rgsl/life-insurance/test/testData/body-PP-AL-additional-risks.json');
            const templatePaymentPlan = require('@config-rgsl/life-insurance/test/testData/expected-PP-AL-additional-risks.json');
            const expectedPaymentPlan = replaceNullWithUndefinedArray(templatePaymentPlan);

            // Act
            paymentPlanUtils.fillPaymentPlan(body, {});
            const resultPaymentPlan = body.paymentPlan;
            const isEqual = _.isEqual(resultPaymentPlan, expectedPaymentPlan);

            // Assert
            expect(isEqual).to.equal(true);

        });

        // functionality implemenation is on hold, so commented for now
        /*
        it('Should return correct payment plan for Accumulated Life product after CBR 5968 changes', async function () {

            // Arrange
            const body = require('@config-rgsl/life-insurance/test/testData/body-PP-AL-cbr-5968.json');
            const expectedPaymentPlan = require('@config-rgsl/life-insurance/test/testData/expected-PP-AL-cbr-5968.json');

            // Act
            paymentPlanUtils.fillPaymentPlan(body);
            const resultPaymentPlan = body.paymentPlan;
            const isEqual = _.isEqual(resultPaymentPlan, expectedPaymentPlan);

            // Assert
            expect(isEqual).to.equal(true);

        });
        */

    });
});
