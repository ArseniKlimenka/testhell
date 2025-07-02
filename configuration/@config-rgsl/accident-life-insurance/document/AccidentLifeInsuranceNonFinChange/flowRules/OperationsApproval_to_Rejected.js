'use strict';

/**
 * @errorCode {errorCode} RejectionReasonIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const rejectionReason = input.body?.amendmentData?.nonFinChangeAmendmentData?.amendmentInfo?.rejectionReason;

    if (!rejectionReason) {

        validationErrors.push({
            errorCode: 'RejectionReasonIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/rejectionReason'
        });
    }

    return validationErrors;
};
