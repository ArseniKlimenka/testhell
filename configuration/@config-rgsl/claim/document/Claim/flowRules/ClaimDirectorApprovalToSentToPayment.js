'use strict';

const { validateInsuranceEventDate, validateClaimBeneficiaryBankAccounts, validateExistingCancellationAmendments } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { amountConsts } = require('@config-rgsl/claim-base/lib/claimConsts');

/* eslint no-undef: "off"*/

/**
 * @errorCode {errorCode} insuredEventDateOutOfRange
 * @errorCode {errorCode} claimShouldBeSentToMethodologyDirector
 * @errorCode {errorCode} AtleastOneBeneficiaryIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    validateInsuranceEventDate(input, "Claim", validationErrors);

    if ((input.body.claimAmounts.requestedClaimAmount ?? 0) > amountConsts.methodologyDirectorApproval) {

        validationErrors.push({
            errorCode: 'claimShouldBeSentToMethodologyDirector',
            errorDataPath: '/Body/claimAmounts/requestedClaimAmount'
        });
    }

    const enrich = documents.getDocumentConfiguration("Claim", 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['[GetBeneficiariesBankAccounts]']);
    const state = this.businessContext.documentState;
    validateClaimBeneficiaryBankAccounts(input.body, state, validationErrors);

    enrich(undefined, input.body, ['[GetPolicyVersionInfo]']);
    validateExistingCancellationAmendments(input.body, validationErrors);

    return validationErrors;
};
