/**
 * @errorCode {errorCode} PaymentLinesTotalSumMustBeGreaterThanZero
 * @errorCode {errorCode} FundStatusShouldBeDissolved
 */

const { validateFundStatus } = require('@config-rgsl/life-insurance/lib/amendmentValidationHelper');
const { fundStatusConst } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    const validationErrors = [];
    const errorCode = 'FundStatusShouldBeDissolved';

    validateFundStatus(input, fundStatusConst.DISSOLVED.DESCRIPTION, errorCode, validationErrors, this);

    return validationErrors;
};
