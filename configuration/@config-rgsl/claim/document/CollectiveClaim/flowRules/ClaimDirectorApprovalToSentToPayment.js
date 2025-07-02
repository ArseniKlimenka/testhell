'use strict';

const { validateInsuranceEventDate } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { amountConsts, claimConfigurantionNames } = require('@config-rgsl/claim-base/lib/claimConsts');

/**
 * @errorCode {errorCode} insuredEventDateOutOfRange
 * @errorCode {errorCode} claimShouldBeSentToMethodologyDirector
 * @errorCode {errorCode} paymentAmountInRubCurrencyMustBeGreaterThanZero
 */

module.exports = function rule(input) {

    const validationErrors = [];

    validateInsuranceEventDate(input, claimConfigurantionNames.collectiveClaim, validationErrors);

    if (input.body.claimAmounts.paymentAmountInRubCurrency > amountConsts.methodologyDirectorApproval) {

        validationErrors.push({
            errorCode: 'claimShouldBeSentToMethodologyDirector',
            errorDataPath: '/Body/claimAmounts/paymentAmountInRubCurrency'
        });
    }

    if (input.body.claimAmounts.paymentAmountInRubCurrency === 0) {

        validationErrors.push({
            errorCode: 'paymentAmountInRubCurrencyMustBeGreaterThanZero',
            errorDataPath: '/Body/claimAmounts/paymentAmountInRubCurrency'
        });
    }

    return validationErrors;
};
