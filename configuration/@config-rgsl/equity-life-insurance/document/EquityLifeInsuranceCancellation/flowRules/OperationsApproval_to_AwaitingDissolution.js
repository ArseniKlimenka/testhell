/**
 * @errorCode {errorCode} PaymentLinesTotalSumMustBeGreaterThanZero
 */

const { validatePaymentCalculation } = require('@config-rgsl/life-insurance/lib/amendmentValidationHelper');

module.exports = function rule(input) {

    const validationErrors = [];

    validatePaymentCalculation(input, validationErrors);

    return validationErrors;
};
