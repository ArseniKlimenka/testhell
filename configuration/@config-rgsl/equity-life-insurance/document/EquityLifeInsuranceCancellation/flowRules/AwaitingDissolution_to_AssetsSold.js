/**
 * @errorCode {errorCode} PaymentLinesTotalSumMustBeGreaterThanZero
 * @errorCode {errorCode} FundStatusShouldBeSoldOut
 */

const { validatePaymentCalculation, validateFundStatus } = require('@config-rgsl/life-insurance/lib/amendmentValidationHelper');
const { fundStatusConst } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    const validationErrors = [];
    const errorCode = 'FundStatusShouldBeDissolved';

    validatePaymentCalculation(input, validationErrors);
    validateFundStatus(input, fundStatusConst.SOLD_OUT.DESCRIPTION, errorCode, validationErrors, this);

    return validationErrors;
};
