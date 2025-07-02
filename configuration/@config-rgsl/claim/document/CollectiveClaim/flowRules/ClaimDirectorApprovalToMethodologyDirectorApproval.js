'use strict';

const { validateInsuranceEventDate } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { amountConsts, claimConfigurantionNames } = require('@config-rgsl/claim-base/lib/claimConsts');

/**
 * @errorCode {errorCode} insuredEventDateOutOfRange
 * @errorCode {errorCode} claimShouldBeSentToPayment
 */

module.exports = function rule(input) {

    const validationErrors = [];

    validateInsuranceEventDate(input, claimConfigurantionNames.collectiveClaim, validationErrors);

    if (input.body.claimAmounts.paymentAmountInRubCurrency <= amountConsts.methodologyDirectorApproval) {

        validationErrors.push({
            errorCode: 'claimShouldBeSentToPayment',
            errorDataPath: '/Body/claimAmounts/paymentAmountInRubCurrency'
        });
    }

    return validationErrors;
};
