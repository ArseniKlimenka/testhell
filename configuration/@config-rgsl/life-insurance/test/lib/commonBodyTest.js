const expect = require('chai').expect;
const commonSchemaHelper = require('@config-rgsl/life-insurance/lib/commonSchemaMappingHelper');
const _ = require('lodash');

/**
 * Tests should cover following cases:
 * 1. check if data needed for invoicing is prepared
 */
describe('Unit tests for commonBody mapping library', function () {
    describe('Tests for generateCommonBody()', function () {
        it('Should return payment plan in item attributes. It shouldbe generated from body payment plan.', function () {

            // Arrange
            const body = require('@config-rgsl/life-insurance/test/testData/body-AL-different-installments.json');
            const expectedResult = require('@config-rgsl/life-insurance/test/testData/expected-AL-different-installment.json');

            // Act
            const result = commonSchemaHelper.generateCommonBody(body);
            const isEqualAttributes = _.isEqual(result.items[0].attributes.paymentPlan, expectedResult.items[0].attributes.paymentPlan);

            // Assert
            expect(isEqualAttributes).to.equal(true);

        });

        it('Should generate manual payment plan common body root.', function () {

            // Arrange
            const body = require('@config-rgsl/life-insurance/test/testData/body-AL-different-installments.json');
            const expectedResult = require('@config-rgsl/life-insurance/test/testData/expected-AL-different-installment.json');

            // Act
            const result = commonSchemaHelper.generateCommonBody(body);
            const isEqualPaymentPlan = _.isEqual(result.paymentPlan, expectedResult.paymentPlan);

            // Assert
            expect(isEqualPaymentPlan).to.equal(true);

        });
    });
});
