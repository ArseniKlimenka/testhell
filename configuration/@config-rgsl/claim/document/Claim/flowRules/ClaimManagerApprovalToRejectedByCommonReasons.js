'use strict';

const { claimConfigurantionNames } = require('@config-rgsl/claim-base/lib/claimConsts');

/**
 * @errorCode {errorCode} RejectionReasonIsRequired
 * @errorCode {errorCode} RejectionNoteIsRequired
 */

/* eslint no-undef: "off"*/

module.exports = function rule(input) {

    const validationErrors = [];

    const rejectionReason = input.body.mainAttributes?.rejectionReason?.code;

    if (!rejectionReason) {

        validationErrors.push({
            errorCode: 'RejectionReasonIsRequired',
            errorDataPath: '/Body/mainAttributes/rejectionReason'
        });
    }

    const rejectionNote = input.body.mainAttributes?.rejectionNote;

    if (!rejectionNote) {

        validationErrors.push({
            errorCode: 'RejectionNoteIsRequired',
            errorDataPath: '/Body/mainAttributes/rejectionNote'
        });
    }

    const enrich = documents.getDocumentConfiguration(claimConfigurantionNames.claim, 1).processEnrichmentsFn;

    enrich(undefined, input.body, ['[GetPolicyVersionInfo]']);
    validateExistingCancellationAmendments(input.body, validationErrors);

    return validationErrors;
};
