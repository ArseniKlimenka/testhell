'use strict';

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

    return validationErrors;
};
