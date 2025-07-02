const expect = require('chai').expect;
const riskUtils = require('@config-rgsl/life-insurance/lib/riskUtils');
const objectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const _ = require('lodash');

/**
 * Tests should cover following cases:
 * 1. setRisks() for all product groups
 * 2. riskConditions() for different Body context data
 */
describe('Unit tests for RiskUtils library', function () {
    describe('Tests for setRisks()', function () {
        it('Should return correct risk set for Accumulated Life product group in case of additional risks', function () {

            // Arrange
            const body = require('@config-rgsl/life-insurance/test/testData/body-AL-additional-risks.json');
            const inputRisks = require('@config-rgsl/life-insurance/test/testData/input-risk-AL-additional.json');
            const expectedRisks = require('@config-rgsl/life-insurance/test/testData/expected-AL-additional-risks.json');

            // Act
            riskUtils.setRisks(body, inputRisks);
            const resultRisks = body.risks;
            const isEqual = _.isEqual(resultRisks, expectedRisks);


            // Assert
            expect(isEqual).to.equal(true);

        });

        it('Should return correct risk set for Accumulated Life product group in case of replaceable risks', function () {

            // Arrange
            const body = require('@config-rgsl/life-insurance/test/testData/body-AL-replaceable-risks.json');
            const inputRisks = require('@config-rgsl/life-insurance/test/testData/input-risks-AL-replaceable.json');
            const expectedRisks = require('@config-rgsl/life-insurance/test/testData/expected-AL-replaceable-risks.json');

            // Act
            riskUtils.setRisks(body, inputRisks);
            const resultRisks = body.risks;
            const isEqual = _.isEqual(resultRisks, expectedRisks);


            // Assert
            expect(isEqual).to.equal(true);

        });

        it('Should return correct risk set for Investment Life product group in case of replaceable risks', function () {

            // Arrange
            const body = require('@config-rgsl/life-insurance/test/testData/body-IL-replaceable-risks.json');
            const inputRisks = require('@config-rgsl/life-insurance/test/testData/input-risk-IL-replaceable.json');
            const expectedRisks = require('@config-rgsl/life-insurance/test/testData/expected-IL-replaceable-risks.json');

            // Act
            riskUtils.setRisks(body, inputRisks);
            const resultRisks = body.risks;
            const isEqual = _.isEqual(resultRisks, expectedRisks);


            // Assert
            expect(isEqual).to.equal(true);

        });
    });
});
