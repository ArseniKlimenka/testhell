'use strict';
const { validateInsuranceEventDate,
    validateClaimBeneficiaryBankAccounts,
    validateExistingCancellationAmendments } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { claimConfigurantionNames } = require('@config-rgsl/claim-base/lib/claimConsts');
/* eslint no-undef: "off"*/

/**
 * @errorCode {errorCode} insuredEventDateOutOfRange
 * @errorCode {errorCode} AtleastOneBeneficiaryIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    validateInsuranceEventDate(input, claimConfigurantionNames.claim, validationErrors);

    const enrich = documents.getDocumentConfiguration(claimConfigurantionNames.claim, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['[GetBeneficiariesBankAccounts]']);
    const state = this.businessContext.documentState;
    validateClaimBeneficiaryBankAccounts(input.body, state, validationErrors);

    const beneficiaries = input.body.claimBeneficiaries ?? [];

    if (beneficiaries.length === 0) {

        validationErrors.push({
            errorCode: 'AtleastOneBeneficiaryIsRequired',
            errorDataPath: '/Body/claimBeneficiaries'
        });
    }

    enrich(undefined, input.body, ['[GetPolicyVersionInfo]']);
    validateExistingCancellationAmendments(input.body, validationErrors);

    return validationErrors;
};
