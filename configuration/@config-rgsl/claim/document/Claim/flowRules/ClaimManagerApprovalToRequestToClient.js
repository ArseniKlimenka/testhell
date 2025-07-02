'use strict';

const { validateInsuranceEventDate } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { claimConfigurantionNames } = require('@config-rgsl/claim-base/lib/claimConsts');

/**
 * @errorCode {errorCode} insuredEventDateOutOfRange
 * @errorCode {errorCode} RejectionReasonShouldBeEmpty
 * @errorCode {errorCode} RequestToClientReasonIsRequired
 * @errorCode {errorCode} RejectionNoteShouldBeEmpty
 */

module.exports = function rule(input) {

    const validationErrors = [];

    validateInsuranceEventDate(input, claimConfigurantionNames.claim, validationErrors);

    const rejectionReason = input.body.mainAttributes?.rejectionReason?.code;

    if (rejectionReason) {

        validationErrors.push({
            errorCode: 'RejectionReasonShouldBeEmpty',
            errorDataPath: '/Body/mainAttributes/rejectionReason'
        });
    }

    const requestToClientReason = input.body.requestReasons?.requestToClientReason;

    if (!requestToClientReason) {

        validationErrors.push({
            errorCode: 'RequestToClientReasonIsRequired',
            errorDataPath: '/Body/requestReasons/requestToClientReason'
        });
    }

    const rejectionNote = input.body.mainAttributes?.rejectionNote;

    if (rejectionNote) {

        validationErrors.push({
            errorCode: 'RejectionNoteShouldBeEmpty',
            errorDataPath: '/Body/mainAttributes/rejectionNote'
        });
    }

    return validationErrors;
};
