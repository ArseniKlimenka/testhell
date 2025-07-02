'use strict';

const { validateEndowmentBeneficiaryBankAccounts } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { claimConfigurantionNames } = require('@config-rgsl/claim-base/lib/claimConsts');
/* eslint no-undef: "off"*/

/**
 * @errorCode {errorCode} RejectionMustBeEmpty
 * @errorCode {errorCode} RejectionNoteMustBeEmpty
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const rejectionReason = input.body.mainAttributes?.rejectionReason;

    if (rejectionReason) {

        validationErrors.push({
            errorCode: 'RejectionMustBeEmpty',
            errorDataPath: '/Body/mainAttributes/rejectionReason'
        });
    }

    const rejectionNote = input.body.mainAttributes?.rejectionNote;

    if (rejectionNote) {

        validationErrors.push({
            errorCode: 'RejectionNoteMustBeEmpty',
            errorDataPath: '/Body/mainAttributes/rejectionNote'
        });
    }

    const enrich = documents.getDocumentConfiguration(claimConfigurantionNames.endowment, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['[GetBeneficiariesBankAccounts]']);
    const state = this.businessContext.documentState;
    validateEndowmentBeneficiaryBankAccounts(input.body, state, validationErrors);

    return validationErrors;
};
