'use strict';

/**
 * @errorCode {errorCode} RejectionReasonIsRequired
 * @errorCode {errorCode} RejectionNoteIsRequired
 */

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

    return validationErrors;
};
