'use strict';

const { validateInsuranceEventDate } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { amountConsts } = require('@config-rgsl/claim-base/lib/claimConsts');

/**
 * @errorCode {errorCode} insuredEventDateOutOfRange
 * @errorCode {errorCode} claimShouldBeSentToPayment
 * @errorCode {errorCode} AtleastOneBeneficiaryIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    validateInsuranceEventDate(input, "Claim", validationErrors);

    if ((input.body.claimAmounts.requestedClaimAmount ?? 0) <= amountConsts.methodologyDirectorApproval) {

        validationErrors.push({
            errorCode: 'claimShouldBeSentToPayment',
            errorDataPath: '/Body/claimAmounts/requestedClaimAmount'
        });
    }

    const beneficiaries = input.body.claimBeneficiaries ?? [];

    if (beneficiaries.length === 0) {

        validationErrors.push({
            errorCode: 'AtleastOneBeneficiaryIsRequired',
            errorDataPath: '/Body/claimBeneficiaries'
        });
    }

    return validationErrors;
};
