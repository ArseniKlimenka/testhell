'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

/**
 * @errorCode {errorCode} RejectionMustBeEmpty
 * @errorCode {errorCode} RejectionNoteMustBeEmpty
 * @errorCode {errorCode} EndowmentDateAlreadyReached
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

    const eventnDate = input.body.mainAttributes?.applicationInfo?.eventDate;
    const dateNow = dateUtils.dateNow();

    if (eventnDate && eventnDate <= dateNow ) {

        validationErrors.push({
            errorCode: 'EndowmentDateAlreadyReached'
        });
    }

    return validationErrors;
};
